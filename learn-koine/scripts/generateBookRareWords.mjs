import { createServer } from "vite";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDir, "..");
const sourceDir = resolve(projectRoot, "../SR-usfm");
const outputPath = resolve(projectRoot, "src/greek_text/bookRareWords.generated.json");
const bookNamesByAbbreviation = {
  MAT: "Matthew", MRK: "Mark", LUK: "Luke", JHN: "John", ACT: "Acts",
  ROM: "Romans", "1CO": "1 Corinthians", "2CO": "2 Corinthians",
  GAL: "Galatians", EPH: "Ephesians", PHP: "Philippians", COL: "Colossians",
  "1TH": "1 Thessalonians", "2TH": "2 Thessalonians", "1TI": "1 Timothy",
  "2TI": "2 Timothy", TIT: "Titus", PHM: "Philemon", HEB: "Hebrews",
  JAS: "James", "1PE": "1 Peter", "2PE": "2 Peter", "1JN": "1 John",
  "2JN": "2 John", "3JN": "3 John", JUD: "Jude", REV: "Revelation",
};

const normalizeGreek = (value) => value
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .replace(/[ς]/g, "σ")
  .replace(/[.,;:·!?“”'’ʼ()[\]{}]/g, "")
  .toLocaleLowerCase("el");
const normalizeEnglish = (value) => value
  .toLowerCase()
  .replace(/[;()[\]]/g, "")
  .replace(/\s+/g, " ")
  .trim();
const meaningfulGlossWords = (value) => normalizeEnglish(value)
  .replace(/[^a-z\s]/g, " ")
  .split(/\s+/)
  .filter((word) => word.length > 2 && !["the", "and", "for", "from", "with", "one", "another", "into", "that", "this", "who", "which"].includes(word));
const editDistance = (left, right) => {
  const row = Array.from({ length: right.length + 1 }, (_, index) => index);
  for (let i = 1; i <= left.length; i += 1) {
    let diagonal = row[0];
    row[0] = i;
    for (let j = 1; j <= right.length; j += 1) {
      const above = row[j];
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, diagonal + (left[i - 1] === right[j - 1] ? 0 : 1));
      diagonal = above;
    }
  }
  return row[right.length];
};

const strongIdFromAttribute = (value) => {
  const digits = value.replace(/^G/i, "");
  // The source pads Strong IDs with a trailing zero; drop it and leading zeros.
  return `G${Number(digits.endsWith("0") ? digits.slice(0, -1) : digits)}`;
};

const vocabularySource = await readFile(resolve(projectRoot, "src/greek_text/vocabularyWords.js"), "utf8");
const rawVocabulary = vocabularySource.match(/let vocabListRaw = `([\s\S]*?)`;/)?.[1];
if (!rawVocabulary) throw new Error("Could not find the vocabulary data string.");
const vocabListObj = Object.fromEntries(rawVocabulary.split(/\r?\n/).map((line) => {
  const [headword, english = "", frequency] = line.split("\t");
  return [headword, { english, frequency }];
}));
const viteServer = await createServer({
  root: projectRoot,
  server: { middlewareMode: true, hmr: false, ws: false },
  appType: "custom",
});
const { wordUsages } = await viteServer.ssrLoadModule("/src/greek_text/greekLexiconObject.js");
await viteServer.close();

const lemmaStrongIds = new Map();
const lemmasByStrongId = new Map();
const formsByStrongId = new Map();
const strongIdsByExactForm = new Map();
const strongIdsByGloss = new Map();
const glossByStrongId = new Map();
Object.entries(wordUsages).forEach(([form, entry]) => {
  const formKey = normalizeGreek(form);
  const formIds = strongIdsByExactForm.get(formKey) || new Set();
  if (entry.GN) {
    formIds.add(entry.GN);
    const forms = formsByStrongId.get(entry.GN) || new Set();
    forms.add(formKey);
    formsByStrongId.set(entry.GN, forms);
  }
  if (formIds.size) strongIdsByExactForm.set(formKey, formIds);

  const key = normalizeEnglish(entry.gloss || "");
  if (!key || !entry.GN) return;
  if (!glossByStrongId.has(entry.GN)) glossByStrongId.set(entry.GN, entry.gloss || "");
  const ids = strongIdsByGloss.get(key) || new Set();
  ids.add(entry.GN);
  strongIdsByGloss.set(key, ids);
});
const countsByBookAndStrongId = new Map();
const filenames = (await readdir(sourceDir)).filter((name) => name.endsWith(".usfm"));

for (const filename of filenames) {
  const abbreviation = filename.match(/-([A-Z0-9]+)\.usfm$/)?.[1];
  const bookName = bookNamesByAbbreviation[abbreviation];
  if (!bookName) continue;
  const bookCounts = new Map();
  const contents = await readFile(resolve(sourceDir, filename), "utf8");
  const wordPattern = /\\w\s+([^|]+)\|([^\\]*?)\\w\*/g;
  for (const match of contents.matchAll(wordPattern)) {
    const attributes = match[2];
    const lemma = attributes.match(/\blemma="([^"]+)"/)?.[1];
    const strongAttribute = attributes.match(/\bx-strong="([^"]+)"/)?.[1];
    if (!lemma || !strongAttribute) continue;
    const strongId = strongIdFromAttribute(strongAttribute);
    const normalizedLemma = normalizeGreek(lemma);
    if (!normalizedLemma || strongId === "G0") continue;

    const ids = lemmaStrongIds.get(normalizedLemma) || new Set();
    ids.add(strongId);
    lemmaStrongIds.set(normalizedLemma, ids);
    const lemmas = lemmasByStrongId.get(strongId) || new Set();
    lemmas.add(normalizedLemma);
    lemmasByStrongId.set(strongId, lemmas);
    bookCounts.set(strongId, (bookCounts.get(strongId) || 0) + 1);
  }
  countsByBookAndStrongId.set(bookName, bookCounts);
}

const canonicalByStrongId = new Map();
let matchedVocabularyEntries = 0;
const matchMethods = { lemma: 0, lexiconForm: 0, deponentLemma: 0, uniqueGloss: 0, closeLemma: 0 };
const matchedHeadwords = new Set();
for (const [headword, entry] of Object.entries(vocabListObj)) {
  const firstForm = normalizeGreek(headword.split(",")[0].trim());
  let strongIds = lemmaStrongIds.get(firstForm);
  let method = "lemma";
  if (!strongIds) {
    strongIds = strongIdsByExactForm.get(firstForm);
    if (strongIds) method = "lexiconForm";
  }
  if (!strongIds) {
    strongIds = lemmaStrongIds.get(firstForm.replace(/ομαι$/, "ω"));
    if (strongIds) method = "deponentLemma";
  }
  if (!strongIds) {
    const glossIds = strongIdsByGloss.get(normalizeEnglish(entry.english));
    if (glossIds?.size === 1) {
      strongIds = glossIds;
      method = "uniqueGloss";
    }
  }
  if (!strongIds) {
    const glossWords = new Set(meaningfulGlossWords(entry.english));
    const candidates = [];
    lemmasByStrongId.forEach((lemmas, strongId) => {
      const overlap = meaningfulGlossWords(glossByStrongId.get(strongId) || "")
        .filter((word) => glossWords.has(word)).length;
      if (!overlap) return;
      const forms = formsByStrongId.get(strongId) || new Set();
      const distance = Math.min(...[...lemmas, ...forms].map((form) => editDistance(firstForm, form)));
      candidates.push({ strongId, overlap, distance });
    });
    candidates.sort((left, right) => right.overlap - left.overlap || left.distance - right.distance);
    const best = candidates[0];
    const next = candidates[1];
    if (best && best.distance <= 2 && (!next || best.overlap > next.overlap || best.distance < next.distance)) {
      strongIds = new Set([best.strongId]);
      method = "closeLemma";
    }
  }
  const totalFrequency = Number(entry.frequency);
  if (!strongIds || !Number.isFinite(totalFrequency)) continue;
  matchedVocabularyEntries += 1;
  if (matchMethods[method] !== undefined) matchMethods[method] += 1;
  matchedHeadwords.add(headword);
  for (const strongId of strongIds) {
    const current = canonicalByStrongId.get(strongId);
    if (!current || totalFrequency > current.totalFrequency) {
      canonicalByStrongId.set(strongId, {
        headword,
        english: entry.english.trim(),
        totalFrequency,
      });
    }
  }
}

const rareWordsByBook = Object.fromEntries(
  Object.keys(bookNamesByAbbreviation).map((abbreviation) => {
    const bookName = bookNamesByAbbreviation[abbreviation];
    const counts = countsByBookAndStrongId.get(bookName) || new Map();
    const headwordCounts = new Map();
    counts.forEach((bookFrequency, strongId) => {
      const entry = canonicalByStrongId.get(strongId);
        if (!entry || entry.totalFrequency >= 50 || entry.totalFrequency < 25) return;
      const current = headwordCounts.get(entry.headword) || { ...entry, bookFrequency: 0 };
      current.bookFrequency += bookFrequency;
      headwordCounts.set(entry.headword, current);
    });
    const entries = [...headwordCounts.values()].sort(
      (left, right) => left.totalFrequency - right.totalFrequency || left.headword.localeCompare(right.headword),
    );
    return [bookName, Object.fromEntries(entries.map(({ headword, bookFrequency }) => [headword, bookFrequency]))];
  }),
);

await writeFile(outputPath, `${JSON.stringify(rareWordsByBook)}\n`);
const summary = Object.fromEntries(Object.entries(rareWordsByBook).map(([book, words]) => [book, Object.keys(words).length]));
const unmatchedRareHeadwords = Object.entries(vocabListObj)
    .filter(([headword, entry]) => Number(entry.frequency) >= 25 && Number(entry.frequency) < 50 && !matchedHeadwords.has(headword))
  .map(([headword]) => headword);
console.log(JSON.stringify({
  outputPath,
  bookCount: Object.keys(rareWordsByBook).length,
  matchedVocabularyEntries,
  matchMethods,
  totalVocabularyEntries: Object.keys(vocabListObj).length,
  unmatchedRareHeadwordCount: unmatchedRareHeadwords.length,
  unmatchedRareHeadwords: unmatchedRareHeadwords.slice(0, 25),
  wordsByBook: summary,
}, null, 2));

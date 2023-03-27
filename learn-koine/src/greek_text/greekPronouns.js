const pronouns = {
  ἀλλήλοις: {
    parse: "C-DPN｜reCiprocal pronoun, dative, plural, neuter",
    gloss: "one another",
  },
  ἀλλήλους: {
    parse: "C-APM｜reCiprocal pronoun, accusative, plural, masculine",
    gloss: "one another",
  },
  ἀλλήλων: {
    parse: "C-GPM｜reCiprocal pronoun, genitive, plural, masculine",
    gloss: "one another",
  },
  αὐστηρός: {
    parse: "P-NSM｜Personal pronoun, nominative, singular, masculine",
    gloss: "severe",
  },
  αὐστηρὸς: {
    parse: "P-NSM｜Personal pronoun, nominative, singular, masculine",
    gloss: "severe",
  },
  αὐτά: {
    parse: "P-APN｜Personal pronoun, accusative, plural, neuter",
    gloss: "it/she/he",
  },
  αὐτὰ: {
    parse: "P-NPN｜Personal pronoun, nominative, plural, neuter",
    gloss: "it/she/he",
  },
  αὐταῖς: {
    parse: "P-DPF｜Personal pronoun, dative, plural, feminine",
    gloss: "it/she/he",
  },
  αὐτάς: {
    parse: "P-APF｜Personal pronoun, accusative, plural, feminine",
    gloss: "it/she/he",
  },
  αὐτὰς: {
    parse: "P-APF｜Personal pronoun, accusative, plural, feminine",
    gloss: "it/she/he",
  },
  αὐτῇ: {
    parse: "P-DSF｜Personal pronoun, dative, singular, feminine",
    gloss: "it/she/he",
  },
  αὐτὴ: {
    parse: "P-NSF｜Personal pronoun, nominative, singular, feminine",
    gloss: "it/she/he",
  },
  αὐτήν: {
    parse: "P-ASF｜Personal pronoun, accusative, singular, feminine",
    gloss: "it/she/he",
  },
  αὐτὴν: {
    parse: "P-ASF｜Personal pronoun, accusative, singular, feminine",
    gloss: "it/she/he",
  },
  αὐτῆς: {
    parse: "P-GSF｜Personal pronoun, genitive, singular, feminine",
    gloss: "it/she/he",
  },
  αὐτό: {
    parse: "P-ASN｜Personal pronoun, accusative, singular, neuter",
    gloss: "it/she/he",
  },
  αὐτὸ: {
    parse: "P-NSN｜Personal pronoun, nominative, singular, neuter",
    gloss: "it/she/he",
  },
  αὐτοί: {
    parse: "P-NPM｜Personal pronoun, nominative, plural, masculine",
    gloss: "it/she/he",
  },
  αὐτοὶ: {
    parse: "P-NPM｜Personal pronoun, nominative, plural, masculine",
    gloss: "it/she/he",
  },
  Αὐτοὶ: {
    parse: "P-NPM｜Personal pronoun, nominative, plural, masculine",
    gloss: "it/she/he",
  },
  αὐτοῖς: {
    parse: "P-DPN｜Personal pronoun, dative, plural, neuter",
    gloss: "it/she/he",
  },
  αὐτόν: {
    parse: "P-ASM｜Personal pronoun, accusative, singular, masculine",
    gloss: "it/she/he",
  },
  αὐτὸν: {
    parse: "P-ASM｜Personal pronoun, accusative, singular, masculine",
    gloss: "it/she/he",
  },
  αὐτός: {
    parse: "P-NSM｜Personal pronoun, nominative, singular, masculine",
    gloss: "it/she/he",
  },
  αὐτὸς: {
    parse: "P-NSM｜Personal pronoun, nominative, singular, masculine",
    gloss: "it/she/he",
  },
  Αὐτὸς: {
    parse: "P-NSM｜Personal pronoun, nominative, singular, masculine",
    gloss: "it/she/he",
  },
  αὐτοῦ: {
    parse: "P-ASM｜Personal pronoun, genitive, singular, masculine or neuter",
    gloss: "there",
  },
  αὐτούς: {
    parse: "P-APM｜Personal pronoun, accusative, plural, masculine",
    gloss: "it/she/he",
  },
  αὐτοὺς: {
    parse: "P-APM｜Personal pronoun, accusative, plural, masculine",
    gloss: "it/she/he",
  },
  αὐτῷ: {
    parse: "P-DSN｜Personal pronoun, dative, singular, neuter",
    gloss: "it/she/he",
  },
  αὐτῶν: {
    parse: "P-GPN｜Personal pronoun, genitive, plural, neuter",
    gloss: "it/she/he",
  },
  Αὐτῶν: {
    parse: "P-GPM｜Personal pronoun, genitive, plural, masculine",
    gloss: "it/she/he",
  },
  αὑτὴν: {
    parse: "F-3ASF｜reFlexive pronoun, third, accusative, singular, feminine",
    gloss: "themself",
  },
  αὑτοῦ: {
    parse: "F-3GSM｜reFlexive pronoun, third, genitive, singular, masculine",
    gloss: "themself",
  },
  αὑτῷ: {
    parse: "F-3DSM｜reFlexive pronoun, third, dative, singular, masculine",
    gloss: "themself",
  },
  ἑαυτὰ: {
    parse: "F-2APN｜reFlexive pronoun, second, accusative, plural, neuter",
    gloss: "themself",
  },
  ἑαυταῖς: {
    parse: "F-2DPF｜reFlexive pronoun, second, dative, plural, feminine",
    gloss: "themself",
  },
  ἑαυτὰς: {
    parse: "F-2APF｜reFlexive pronoun, second, accusative, plural, feminine",
    gloss: "themself",
  },
  ἑαυτάς: {
    parse: "F-3APF｜reFlexive pronoun, third, accusative, plural, feminine",
    gloss: "themself",
  },
  ἑαυτῇ: {
    parse: "F-3DSF｜reFlexive pronoun, third, dative, singular, feminine",
    gloss: "themself",
  },
  ἑαυτήν: {
    parse: "F-3ASF｜reFlexive pronoun, third, accusative, singular, feminine",
    gloss: "themself",
  },
  ἑαυτὴν: {
    parse: "F-3ASF｜reFlexive pronoun, third, accusative, singular, feminine",
    gloss: "themself",
  },
  ἑαυτῆς: {
    parse: "F-3GSF｜reFlexive pronoun, third, genitive, singular, feminine",
    gloss: "themself",
  },
  ἑαυτοῖς: {
    parse: "F-3DPM｜reFlexive pronoun, third, dative, plural, masculine",
    gloss: "themself",
  },
  ἑαυτόν: {
    parse: "F-3ASM｜reFlexive pronoun, third, accusative, singular, masculine",
    gloss: "themself",
  },
  ἑαυτὸν: {
    parse: "F-3ASM｜reFlexive pronoun, third, accusative, singular, masculine",
    gloss: "themself",
  },
  ἑαυτοῦ: {
    parse: "F-3GSN｜reFlexive pronoun, third, genitive, singular, neuter",
    gloss: "themself",
  },
  ἑαυτούς: {
    parse: "F-3APM｜reFlexive pronoun, third, accusative, plural, masculine",
    gloss: "themself",
  },
  ἑαυτοὺς: {
    parse: "F-3APM｜reFlexive pronoun, third, accusative, plural, masculine",
    gloss: "themself",
  },
  Ἑαυτοὺς: {
    parse: "F-2APM｜reFlexive pronoun, second, accusative, plural, masculine",
    gloss: "themself",
  },
  ἑαυτῷ: {
    parse: "F-3DSM｜reFlexive pronoun, third, dative, singular, masculine",
    gloss: "themself",
  },
  ἑαυτῶν: {
    parse: "F-3GPN｜reFlexive pronoun, third, genitive, plural, neuter",
    gloss: "themself",
  },
  ἐγώ: {
    parse: "P-1NS｜Personal pronoun, first, nominative, singular",
    gloss: "I/we",
  },
  Ἐγώ: {
    parse: "P-1NS｜Personal pronoun, first, nominative, singular",
    gloss: "I/we",
  },
  ἐγὼ: {
    parse: "P-1NS｜Personal pronoun, first, nominative, singular",
    gloss: "I/we",
  },
  Ἐγὼ: {
    parse: "P-1NS｜Personal pronoun, first, nominative, singular",
    gloss: "I/we",
  },
  ἐμέ: {
    parse: "P-1AS｜Personal pronoun, first, accusative, singular",
    gloss: "I/we",
  },
  ἐμὲ: {
    parse: "P-1AS｜Personal pronoun, first, accusative, singular",
    gloss: "I/we",
  },
  ἐμοί: {
    parse: "P-1DS｜Personal pronoun, first, dative, singular",
    gloss: "I/we",
  },
  ἐμοὶ: {
    parse:
      "S-1SNPM｜poSsessive pronoun, first, singular, nominative, plural, masculine",
    gloss: "mine",
  },
  Ἐμοὶ: {
    parse: "P-1DS｜Personal pronoun, first, dative, singular",
    gloss: "I/we",
  },
  ἐμοῦ: {
    parse:
      "S-1SGSN｜poSsessive pronoun, first, singular, genitive, singular, neuter",
    gloss: "mine",
  },
  ἡμᾶς: {
    parse: "P-1AP｜Personal pronoun, first, accusative, plural",
    gloss: "I/we",
  },
  ἡμεῖς: {
    parse: "P-1NP｜Personal pronoun, first, nominative, plural",
    gloss: "I/we",
  },
  Ἡμεῖς: {
    parse: "P-1NP｜Personal pronoun, first, nominative, plural",
    gloss: "I/we",
  },
  ἡμῖν: {
    parse: "P-1DP｜Personal pronoun, first, dative, plural",
    gloss: "I/we",
  },
  Ἡμῖν: {
    parse: "P-1DP｜Personal pronoun, first, dative, plural",
    gloss: "I/we",
  },
  ἡμῶν: {
    parse: "P-1GP｜Personal pronoun, first, genitive, plural",
    gloss: "I/we",
  },
  με: {
    parse: "P-1AS｜Personal pronoun, first, accusative, singular",
    gloss: "I/we",
  },
  μέ: {
    parse: "P-1AS｜Personal pronoun, first, accusative, singular",
    gloss: "I/we",
  },
  μοι: {
    parse: "P-1DS｜Personal pronoun, first, dative, singular",
    gloss: "I/we",
  },
  μοί: {
    parse: "P-1DS｜Personal pronoun, first, dative, singular",
    gloss: "I/we",
  },
  μου: {
    parse: "P-1GS｜Personal pronoun, first, genitive, singular",
    gloss: "I/we",
  },
  μού: {
    parse: "P-1GS｜Personal pronoun, first, genitive, singular",
    gloss: "I/we",
  },
  ἐκεῖνα: {
    parse: "D-APN｜Demonstrative pronoun, accusative, plural, neuter",
    gloss: "that",
  },
  ἐκεῖναι: {
    parse: "D-NPF｜Demonstrative pronoun, nominative, plural, feminine",
    gloss: "that",
  },
  ἐκεῖναί: {
    parse: "D-NPF｜Demonstrative pronoun, nominative, plural, feminine",
    gloss: "that",
  },
  ἐκείναις: {
    parse: "D-DPF｜Demonstrative pronoun, dative, plural, feminine",
    gloss: "that",
  },
  ἐκείνας: {
    parse: "D-APF｜Demonstrative pronoun, accusative, plural, feminine",
    gloss: "that",
  },
  ἐκείνῃ: {
    parse: "D-DSF｜Demonstrative pronoun, dative, singular, feminine",
    gloss: "that",
  },
  ἐκείνη: {
    parse: "D-NSF｜Demonstrative pronoun, nominative, singular, feminine",
    gloss: "that",
  },
  ἐκείνην: {
    parse: "D-ASF｜Demonstrative pronoun, accusative, singular, feminine",
    gloss: "that",
  },
  ἐκείνης: {
    parse: "D-GSF｜Demonstrative pronoun, genitive, singular, feminine",
    gloss: "that",
  },
  ἐκεῖνο: {
    parse: "D-NSN｜Demonstrative pronoun, nominative, singular, neuter",
    gloss: "that",
  },
  ἐκεῖνοι: {
    parse: "D-NPM｜Demonstrative pronoun, nominative, plural, masculine",
    gloss: "that",
  },
  ἐκεῖνοί: {
    parse: "D-NPM｜Demonstrative pronoun, nominative, plural, masculine",
    gloss: "that",
  },
  ἐκείνοις: {
    parse: "D-DPM｜Demonstrative pronoun, dative, plural, masculine",
    gloss: "that",
  },
  ἐκεῖνον: {
    parse: "D-ASM｜Demonstrative pronoun, accusative, singular, masculine",
    gloss: "that",
  },
  ἐκεῖνος: {
    parse: "D-NSM｜Demonstrative pronoun, nominative, singular, masculine",
    gloss: "that",
  },
  ἐκεῖνός: {
    parse: "D-NSM｜Demonstrative pronoun, nominative, singular, masculine",
    gloss: "that",
  },
  Ἐκεῖνός: {
    parse: "D-NSM｜Demonstrative pronoun, nominative, singular, masculine",
    gloss: "that",
  },
  ἐκείνου: {
    parse: "D-GSN｜Demonstrative pronoun, genitive, singular, neuter",
    gloss: "that",
  },
  ἐκείνους: {
    parse: "D-APM｜Demonstrative pronoun, accusative, plural, masculine",
    gloss: "that",
  },
  ἐκείνῳ: {
    parse: "D-DSM｜Demonstrative pronoun, dative, singular, masculine",
    gloss: "that",
  },
  ἐκείνων: {
    parse: "D-GPN｜Demonstrative pronoun, genitive, plural, neuter",
    gloss: "that",
  },
  ἐμαυτόν: {
    parse: "F-1ASM｜reFlexive pronoun, first, accusative, singular, masculine",
    gloss: "myself",
  },
  ἐμαυτὸν: {
    parse: "F-1ASM｜reFlexive pronoun, first, accusative, singular, masculine",
    gloss: "myself",
  },
  ἐμαυτοῦ: {
    parse: "F-1GSM｜reFlexive pronoun, first, genitive, singular, masculine",
    gloss: "myself",
  },
  ἐμαυτῷ: {
    parse: "F-1DSM｜reFlexive pronoun, first, dative, singular, masculine",
    gloss: "myself",
  },
  ἐμὰ: {
    parse:
      "S-1SNPN｜poSsessive pronoun, first, singular, nominative, plural, neuter",
    gloss: "mine",
  },
  ἐμά: {
    parse:
      "S-1SNPN｜poSsessive pronoun, first, singular, nominative, plural, neuter",
    gloss: "mine",
  },
  ἐμὰς: {
    parse:
      "S-1SAPF｜poSsessive pronoun, first, singular, accusative, plural, feminine",
    gloss: "mine",
  },
  ἐμῇ: {
    parse:
      "S-1SDSF｜poSsessive pronoun, first, singular, dative, singular, feminine",
    gloss: "mine",
  },
  ἐμή: {
    parse:
      "S-1SNSF｜poSsessive pronoun, first, singular, nominative, singular, feminine",
    gloss: "mine",
  },
  ἐμὴ: {
    parse:
      "S-1SNSF｜poSsessive pronoun, first, singular, nominative, singular, feminine",
    gloss: "mine",
  },
  ἐμήν: {
    parse:
      "S-1SASF｜poSsessive pronoun, first, singular, accusative, singular, feminine",
    gloss: "mine",
  },
  ἐμὴν: {
    parse:
      "S-1SASF｜poSsessive pronoun, first, singular, accusative, singular, feminine",
    gloss: "mine",
  },
  ἐμῆς: {
    parse:
      "S-1SGSF｜poSsessive pronoun, first, singular, genitive, singular, feminine",
    gloss: "mine",
  },
  ἐμοῖς: {
    parse:
      "S-1SDPN｜poSsessive pronoun, first, singular, dative, plural, neuter",
    gloss: "mine",
  },
  ἐμόν: {
    parse:
      "S-1SASM｜poSsessive pronoun, first, singular, accusative, singular, masculine",
    gloss: "mine",
  },
  ἐμὸν: {
    parse:
      "S-1SNSN｜poSsessive pronoun, first, singular, nominative, singular, neuter",
    gloss: "mine",
  },
  Ἐμὸν: {
    parse:
      "S-1SNSN｜poSsessive pronoun, first, singular, nominative, singular, neuter",
    gloss: "mine",
  },
  ἐμὸς: {
    parse:
      "S-1SNSM｜poSsessive pronoun, first, singular, nominative, singular, masculine",
    gloss: "mine",
  },
  ἐμοὺς: {
    parse:
      "S-1SAPM｜poSsessive pronoun, first, singular, accusative, plural, masculine",
    gloss: "mine",
  },
  ἐμῷ: {
    parse:
      "S-1SDSN｜poSsessive pronoun, first, singular, dative, singular, neuter",
    gloss: "mine",
  },
  ἐμῶν: {
    parse:
      "S-1SGPN｜poSsessive pronoun, first, singular, genitive, plural, neuter",
    gloss: "mine",
  },
  ἡλίκην: {
    parse: "I-ASF｜Interrogative pronoun, accusative, singular, feminine",
    gloss: "how great",
  },
  ἡλίκον: {
    parse: "I-NSN｜Interrogative pronoun, nominative, singular, neuter",
    gloss: "how great",
  },
  ἡμετέρα: {
    parse:
      "S-1PNSF｜poSsessive pronoun, first, plural, nominative, singular, feminine",
    gloss: "our",
  },
  ἡμετέραις: {
    parse:
      "S-1PDPF｜poSsessive pronoun, first, plural, dative, plural, feminine",
    gloss: "our",
  },
  ἡμετέραν: {
    parse:
      "S-1PASF｜poSsessive pronoun, first, plural, accusative, singular, feminine",
    gloss: "our",
  },
  ἡμετέρας: {
    parse:
      "S-1PGSF｜poSsessive pronoun, first, plural, genitive, singular, feminine",
    gloss: "our",
  },
  ἡμέτεροι: {
    parse:
      "S-1PNPM｜poSsessive pronoun, first, plural, nominative, plural, masculine",
    gloss: "our",
  },
  ἡμετέροις: {
    parse:
      "S-1PDPM｜poSsessive pronoun, first, plural, dative, plural, masculine",
    gloss: "our",
  },
  ἡμετέρων: {
    parse:
      "S-1PGPF｜poSsessive pronoun, first, plural, genitive, plural, feminine",
    gloss: "our",
  },
  κἀγώ: {
    parse: "P-1NS-K｜Personal pronoun, first, nominative, singular, Kai",
    gloss: "and I",
  },
  Κἀγώ: {
    parse: "P-1NS｜Personal pronoun, first, nominative, singular",
    gloss: "and I",
  },
  Κἀγὼ: {
    parse: "P-1NS｜Personal pronoun, first, nominative, singular",
    gloss: "and I",
  },
  κἀγὼ: {
    parse: "P-1NS-K｜Personal pronoun, first, nominative, singular, Kai",
    gloss: "and I",
  },
  "καὶ ἐγώ": {
    parse: "P-1NS-K｜Personal pronoun, first, nominative, singular, Kai",
    gloss: "and I",
  },
  "καὶ ἐγὼ": {
    parse: "P-1NS-K｜Personal pronoun, first, nominative, singular, Kai",
    gloss: "and I",
  },
  Κἀμὲ: {
    parse: "P-1AS｜Personal pronoun, first, accusative, singular",
    gloss: "and I",
  },
  κἀμὲ: {
    parse: "P-1AS-K｜Personal pronoun, first, accusative, singular, Kai",
    gloss: "and I",
  },
  κἀμοί: {
    parse: "P-1DS-K｜Personal pronoun, first, dative, singular, Kai",
    gloss: "and I",
  },
  κἀμοὶ: {
    parse: "P-1DS-K｜Personal pronoun, first, dative, singular, Kai",
    gloss: "and I",
  },
  κἀκεῖνα: {
    parse: "D-NPN｜Demonstrative pronoun, nominative, plural, neuter",
    gloss: "and that one",
  },
  κἀκεῖνοι: {
    parse: "D-NPM｜Demonstrative pronoun, nominative, plural, masculine",
    gloss: "and that one",
  },
  κἀκεῖνον: {
    parse: "D-ASM｜Demonstrative pronoun, accusative, singular, masculine",
    gloss: "and that one",
  },
  κἀκεῖνος: {
    parse: "D-NSM｜Demonstrative pronoun, nominative, singular, masculine",
    gloss: "and that one",
  },
  κἀκεῖνός: {
    parse: "D-NSM｜Demonstrative pronoun, nominative, singular, masculine",
    gloss: "and that one",
  },
  κἀκείνους: {
    parse: "D-APM｜Demonstrative pronoun, accusative, plural, masculine",
    gloss: "and that one",
  },
  αἱ: {
    parse: "R-NPF｜Relative pronoun, nominative, plural, feminine",
    gloss: "which",
  },
  αἵ: {
    parse: "R-NPF｜Relative pronoun, nominative, plural, feminine",
    gloss: "which",
  },
  ὅ: {
    parse: "R-NSN｜Relative pronoun, nominative, singular, neuter",
    gloss: "which",
  },
  οἵ: {
    parse: "R-NPM｜Relative pronoun, nominative, plural, masculine",
    gloss: "which",
  },
  Τάδε: {
    parse: "D-APN｜Demonstrative pronoun, accusative, plural, neuter",
    gloss: "this",
  },
  τῇδε: {
    parse: "D-DSF｜Demonstrative pronoun, dative, singular, feminine",
    gloss: "this",
  },
  τήνδε: {
    parse: "D-ASF｜Demonstrative pronoun, accusative, singular, feminine",
    gloss: "this",
  },
  οἷα: {
    parse: "K-APN｜correlative pronoun, accusative, plural, neuter",
    gloss: "such as",
  },
  οἷά: {
    parse: "K-NPN｜correlative pronoun, nominative, plural, neuter",
    gloss: "such as",
  },
  οἵα: {
    parse: "K-NSF｜correlative pronoun, nominative, singular, feminine",
    gloss: "such as",
  },
  οἷοι: {
    parse: "K-NPM｜correlative pronoun, nominative, plural, masculine",
    gloss: "such as",
  },
  οἷοί: {
    parse: "K-NPM｜correlative pronoun, nominative, plural, masculine",
    gloss: "such as",
  },
  οἷον: {
    parse: "K-NSN｜correlative pronoun, nominative, singular, neuter",
    gloss: "such as",
  },
  οἷος: {
    parse: "K-NSM｜correlative pronoun, nominative, singular, masculine",
    gloss: "such as",
  },
  οἵους: {
    parse: "K-APM｜correlative pronoun, accusative, plural, masculine",
    gloss: "such as",
  },
  ὁποίαν: {
    parse: "I-ASF｜Interrogative pronoun, accusative, singular, feminine",
    gloss: "what sort",
  },
  ὁποῖοί: {
    parse: "I-NPM｜Interrogative pronoun, nominative, plural, masculine",
    gloss: "what sort",
  },
  ὁποῖόν: {
    parse: "I-NSN｜Interrogative pronoun, nominative, singular, neuter",
    gloss: "what sort",
  },
  ὁποῖος: {
    parse: "I-NSM｜Interrogative pronoun, nominative, singular, masculine",
    gloss: "what sort",
  },
  ἅ: {
    parse: "R-NPN｜Relative pronoun, nominative, plural, neuter",
    gloss: "which",
  },
  ἃ: {
    parse: "R-NPN｜Relative pronoun, nominative, plural, neuter",
    gloss: "which",
  },
  Ἃ: {
    parse: "R-APN｜Relative pronoun, accusative, plural, neuter",
    gloss: "which",
  },
  αἳ: {
    parse: "R-NPF｜Relative pronoun, nominative, plural, feminine",
    gloss: "which",
  },
  αἷς: {
    parse: "R-DPF｜Relative pronoun, dative, plural, feminine",
    gloss: "which",
  },
  ἃς: {
    parse: "R-APF｜Relative pronoun, accusative, plural, feminine",
    gloss: "which",
  },
  ᾗ: {
    parse: "R-DSF｜Relative pronoun, dative, singular, feminine",
    gloss: "which",
  },
  ἣ: {
    parse: "R-NSF｜Relative pronoun, nominative, singular, feminine",
    gloss: "which",
  },
  ἥν: {
    parse: "R-ASF｜Relative pronoun, accusative, singular, feminine",
    gloss: "which",
  },
  ἣν: {
    parse: "R-ASF｜Relative pronoun, accusative, singular, feminine",
    gloss: "which",
  },
  ἧς: {
    parse: "R-GSF｜Relative pronoun, genitive, singular, feminine",
    gloss: "which",
  },
  Ὅ: {
    parse: "R-ASN｜Relative pronoun, accusative, singular, neuter",
    gloss: "which",
  },
  ὃ: {
    parse: "R-NSN｜Relative pronoun, nominative, singular, neuter",
    gloss: "which",
  },
  Ὃ: {
    parse: "R-NSN｜Relative pronoun, nominative, singular, neuter",
    gloss: "which",
  },
  οἳ: {
    parse: "R-NPM｜Relative pronoun, nominative, plural, masculine",
    gloss: "which",
  },
  οἷς: {
    parse: "R-DPN｜Relative pronoun, dative, plural, neuter",
    gloss: "which",
  },
  Οἷς: {
    parse: "R-DPM｜Relative pronoun, dative, plural, masculine",
    gloss: "which",
  },
  ὃν: {
    parse: "R-ASM｜Relative pronoun, accusative, singular, masculine",
    gloss: "which",
  },
  Ὃν: {
    parse: "R-ASM｜Relative pronoun, accusative, singular, masculine",
    gloss: "which",
  },
  ὅς: {
    parse: "R-NSM｜Relative pronoun, nominative, singular, masculine",
    gloss: "which",
  },
  ὃς: {
    parse: "R-NSM｜Relative pronoun, nominative, singular, masculine",
    gloss: "which",
  },
  Ὃς: {
    parse: "R-NSM｜Relative pronoun, nominative, singular, masculine",
    gloss: "which",
  },
  οὓς: {
    parse: "R-APM｜Relative pronoun, accusative, plural, masculine",
    gloss: "which",
  },
  Οὓς: {
    parse: "R-APM｜Relative pronoun, accusative, plural, masculine",
    gloss: "which",
  },
  ᾧ: {
    parse: "R-DSN｜Relative pronoun, dative, singular, neuter",
    gloss: "which",
  },
  ὧν: {
    parse: "R-GPN｜Relative pronoun, genitive, plural, neuter",
    gloss: "which",
  },
  ὅσα: {
    parse: "K-NPN｜correlative pronoun, nominative, plural, neuter",
    gloss: "just as/how much",
  },
  ὅσαι: {
    parse: "K-NPF｜correlative pronoun, nominative, plural, feminine",
    gloss: "just as/how much",
  },
  ὅσοι: {
    parse: "K-NPM｜correlative pronoun, nominative, plural, masculine",
    gloss: "just as/how much",
  },
  Ὅσοι: {
    parse: "K-NPM｜correlative pronoun, nominative, plural, masculine",
    gloss: "just as/how much",
  },
  ὅσον: {
    parse: "K-NSN｜correlative pronoun, nominative, singular, neuter",
    gloss: "just as/how much",
  },
  ὅσους: {
    parse: "K-APM｜correlative pronoun, accusative, plural, masculine",
    gloss: "just as/how much",
  },
  ὅσῳ: {
    parse: "K-DSN｜correlative pronoun, dative, singular, neuter",
    gloss: "just as/how much",
  },
  ὅσων: {
    parse: "K-GPM｜correlative pronoun, genitive, plural, masculine",
    gloss: "just as/how much",
  },
  αἵτινες: {
    parse: "R-NPF｜Relative pronoun, nominative, plural, feminine",
    gloss: "who/which",
  },
  ἅτινα: {
    parse: "R-NPN｜Relative pronoun, nominative, plural, neuter",
    gloss: "who/which",
  },
  ἅτινά: {
    parse: "R-NPN｜Relative pronoun, nominative, plural, neuter",
    gloss: "who/which",
  },
  ἥτις: {
    parse: "R-NSF｜Relative pronoun, nominative, singular, feminine",
    gloss: "who/which",
  },
  οἵτινες: {
    parse: "R-NPM｜Relative pronoun, nominative, plural, masculine",
    gloss: "who/which",
  },
  οἵτινές: {
    parse: "R-NPM｜Relative pronoun, nominative, plural, masculine",
    gloss: "who/which",
  },
  ὅστις: {
    parse: "R-NSM｜Relative pronoun, nominative, singular, masculine",
    gloss: "who/which",
  },
  ὅτου: {
    parse: "R-GSN｜Relative pronoun, genitive, singular, neuter",
    gloss: "who/which",
  },
  αὗται: {
    parse: "D-NPF｜Demonstrative pronoun, nominative, plural, feminine",
    gloss: "this/he/she/it",
  },
  αὗταί: {
    parse: "D-NPF｜Demonstrative pronoun, nominative, plural, feminine",
    gloss: "this/he/she/it",
  },
  αὕτη: {
    parse: "D-NSF｜Demonstrative pronoun, nominative, singular, feminine",
    gloss: "this/he/she/it",
  },
  Αὕτη: {
    parse: "D-NSF｜Demonstrative pronoun, nominative, singular, feminine",
    gloss: "this/he/she/it",
  },
  οὗτοι: {
    parse: "D-NPM｜Demonstrative pronoun, nominative, plural, masculine",
    gloss: "this/he/she/it",
  },
  Οὗτοι: {
    parse: "D-NPM｜Demonstrative pronoun, nominative, plural, masculine",
    gloss: "this/he/she/it",
  },
  οὗτοί: {
    parse: "D-NPM｜Demonstrative pronoun, nominative, plural, masculine",
    gloss: "this/he/she/it",
  },
  Οὗτοί: {
    parse: "D-NPM｜Demonstrative pronoun, nominative, plural, masculine",
    gloss: "this/he/she/it",
  },
  οὗτος: {
    parse: "D-NSM｜Demonstrative pronoun, nominative, singular, masculine",
    gloss: "this/he/she/it",
  },
  Οὗτος: {
    parse: "D-NSM｜Demonstrative pronoun, nominative, singular, masculine",
    gloss: "this/he/she/it",
  },
  οὗτός: {
    parse: "D-NSM｜Demonstrative pronoun, nominative, singular, masculine",
    gloss: "this/he/she/it",
  },
  Οὗτός: {
    parse: "D-NSM｜Demonstrative pronoun, nominative, singular, masculine",
    gloss: "this/he/she/it",
  },
  ταῦτα: {
    parse: "D-NPN｜Demonstrative pronoun, nominative, plural, neuter",
    gloss: "this/he/she/it",
  },
  Ταῦτα: {
    parse: "D-NPN｜Demonstrative pronoun, nominative, plural, neuter",
    gloss: "this/he/she/it",
  },
  Ταῦτά: {
    parse: "D-APN｜Demonstrative pronoun, accusative, plural, neuter",
    gloss: "this/he/she/it",
  },
  ταῦτά: {
    parse: "D-NPN｜Demonstrative pronoun, nominative, plural, neuter",
    gloss: "this/he/she/it",
  },
  ταύταις: {
    parse: "D-DPF｜Demonstrative pronoun, dative, plural, feminine",
    gloss: "this/he/she/it",
  },
  ταύτας: {
    parse: "D-APF｜Demonstrative pronoun, accusative, plural, feminine",
    gloss: "this/he/she/it",
  },
  ταύτῃ: {
    parse: "D-DSF｜Demonstrative pronoun, dative, singular, feminine",
    gloss: "this/he/she/it",
  },
  ταύτην: {
    parse: "D-ASF｜Demonstrative pronoun, accusative, singular, feminine",
    gloss: "this/he/she/it",
  },
  Ταύτην: {
    parse: "D-ASF｜Demonstrative pronoun, accusative, singular, feminine",
    gloss: "this/he/she/it",
  },
  ταύτης: {
    parse: "D-GSF｜Demonstrative pronoun, genitive, singular, feminine",
    gloss: "this/he/she/it",
  },
  τοῦτʼ: {
    parse: "D-NSN｜Demonstrative pronoun, nominative, singular, neuter",
    gloss: "this/he/she/it",
  },
  τοῦτο: {
    parse: "D-NSN｜Demonstrative pronoun, nominative, singular, neuter",
    gloss: "this/he/she/it",
  },
  Τοῦτο: {
    parse: "D-NSN｜Demonstrative pronoun, nominative, singular, neuter",
    gloss: "this/he/she/it",
  },
  τοῦτό: {
    parse: "D-NSN｜Demonstrative pronoun, nominative, singular, neuter",
    gloss: "this/he/she/it",
  },
  Τοῦτό: {
    parse: "D-NSN｜Demonstrative pronoun, nominative, singular, neuter",
    gloss: "this/he/she/it",
  },
  τούτοις: {
    parse: "D-DPN｜Demonstrative pronoun, dative, plural, neuter",
    gloss: "this/he/she/it",
  },
  τοῦτον: {
    parse: "D-ASM｜Demonstrative pronoun, accusative, singular, masculine",
    gloss: "this/he/she/it",
  },
  Τοῦτον: {
    parse: "D-ASM｜Demonstrative pronoun, accusative, singular, masculine",
    gloss: "this/he/she/it",
  },
  τούτου: {
    parse: "D-GSN｜Demonstrative pronoun, genitive, singular, neuter",
    gloss: "this/he/she/it",
  },
  Τούτου: {
    parse: "D-GSN｜Demonstrative pronoun, genitive, singular, neuter",
    gloss: "this/he/she/it",
  },
  τούτους: {
    parse: "D-APM｜Demonstrative pronoun, accusative, plural, masculine",
    gloss: "this/he/she/it",
  },
  Τούτους: {
    parse: "D-APM｜Demonstrative pronoun, accusative, plural, masculine",
    gloss: "this/he/she/it",
  },
  τούτῳ: {
    parse: "D-DSN｜Demonstrative pronoun, dative, singular, neuter",
    gloss: "this/he/she/it",
  },
  τούτων: {
    parse: "D-GPN｜Demonstrative pronoun, genitive, plural, neuter",
    gloss: "this/he/she/it",
  },
  Τούτων: {
    parse: "D-GPN｜Demonstrative pronoun, genitive, plural, neuter",
    gloss: "this/he/she/it",
  },
  πηλίκοις: {
    parse: "I-DPN｜Interrogative pronoun, dative, plural, neuter",
    gloss: "how great",
  },
  πηλίκος: {
    parse: "I-NSM｜Interrogative pronoun, nominative, singular, masculine",
    gloss: "how great",
  },
  Ποῖα: {
    parse: "I-APN｜Interrogative pronoun, accusative, plural, neuter",
    gloss: "what?",
  },
  ποίᾳ: {
    parse: "I-DSF｜Interrogative pronoun, dative, singular, feminine",
    gloss: "what?",
  },
  ποία: {
    parse: "I-NSF｜Interrogative pronoun, nominative, singular, feminine",
    gloss: "what?",
  },
  Ποία: {
    parse: "I-NSF｜Interrogative pronoun, nominative, singular, feminine",
    gloss: "what?",
  },
  ποίαν: {
    parse: "I-ASF｜Interrogative pronoun, accusative, singular, feminine",
    gloss: "what?",
  },
  Ποίας: {
    parse: "I-APF｜Interrogative pronoun, accusative, plural, feminine",
    gloss: "what?",
  },
  ποίας: {
    parse: "I-GSF｜Interrogative pronoun, genitive, singular, feminine",
    gloss: "what?",
  },
  ποῖον: {
    parse: "I-NSN｜Interrogative pronoun, nominative, singular, neuter",
    gloss: "what?",
  },
  ποίου: {
    parse: "I-GSM｜Interrogative pronoun, genitive, singular, masculine",
    gloss: "what?",
  },
  ποίῳ: {
    parse: "I-DSN｜Interrogative pronoun, dative, singular, neuter",
    gloss: "what?",
  },
  πόσα: {
    parse:
      "Q-APN｜correlative or interrogative pronoun, accusative, plural, neuter",
    gloss: "how much/many",
  },
  πόσαι: {
    parse:
      "Q-NPF｜correlative or interrogative pronoun, nominative, plural, feminine",
    gloss: "how much/many",
  },
  πόσας: {
    parse:
      "Q-APF｜correlative or interrogative pronoun, accusative, plural, feminine",
    gloss: "how much/many",
  },
  πόσην: {
    parse:
      "Q-ASF｜correlative or interrogative pronoun, accusative, singular, feminine",
    gloss: "how much/many",
  },
  Πόσοι: {
    parse:
      "Q-NPM｜correlative or interrogative pronoun, nominative, plural, masculine",
    gloss: "how much/many",
  },
  πόσον: {
    parse:
      "Q-NSN｜correlative or interrogative pronoun, nominative, singular, neuter",
    gloss: "how much/many",
  },
  Πόσον: {
    parse:
      "Q-ASN｜correlative or interrogative pronoun, accusative, singular, neuter",
    gloss: "how much/many",
  },
  Πόσος: {
    parse:
      "Q-NSM｜correlative or interrogative pronoun, nominative, singular, masculine",
    gloss: "how much/many",
  },
  πόσους: {
    parse:
      "Q-APM｜correlative or interrogative pronoun, accusative, plural, masculine",
    gloss: "how much/many",
  },
  Πόσους: {
    parse:
      "Q-APM｜correlative or interrogative pronoun, accusative, plural, masculine",
    gloss: "how much/many",
  },
  πόσῳ: {
    parse:
      "Q-DSN｜correlative or interrogative pronoun, dative, singular, neuter",
    gloss: "how much/many",
  },
  πόσων: {
    parse:
      "Q-GPF｜correlative or interrogative pronoun, genitive, plural, feminine",
    gloss: "how much/many",
  },
  ποταπαὶ: {
    parse: "I-NPF｜Interrogative pronoun, nominative, plural, feminine",
    gloss: "of what kind?",
  },
  ποταπὴ: {
    parse: "I-NSF｜Interrogative pronoun, nominative, singular, feminine",
    gloss: "of what kind?",
  },
  ποταπὴν: {
    parse: "I-ASF｜Interrogative pronoun, accusative, singular, feminine",
    gloss: "of what kind?",
  },
  ποταποὶ: {
    parse: "I-NPM｜Interrogative pronoun, nominative, plural, masculine",
    gloss: "of what kind?",
  },
  Ποταπός: {
    parse: "I-NSM｜Interrogative pronoun, nominative, singular, masculine",
    gloss: "of what kind?",
  },
  ποταπὸς: {
    parse: "I-NSM｜Interrogative pronoun, nominative, singular, masculine",
    gloss: "of what kind?",
  },
  ποταποὺς: {
    parse: "I-APM｜Interrogative pronoun, accusative, plural, masculine",
    gloss: "of what kind?",
  },
  σεαυτόν: {
    parse: "F-2ASM｜reFlexive pronoun, second, accusative, singular, masculine",
    gloss: "yourself",
  },
  σεαυτὸν: {
    parse: "F-2ASM｜reFlexive pronoun, second, accusative, singular, masculine",
    gloss: "yourself",
  },
  σεαυτοῦ: {
    parse: "F-2GSM｜reFlexive pronoun, second, genitive, singular, masculine",
    gloss: "yourself",
  },
  σεαυτῷ: {
    parse: "F-2DSM｜reFlexive pronoun, second, dative, singular, masculine",
    gloss: "yourself",
  },
  σὰ: {
    parse:
      "S-2SNPN｜poSsessive pronoun, second, singular, nominative, plural, neuter",
    gloss: "your",
  },
  σά: {
    parse:
      "S-2SNPN｜poSsessive pronoun, second, singular, nominative, plural, neuter",
    gloss: "your",
  },
  σῇ: {
    parse:
      "S-2SDSF｜poSsessive pronoun, second, singular, dative, singular, feminine",
    gloss: "your",
  },
  σὴν: {
    parse:
      "S-2SASF｜poSsessive pronoun, second, singular, accusative, singular, feminine",
    gloss: "your",
  },
  σῆς: {
    parse:
      "S-2SGSF｜poSsessive pronoun, second, singular, genitive, singular, feminine",
    gloss: "your",
  },
  σοὶ: {
    parse: "P-2DS｜Personal pronoun, second, dative, singular",
    gloss: "you",
  },
  σόν: {
    parse:
      "S-2SASN｜poSsessive pronoun, second, singular, accusative, singular, neuter",
    gloss: "your",
  },
  σὸν: {
    parse:
      "S-2SNSN｜poSsessive pronoun, second, singular, nominative, singular, neuter",
    gloss: "your",
  },
  σὸς: {
    parse:
      "S-2SNSM｜poSsessive pronoun, second, singular, nominative, singular, masculine",
    gloss: "your",
  },
  σούς: {
    parse:
      "S-2SAPM｜poSsessive pronoun, second, singular, accusative, plural, masculine",
    gloss: "your",
  },
  σῷ: {
    parse:
      "S-2SDSN｜poSsessive pronoun, second, singular, dative, singular, neuter",
    gloss: "your",
  },
  σε: {
    parse: "P-2AS｜Personal pronoun, second, accusative, singular",
    gloss: "you",
  },
  σέ: {
    parse: "P-2AS｜Personal pronoun, second, accusative, singular",
    gloss: "you",
  },
  σὲ: {
    parse: "P-2AS｜Personal pronoun, second, accusative, singular",
    gloss: "you",
  },
  σοι: {
    parse: "P-2DS｜Personal pronoun, second, dative, singular",
    gloss: "you",
  },
  σοί: {
    parse: "P-2DS｜Personal pronoun, second, dative, singular",
    gloss: "you",
  },
  Σοὶ: {
    parse: "P-2DS｜Personal pronoun, second, dative, singular",
    gloss: "you",
  },
  σου: {
    parse: "P-2GS｜Personal pronoun, second, genitive, singular",
    gloss: "you",
  },
  σού: {
    parse: "P-2GS｜Personal pronoun, second, genitive, singular",
    gloss: "you",
  },
  σοῦ: {
    parse: "P-2GS｜Personal pronoun, second, genitive, singular",
    gloss: "you",
  },
  σύ: {
    parse: "P-2NS｜Personal pronoun, second, nominative, singular",
    gloss: "you",
  },
  σὺ: {
    parse: "P-2NS｜Personal pronoun, second, nominative, singular",
    gloss: "you",
  },
  Σὺ: {
    parse: "P-2NS｜Personal pronoun, second, nominative, singular",
    gloss: "you",
  },
  ὑμᾶς: {
    parse: "P-2AP｜Personal pronoun, second, accusative, plural",
    gloss: "you",
  },
  ὑμεῖς: {
    parse: "P-2NP｜Personal pronoun, second, nominative, plural",
    gloss: "you",
  },
  Ὑμεῖς: {
    parse: "P-2NP｜Personal pronoun, second, nominative, plural",
    gloss: "you",
  },
  ὑμῖν: {
    parse: "P-2DP｜Personal pronoun, second, dative, plural",
    gloss: "you",
  },
  Ὑμῖν: {
    parse: "P-2DP｜Personal pronoun, second, dative, plural",
    gloss: "you",
  },
  ὑμῶν: {
    parse: "P-2GP｜Personal pronoun, second, genitive, plural",
    gloss: "you",
  },
  τηλικαῦτα: {
    parse: "D-NPN｜Demonstrative pronoun, nominative, plural, neuter",
    gloss: "so great",
  },
  τηλικαύτης: {
    parse: "D-GSF｜Demonstrative pronoun, genitive, singular, feminine",
    gloss: "so great",
  },
  τηλικοῦτος: {
    parse: "D-NSM｜Demonstrative pronoun, nominative, singular, masculine",
    gloss: "so great",
  },
  τηλικούτου: {
    parse: "D-GSM｜Demonstrative pronoun, genitive, singular, masculine",
    gloss: "so great",
  },
  τι: {
    parse: "X-NSN｜indefinite pronoun, nominative, singular, neuter",
    gloss: "one",
  },
  τί: {
    parse: "I-NSN｜Interrogative pronoun, nominative, singular, neuter",
    gloss: "which?",
  },
  τινα: {
    parse: "X-NPN｜indefinite pronoun, nominative, plural, neuter",
    gloss: "one",
  },
  τινά: {
    parse: "X-ASF｜indefinite pronoun, accusative, singular, feminine",
    gloss: "one",
  },
  τινὰ: {
    parse: "X-ASM｜indefinite pronoun, accusative, singular, masculine",
    gloss: "one",
  },
  τινας: {
    parse: "X-APM｜indefinite pronoun, accusative, plural, masculine",
    gloss: "one",
  },
  τινάς: {
    parse: "X-APF｜indefinite pronoun, accusative, plural, feminine",
    gloss: "one",
  },
  τινὰς: {
    parse: "X-APM｜indefinite pronoun, accusative, plural, masculine",
    gloss: "one",
  },
  τινες: {
    parse: "X-NPM｜indefinite pronoun, nominative, plural, masculine",
    gloss: "one",
  },
  τινές: {
    parse: "X-NPM｜indefinite pronoun, nominative, plural, masculine",
    gloss: "one",
  },
  τινὲς: {
    parse: "X-NPM｜indefinite pronoun, nominative, plural, masculine",
    gloss: "one",
  },
  Τινὲς: {
    parse: "X-NPM｜indefinite pronoun, nominative, plural, masculine",
    gloss: "one",
  },
  τινι: {
    parse: "X-DSN｜indefinite pronoun, dative, singular, neuter",
    gloss: "one",
  },
  τινὶ: {
    parse: "X-DSM｜indefinite pronoun, dative, singular, masculine",
    gloss: "one",
  },
  τινος: {
    parse: "X-GSN｜indefinite pronoun, genitive, singular, neuter",
    gloss: "one",
  },
  τινός: {
    parse: "X-GSM｜indefinite pronoun, genitive, singular, masculine",
    gloss: "one",
  },
  τινὸς: {
    parse: "X-GSM｜indefinite pronoun, genitive, singular, masculine",
    gloss: "one",
  },
  τινῶν: {
    parse: "X-GPM｜indefinite pronoun, genitive, plural, masculine",
    gloss: "one",
  },
  τινων: {
    parse: "X-GPN｜indefinite pronoun, genitive, plural, neuter",
    gloss: "one",
  },
  Τινῶν: {
    parse: "X-GPM｜indefinite pronoun, genitive, plural, masculine",
    gloss: "one",
  },
  τις: {
    parse: "X-NSM｜indefinite pronoun, nominative, singular, masculine",
    gloss: "one",
  },
  τίς: {
    parse: "I-NSM｜Interrogative pronoun, nominative, singular, masculine",
    gloss: "which?",
  },
  τισιν: {
    parse: "X-DPM｜indefinite pronoun, dative, plural, masculine",
    gloss: "one",
  },
  τισίν: {
    parse: "X-DPM｜indefinite pronoun, dative, plural, masculine",
    gloss: "one",
  },
  τισὶν: {
    parse: "X-DPM｜indefinite pronoun, dative, plural, masculine",
    gloss: "one",
  },
  Τί: {
    parse: "I-NSN｜Interrogative pronoun, nominative, singular, neuter",
    gloss: "which?",
  },
  τίνα: {
    parse: "I-NPN｜Interrogative pronoun, nominative, plural, neuter",
    gloss: "which?",
  },
  Τίνα: {
    parse: "I-ASM｜Interrogative pronoun, accusative, singular, masculine",
    gloss: "which?",
  },
  τίνας: {
    parse: "I-APM｜Interrogative pronoun, accusative, plural, masculine",
    gloss: "which?",
  },
  τίνες: {
    parse: "I-NPM｜Interrogative pronoun, nominative, plural, masculine",
    gloss: "which?",
  },
  Τίνες: {
    parse: "I-NPM｜Interrogative pronoun, nominative, plural, masculine",
    gloss: "which?",
  },
  τίνι: {
    parse: "I-DSN｜Interrogative pronoun, dative, singular, neuter",
    gloss: "which?",
  },
  Τίνι: {
    parse: "I-DSN｜Interrogative pronoun, dative, singular, neuter",
    gloss: "which?",
  },
  τίνος: {
    parse: "I-GSN｜Interrogative pronoun, genitive, singular, neuter",
    gloss: "which?",
  },
  Τίνος: {
    parse: "I-GSM｜Interrogative pronoun, genitive, singular, masculine",
    gloss: "which?",
  },
  τίνων: {
    parse: "I-GPN｜Interrogative pronoun, genitive, plural, neuter",
    gloss: "which?",
  },
  Τίς: {
    parse: "I-NSM｜Interrogative pronoun, nominative, singular, masculine",
    gloss: "which?",
  },
  τίσιν: {
    parse: "I-DPM｜Interrogative pronoun, dative, plural, masculine",
    gloss: "which?",
  },
  τοιᾶσδε: {
    parse: "D-GSF｜Demonstrative pronoun, genitive, singular, feminine",
    gloss: "such as this",
  },
  τοιαῦτα: {
    parse: "D-APN｜Demonstrative pronoun, accusative, plural, neuter",
    gloss: "such as this",
  },
  τοιαῦται: {
    parse: "D-NPF｜Demonstrative pronoun, nominative, plural, feminine",
    gloss: "such as this",
  },
  τοιαύταις: {
    parse: "D-DPF｜Demonstrative pronoun, dative, plural, feminine",
    gloss: "such as this",
  },
  τοιαύτας: {
    parse: "D-APF｜Demonstrative pronoun, accusative, plural, feminine",
    gloss: "such as this",
  },
  τοιαύτη: {
    parse: "D-NSF｜Demonstrative pronoun, nominative, singular, feminine",
    gloss: "such as this",
  },
  τοιαύτην: {
    parse: "D-ASF｜Demonstrative pronoun, accusative, singular, feminine",
    gloss: "such as this",
  },
  τοιοῦτο: {
    parse: "D-ASN｜Demonstrative pronoun, accusative, singular, neuter",
    gloss: "such as this",
  },
  τοιοῦτοι: {
    parse: "D-NPM｜Demonstrative pronoun, nominative, plural, masculine",
    gloss: "such as this",
  },
  τοιούτοις: {
    parse: "D-DPN｜Demonstrative pronoun, dative, plural, neuter",
    gloss: "such as this",
  },
  τοιοῦτον: {
    parse: "D-ASM｜Demonstrative pronoun, accusative, singular, masculine",
    gloss: "such as this",
  },
  τοιοῦτος: {
    parse: "D-NSM｜Demonstrative pronoun, nominative, singular, masculine",
    gloss: "such as this",
  },
  Τοιοῦτος: {
    parse: "D-NSM｜Demonstrative pronoun, nominative, singular, masculine",
    gloss: "such as this",
  },
  τοιούτου: {
    parse: "D-GSM｜Demonstrative pronoun, genitive, singular, masculine",
    gloss: "such as this",
  },
  τοιούτους: {
    parse: "D-APM｜Demonstrative pronoun, accusative, plural, masculine",
    gloss: "such as this",
  },
  τοιούτῳ: {
    parse: "D-DSM｜Demonstrative pronoun, dative, singular, masculine",
    gloss: "such as this",
  },
  τοιούτων: {
    parse: "D-GPN｜Demonstrative pronoun, genitive, plural, neuter",
    gloss: "such as this",
  },
  τοσαῦτα: {
    parse: "D-NPN｜Demonstrative pronoun, nominative, plural, neuter",
    gloss: "so great",
  },
  τοσαύτην: {
    parse: "D-ASF｜Demonstrative pronoun, accusative, singular, feminine",
    gloss: "so great",
  },
  τοσοῦτο: {
    parse: "D-ASN｜Demonstrative pronoun, accusative, singular, neuter",
    gloss: "so great",
  },
  τοσοῦτοι: {
    parse: "D-NPM｜Demonstrative pronoun, nominative, plural, masculine",
    gloss: "so great",
  },
  τοσοῦτον: {
    parse: "D-ASN｜Demonstrative pronoun, accusative, singular, neuter",
    gloss: "so great",
  },
  τοσοῦτος: {
    parse: "D-NSM｜Demonstrative pronoun, nominative, singular, masculine",
    gloss: "so great",
  },
  τοσούτου: {
    parse: "D-GSN｜Demonstrative pronoun, genitive, singular, neuter",
    gloss: "so great",
  },
  τοσούτους: {
    parse: "D-APM｜Demonstrative pronoun, accusative, plural, masculine",
    gloss: "so great",
  },
  Τοσούτῳ: {
    parse: "D-DSM｜Demonstrative pronoun, dative, singular, masculine",
    gloss: "so great",
  },
  τοσούτῳ: {
    parse: "D-DSN｜Demonstrative pronoun, dative, singular, neuter",
    gloss: "so great",
  },
  τοσούτων: {
    parse: "D-GPM｜Demonstrative pronoun, genitive, plural, masculine",
    gloss: "so great",
  },
};

let checkPronouns = {};

for (let pronoun in pronouns) {
  let splitProOnLine = pronouns[pronoun].parse.split("｜");
  let splitOnSpace = splitProOnLine[1].split(" ");
  let typeOfPronoun = splitOnSpace[0];
  if (checkPronouns[typeOfPronoun] === undefined) {
    checkPronouns[typeOfPronoun] = 1;
  } else {
    checkPronouns[typeOfPronoun] += 1;
  }
}
/*
{
  reCiprocal: 3,  ἀλλήλοις, "one another", parse: "C-DPN｜reCiprocal pronoun, dative, plural, neuter" : dative-accusative-genitive
  ->
  Personal: 78,   αὐτό, "it/she/he", parse: "P-ASN｜Personal pronoun, accusative, singular, neuter" : has all cases
  reFlexive: 28,    αὑτοῦ, "themself", parse: "F-3GSM｜reFlexive pronoun, third, genitive, singular, masculine"
  poSsessive: 36,     ἐμὰ, "mine", "S-1SNPN｜poSsessive pronoun, first, singular, nominative, plural, neuter"
  Demonstrative: 99,  ἐκεῖνα, "that",  parse: "D-APN｜Demonstrative pronoun, accusative, plural, neuter"
  Interrogative: 40,  ὁποίαν, "what sort",   parse: "I-ASF｜Interrogative pronoun, accusative, singular, feminine"
  Relative: 38,      ὅ, "which", parse: "R-NSN｜Relative pronoun, nominative, singular, neuter"
  correlative: 28,   οἷος, "such as", parse: "K-NSM｜correlative pronoun, nominative, singular, masculine"
  indefinite: 23,    τι, "one", parse: "X-NSN｜indefinite pronoun, nominative, singular, neuter"
}
*/

console.log(checkPronouns);

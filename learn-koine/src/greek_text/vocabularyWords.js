let mostCommonGK = `ὁ, ἡ, τό
καί
αὐτός, -ή, -ό
σύ
δέ
ἐν
ἐγώ
εἰμί
λέγω
εἰς
οὐ
ὅς, ἥ, ὅ
οὗτος, αὕτη, τοῦτο
θεός, -οῦ, ὁ
ὅτι
πᾶς, πᾶσα, πᾶν
μή
γάρ
Ἰησοῦς
ἐκ, ἐξ
ἐπί
κύριος, -ου, ὁ
ἔχω
πρός
γίνομαι
διά
ἵνα
ἀπό
ἀλλά
ἔρχομαι
τίς, τί
ποιέω
ἄνθρωπος, -ου, ὁ
τὶς, τὶ
Χριστός, -οῦ, ὁ
ὡς
εἰ`

let mostCommonEN = `the 
and, even, also
himself, herself, itself, same; he, she, it
you
but, and
in (dat)
I
I am
to say, speak
into (acc)
not, no
who, which
this; he, she, it
a god, God
that, because, since
all, every, all things
not, lest
for
Jesus, Joshua
out of, from (gen)
over, on, at the time of (gen); on the basis of, at (dat); on, to, against (acc)
a lord, the Lord
to have, hold
to, towards, with (acc)
to become, be
through (gen); on account of (acc)
in order that, that
from (gen)
but, yet, except
to come, go
who? which? what? why?
to do, make
a man
someone, something, a certain one, a certain thing, anyone, anything 
Christ, Messiah, Anointed One
as, that, like, how, about, now
if`

let mostCommonObj = {}

mostCommonGK = mostCommonGK.split('\n');
mostCommonEN = mostCommonEN.split('\n')

for (let i=0; i < mostCommonEN.length; i++) {
    mostCommonObj[mostCommonGK[i]] = mostCommonEN[i];
}

export {mostCommonObj};

console.log(mostCommonObj)
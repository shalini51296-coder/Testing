// Hindi (Devanagari) content. Akshara-based sequence (Nag & Snowling 2012; syllabus §3.6).
// Each letter: the akshara, its clip id for a human recording (North Indian female voice),
// TTS fallback text, and a keyword picture whose name STARTS with that akshara.

export const SWAR = [
  { l: 'अ', k: 'अनानास', e: '🍍' },
  { l: 'आ', k: 'आम', e: '🥭' },
  { l: 'इ', k: 'इमारत', e: '🏢' },
  { l: 'ई', k: 'ईंट', e: '🧱' },
  { l: 'उ', k: 'उल्लू', e: '🦉' },
  { l: 'ऊ', k: 'ऊन', e: '🧶' },
  { l: 'ए', k: 'एक', e: '1️⃣' },
  { l: 'ऐ', k: 'ऐनक', e: '👓' },
  { l: 'ओ', k: 'ओखली', e: '🥣' },
  { l: 'औ', k: 'औरत', e: '👩' },
  { l: 'अं', k: 'अंगूर', e: '🍇' },
  { l: 'अः', k: null, e: null }, // no common initial word; taught as a sound only
];

// Ordered for teaching: high-frequency, visually distinct consonants first.
export const VYANJAN = [
  { l: 'क', k: 'कबूतर', e: '🕊️' },
  { l: 'ग', k: 'गाय', e: '🐄' },
  { l: 'ज', k: 'जहाज़', e: '🚢' },
  { l: 'त', k: 'तरबूज़', e: '🍉' },
  { l: 'द', k: 'दरवाज़ा', e: '🚪' },
  { l: 'न', k: 'नल', e: '🚰' },
  { l: 'प', k: 'पतंग', e: '🪁' },
  { l: 'ब', k: 'बत्तख', e: '🦆' },
  { l: 'म', k: 'मछली', e: '🐟' },
  { l: 'र', k: 'राजा', e: '🤴' },
  { l: 'ल', k: 'लड़का', e: '👦' },
  { l: 'स', k: 'सेब', e: '🍎' },
  { l: 'ह', k: 'हाथी', e: '🐘' },
  { l: 'ख', k: 'खरगोश', e: '🐇' },
  { l: 'घ', k: 'घड़ी', e: '⏰' },
  { l: 'च', k: 'चम्मच', e: '🥄' },
  { l: 'छ', k: 'छाता', e: '☂️' },
  { l: 'झ', k: 'झंडा', e: '🚩' },
  { l: 'ट', k: 'टमाटर', e: '🍅' },
  { l: 'ठ', k: 'ठेला', e: '🛒' },
  { l: 'ड', k: 'डमरू', e: '🪘' },
  { l: 'ढ', k: 'ढोल', e: '🥁' },
  { l: 'थ', k: 'थाली', e: '🍽️' },
  { l: 'ध', k: 'धनुष', e: '🏹' },
  { l: 'फ', k: 'फूल', e: '🌸' },
  { l: 'भ', k: 'भालू', e: '🐻' },
  { l: 'य', k: 'यान', e: '🚀' },
  { l: 'व', k: 'वन', e: '🌳' },
  { l: 'श', k: 'शेर', e: '🦁' },
  { l: 'ष', k: 'षट्कोण', e: '⬡' },
  { l: 'ङ', k: null, e: null },
  { l: 'ञ', k: null, e: null },
  { l: 'ण', k: null, e: null },
  { l: 'क्ष', k: 'क्षत्रिय', e: '🛡️' },
  { l: 'त्र', k: 'त्रिशूल', e: '🔱' },
  { l: 'ज्ञ', k: 'ज्ञानी', e: '🧘' },
];

// Teaching groups (syllabus §3.6): swar in 3 groups, then consonants in groups of 5-6.
export const HI_GROUPS = [
  { id: 'hs1', letters: ['अ', 'आ', 'इ', 'ई'] },
  { id: 'hs2', letters: ['उ', 'ऊ', 'ए', 'ऐ'] },
  { id: 'hs3', letters: ['ओ', 'औ', 'अं', 'अः'] },
  { id: 'hv1', letters: ['क', 'ग', 'ज', 'त', 'द', 'न'] },
  { id: 'hv2', letters: ['प', 'ब', 'म', 'र', 'ल', 'स', 'ह'] },
  { id: 'hv3', letters: ['ख', 'घ', 'च', 'छ', 'झ', 'ट'] },
  { id: 'hv4', letters: ['ठ', 'ड', 'ढ', 'थ', 'ध', 'फ', 'भ'] },
  { id: 'hv5', letters: ['य', 'व', 'श', 'ष', 'ङ', 'ञ', 'ण'] },
];

const ALL = [...SWAR, ...VYANJAN];
export const LETTER = Object.fromEntries(ALL.map((x) => [x.l, x]));

// Akshara audio: human clip first; TTS fallback says the letter itself.
export const akSeg = (l) => ({ clip: `hi.${l}`, fb: l, lang: 'hi' });

// Words of 2-3 aksharas WITHOUT matras (first Hindi reading step).
// letters: the aksharas the word uses (for decodability checks).
// Each picture must be unambiguous: words without a clear picture are left out.
export const HI_WORDS_NOMATRA = [
  { w: 'जल', e: '💧', l: ['ज', 'ल'] },
  { w: 'घर', e: '🏠', l: ['घ', 'र'] },
  { w: 'नल', e: '🚰', l: ['न', 'ल'] },
  { w: 'फल', e: '🍎', l: ['फ', 'ल'] },
  { w: 'कमल', e: '🪷', l: ['क', 'म', 'ल'] },
  { w: 'बतख', e: '🦆', l: ['ब', 'त', 'ख'] },
  { w: 'कलम', e: '🖊️', l: ['क', 'ल', 'म'] },
  { w: 'बस', e: '🚌', l: ['ब', 'स'] },
  { w: 'नमक', e: '🧂', l: ['न', 'म', 'क'] },
  { w: 'मगर', e: '🐊', l: ['म', 'ग', 'र'] },
  { w: 'धन', e: '💰', l: ['ध', 'न'] },
  { w: 'वन', e: '🌳', l: ['व', 'न'] },
].filter((x) => x.e && x.l.length);

// Barakhadi (matras) for later levels.
export const MATRAS = [
  { m: 'ा', name: 'आ की मात्रा', ex: 'का' },
  { m: 'ि', name: 'इ की मात्रा', ex: 'कि' },
  { m: 'ी', name: 'ई की मात्रा', ex: 'की' },
  { m: 'ु', name: 'उ की मात्रा', ex: 'कु' },
  { m: 'ू', name: 'ऊ की मात्रा', ex: 'कू' },
  { m: 'े', name: 'ए की मात्रा', ex: 'के' },
  { m: 'ै', name: 'ऐ की मात्रा', ex: 'कै' },
  { m: 'ो', name: 'ओ की मात्रा', ex: 'को' },
  { m: 'ौ', name: 'औ की मात्रा', ex: 'कौ' },
  { m: 'ं', name: 'अनुस्वार', ex: 'कं' },
];

// Hindi number words 1-10 (oral, level 2). Irregular beyond 20: taught much later.
export const HI_NUM = ['शून्य', 'एक', 'दो', 'तीन', 'चार', 'पाँच', 'छह', 'सात', 'आठ', 'नौ', 'दस'];

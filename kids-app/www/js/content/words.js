// Picture word bank (English + Hindi). Each entry:
//   w   English word          e   picture (emoji placeholder until illustrations exist)
//   hi  Hindi word            c   categories
//   ph  phonemes (space-separated grapheme units) for decodable words
//   syl syllables (for clapping)  rh rhyme key override   fs first-sound override ('-' = exclude)
// Picture rule: a 4-year-old in India must name the picture with the intended word.
// Words like "tap" (Indian English: "nal") are deliberately excluded.

const W = [
  // ---------- animals ----------
  { w: 'cat', e: '🐈', hi: 'बिल्ली', c: 'animals', ph: 'c a t' },
  { w: 'dog', e: '🐕', hi: 'कुत्ता', c: 'animals', ph: 'd o g' },
  { w: 'pig', e: '🐖', hi: 'सूअर', c: 'animals', ph: 'p i g' },
  { w: 'hen', e: '🐔', hi: 'मुर्गी', c: 'animals', ph: 'h e n' },
  { w: 'fox', e: '🦊', hi: 'लोमड़ी', c: 'animals', ph: 'f o x' },
  { w: 'bat', e: '🦇', hi: 'चमगादड़', c: 'animals', ph: 'b a t' },
  { w: 'rat', e: '🐀', hi: 'चूहा', c: 'animals', ph: 'r a t' },
  { w: 'ant', e: '🐜', hi: 'चींटी', c: 'animals', ph: 'a n t' },
  { w: 'bug', e: '🐛', hi: 'कीड़ा', c: 'animals', ph: 'b u g' },
  { w: 'duck', e: '🦆', hi: 'बत्तख', c: 'animals', ph: 'd u ck' },
  { w: 'fish', e: '🐟', hi: 'मछली', c: 'animals', ph: 'f i sh' },
  { w: 'frog', e: '🐸', hi: 'मेंढक', c: 'animals', ph: 'f r o g' },
  { w: 'cow', e: '🐄', hi: 'गाय', c: 'animals', ph: 'c ow' },
  { w: 'owl', e: '🦉', hi: 'उल्लू', c: 'animals', ph: 'ow l' },
  { w: 'bee', e: '🐝', hi: 'मधुमक्खी', c: 'animals', ph: 'b ee' },
  { w: 'goat', e: '🐐', hi: 'बकरी', c: 'animals', ph: 'g oa t' },
  { w: 'sheep', e: '🐑', hi: 'भेड़', c: 'animals', ph: 'sh ee p' },
  { w: 'crab', e: '🦀', hi: 'केकड़ा', c: 'animals', ph: 'c r a b' },
  { w: 'snail', e: '🐌', hi: 'घोंघा', c: 'animals', ph: 's n ai l' },
  { w: 'chick', e: '🐥', hi: 'चूज़ा', c: 'animals', ph: 'ch i ck' },
  { w: 'elephant', e: '🐘', hi: 'हाथी', c: 'animals', syl: 'el e phant' , fs: 'e' },
  { w: 'tiger', e: '🐅', hi: 'बाघ', c: 'animals', syl: 'ti ger' },
  { w: 'lion', e: '🦁', hi: 'शेर', c: 'animals', syl: 'li on' },
  { w: 'monkey', e: '🐒', hi: 'बंदर', c: 'animals', syl: 'mon key' },
  { w: 'rabbit', e: '🐇', hi: 'खरगोश', c: 'animals', syl: 'rab bit' },
  { w: 'horse', e: '🐎', hi: 'घोड़ा', c: 'animals' },
  { w: 'zebra', e: '🦓', hi: 'ज़ेबरा', c: 'animals', syl: 'ze bra' },
  { w: 'giraffe', e: '🦒', hi: 'जिराफ़', c: 'animals', syl: 'gi raffe', fs: '-' },
  { w: 'parrot', e: '🦜', hi: 'तोता', c: 'animals', syl: 'par rot' },
  { w: 'peacock', e: '🦚', hi: 'मोर', c: 'animals', syl: 'pea cock' },
  { w: 'camel', e: '🐫', hi: 'ऊँट', c: 'animals', syl: 'cam el' },
  { w: 'snake', e: '🐍', hi: 'साँप', c: 'animals', rh: 'ake' },
  { w: 'bear', e: '🐻', hi: 'भालू', c: 'animals', rh: 'air' },
  { w: 'butterfly', e: '🦋', hi: 'तितली', c: 'animals', syl: 'but ter fly' },
  { w: 'spider', e: '🕷️', hi: 'मकड़ी', c: 'animals', syl: 'spi der' },
  { w: 'turtle', e: '🐢', hi: 'कछुआ', c: 'animals', syl: 'tur tle' },
  { w: 'penguin', e: '🐧', hi: 'पेंगुइन', c: 'animals', syl: 'pen guin' },
  { w: 'dolphin', e: '🐬', hi: 'डॉल्फ़िन', c: 'animals', syl: 'dol phin' },
  { w: 'kangaroo', e: '🦘', hi: 'कंगारू', c: 'animals', syl: 'kan ga roo' },
  { w: 'deer', e: '🦌', hi: 'हिरन', c: 'animals' },
  { w: 'wolf', e: '🐺', hi: 'भेड़िया', c: 'animals' },
  { w: 'bird', e: '🐦', hi: 'चिड़िया', c: 'animals' },
  { w: 'mouse', e: '🐁', hi: 'चूहा', c: 'animals' },

  // ---------- body ----------
  { w: 'hand', e: '✋', hi: 'हाथ', c: 'body', ph: 'h a n d' },
  { w: 'leg', e: '🦵', hi: 'टाँग', c: 'body', ph: 'l e g' },
  { w: 'lip', e: '👄', hi: 'होंठ', c: 'body', ph: 'l i p' },
  { w: 'ear', e: '👂', hi: 'कान', c: 'body', ph: 'ear' },
  { w: 'eye', e: '👁️', hi: 'आँख', c: 'body', fs: '-' },
  { w: 'nose', e: '👃', hi: 'नाक', c: 'body' },
  { w: 'foot', e: '🦶', hi: 'पैर', c: 'body' },
  { w: 'tooth', e: '🦷', hi: 'दाँत', c: 'body' },
  { w: 'arm', e: '💪', hi: 'बाँह', c: 'body', ph: 'ar m' },
  { w: 'thumb', e: '👍', hi: 'अँगूठा', c: 'body' },
  { w: 'brain', e: '🧠', hi: 'दिमाग', c: 'body' },

  // ---------- food ----------
  { w: 'egg', e: '🥚', hi: 'अंडा', c: 'food', ph: 'e g' },
  { w: 'nut', e: '🥜', hi: 'मूँगफली', c: 'food', ph: 'n u t' },
  { w: 'milk', e: '🥛', hi: 'दूध', c: 'food', ph: 'm i l k' },
  { w: 'corn', e: '🌽', hi: 'भुट्टा', c: 'food', ph: 'c or n' },
  { w: 'rice', e: '🍚', hi: 'चावल', c: 'food' },
  { w: 'roti', e: '🫓', hi: 'रोटी', c: 'food', syl: 'ro ti' },
  { w: 'cake', e: '🍰', hi: 'केक', c: 'food', rh: 'ake' },
  { w: 'bread', e: '🍞', hi: 'डबलरोटी', c: 'food' },
  { w: 'carrot', e: '🥕', hi: 'गाजर', c: 'food vegetables', syl: 'car rot' },
  { w: 'apple', e: '🍎', hi: 'सेब', c: 'food fruits', syl: 'ap ple' , fs: 'a' },
  { w: 'banana', e: '🍌', hi: 'केला', c: 'food fruits', syl: 'ba na na' },
  { w: 'mango', e: '🥭', hi: 'आम', c: 'food fruits', syl: 'man go' },
  { w: 'grapes', e: '🍇', hi: 'अंगूर', c: 'food fruits' },
  { w: 'orange', e: '🍊', hi: 'संतरा', c: 'food fruits', syl: 'or ange', fs: '-' },
  { w: 'lemon', e: '🍋', hi: 'नींबू', c: 'food fruits', syl: 'lem on' },
  { w: 'watermelon', e: '🍉', hi: 'तरबूज़', c: 'food fruits', syl: 'wa ter mel on' },
  { w: 'cherry', e: '🍒', hi: 'चेरी', c: 'food fruits', syl: 'cher ry' },
  { w: 'pear', e: '🍐', hi: 'नाशपाती', c: 'food fruits', rh: 'air' },
  { w: 'coconut', e: '🥥', hi: 'नारियल', c: 'food fruits', syl: 'co co nut' },
  { w: 'pineapple', e: '🍍', hi: 'अनानास', c: 'food fruits', syl: 'pine ap ple' },
  { w: 'tomato', e: '🍅', hi: 'टमाटर', c: 'food vegetables', syl: 'to ma to' },
  { w: 'potato', e: '🥔', hi: 'आलू', c: 'food vegetables', syl: 'po ta to' },
  { w: 'onion', e: '🧅', hi: 'प्याज़', c: 'food vegetables', syl: 'on ion', fs: '-' },
  { w: 'chilli', e: '🌶️', hi: 'मिर्च', c: 'food vegetables', syl: 'chil li' },
  { w: 'pizza', e: '🍕', hi: 'पिज़्ज़ा', c: 'food', syl: 'piz za' },
  { w: 'chips', e: '🍟', hi: 'चिप्स', c: 'food', ph: 'ch i p s' },
  { w: 'honey', e: '🍯', hi: 'शहद', c: 'food', syl: 'hon ey' },
  { w: 'tea', e: '🍵', hi: 'चाय', c: 'food', rh: 'ee' },
  { w: 'cookie', e: '🍪', hi: 'बिस्कुट', c: 'food', syl: 'cook ie' },
  { w: 'lollipop', e: '🍭', hi: 'लॉलीपॉप', c: 'food', syl: 'lol li pop' },
  { w: 'water', e: '💧', hi: 'पानी', c: 'food', syl: 'wa ter' },

  // ---------- vehicles ----------
  { w: 'bus', e: '🚌', hi: 'बस', c: 'vehicles', ph: 'b u s' },
  { w: 'van', e: '🚐', hi: 'वैन', c: 'vehicles', ph: 'v a n' },
  { w: 'jet', e: '✈️', hi: 'हवाई जहाज़', c: 'vehicles', ph: 'j e t' },
  { w: 'car', e: '🚗', hi: 'कार', c: 'vehicles', ph: 'c ar' },
  { w: 'ship', e: '🚢', hi: 'जहाज़', c: 'vehicles', ph: 'sh i p' },
  { w: 'train', e: '🚂', hi: 'रेलगाड़ी', c: 'vehicles', ph: 't r ai n' },
  { w: 'boat', e: '⛵', hi: 'नाव', c: 'vehicles', ph: 'b oa t' },
  { w: 'truck', e: '🚚', hi: 'ट्रक', c: 'vehicles', ph: 't r u ck' },
  { w: 'cycle', e: '🚲', hi: 'साइकिल', c: 'vehicles', syl: 'cy cle' },
  { w: 'taxi', e: '🚕', hi: 'टैक्सी', c: 'vehicles', syl: 'tax i' },
  { w: 'rocket', e: '🚀', hi: 'रॉकेट', c: 'vehicles', syl: 'rock et' },
  { w: 'helicopter', e: '🚁', hi: 'हेलीकॉप्टर', c: 'vehicles', syl: 'hel i cop ter' },
  { w: 'tractor', e: '🚜', hi: 'ट्रैक्टर', c: 'vehicles', syl: 'trac tor' },
  { w: 'auto', e: '🛺', hi: 'ऑटो', c: 'vehicles', syl: 'au to', fs: '-' },
  { w: 'ambulance', e: '🚑', hi: 'एम्बुलेंस', c: 'vehicles', syl: 'am bu lance' , fs: 'a' },

  // ---------- clothes ----------
  { w: 'hat', e: '🎩', hi: 'टोपी', c: 'clothes', ph: 'h a t' },
  { w: 'cap', e: '🧢', hi: 'टोपी', c: 'clothes', ph: 'c a p' },
  { w: 'sock', e: '🧦', hi: 'मोज़ा', c: 'clothes', ph: 's o ck' },
  { w: 'shirt', e: '👕', hi: 'कमीज़', c: 'clothes' },
  { w: 'dress', e: '👗', hi: 'फ़्रॉक', c: 'clothes' },
  { w: 'shoe', e: '👟', hi: 'जूता', c: 'clothes' },
  { w: 'coat', e: '🧥', hi: 'कोट', c: 'clothes', ph: 'c oa t' },
  { w: 'glasses', e: '👓', hi: 'चश्मा', c: 'clothes', syl: 'glass es' },
  { w: 'ring', e: '💍', hi: 'अँगूठी', c: 'clothes', ph: 'r i ng' },
  { w: 'crown', e: '👑', hi: 'मुकुट', c: 'clothes' },
  { w: 'bag', e: '👜', hi: 'थैला', c: 'clothes', ph: 'b a g' },

  // ---------- home & things ----------
  { w: 'bed', e: '🛏️', hi: 'बिस्तर', c: 'home', ph: 'b e d' },
  { w: 'cup', e: '☕', hi: 'कप', c: 'home', ph: 'c u p' },
  { w: 'pen', e: '🖊️', hi: 'पेन', c: 'home school', ph: 'p e n' },
  { w: 'pin', e: '📌', hi: 'पिन', c: 'home school', ph: 'p i n' },
  { w: 'bin', e: '🗑️', hi: 'कूड़ेदान', c: 'home', ph: 'b i n' },
  { w: 'box', e: '📦', hi: 'डिब्बा', c: 'home', ph: 'b o x' },
  { w: 'map', e: '🗺️', hi: 'नक्शा', c: 'home school', ph: 'm a p' },
  { w: 'net', e: '🥅', hi: 'जाल', c: 'toys', ph: 'n e t' },
  { w: 'bell', e: '🔔', hi: 'घंटी', c: 'home', ph: 'b e ll' },
  { w: 'lock', e: '🔒', hi: 'ताला', c: 'home', ph: 'l o ck' },
  { w: 'clock', e: '⏰', hi: 'घड़ी', c: 'home', ph: 'c l o ck' },
  { w: 'key', e: '🔑', hi: 'चाबी', c: 'home', rh: 'ee' },
  { w: 'lamp', e: '🪔', hi: 'दीया', c: 'home', ph: 'l a m p' },
  { w: 'door', e: '🚪', hi: 'दरवाज़ा', c: 'home' },
  { w: 'chair', e: '🪑', hi: 'कुर्सी', c: 'home', ph: 'ch air' },
  { w: 'book', e: '📕', hi: 'किताब', c: 'home school', ph: 'b oo k' },
  { w: 'spoon', e: '🥄', hi: 'चम्मच', c: 'home', rh: 'oo.n' },
  { w: 'fork', e: '🍴', hi: 'काँटा', c: 'home', ph: 'f or k' },
  { w: 'can', e: '🥫', hi: 'डिब्बा', c: 'home', ph: 'c a n' },
  { w: 'pan', e: '🍳', hi: 'कड़ाही', c: 'home', ph: 'p a n' },
  { w: 'ball', e: '⚽', hi: 'गेंद', c: 'toys' },
  { w: 'kite', e: '🪁', hi: 'पतंग', c: 'toys', rh: 'igh.t' },
  { w: 'drum', e: '🥁', hi: 'ढोल', c: 'toys', ph: 'd r u m' },
  { w: 'teddy', e: '🧸', hi: 'टेडी', c: 'toys', syl: 'ted dy' },
  { w: 'gift', e: '🎁', hi: 'तोहफ़ा', c: 'toys', ph: 'g i f t' },
  { w: 'umbrella', e: '☂️', hi: 'छाता', c: 'home', syl: 'um brel la' , fs: 'u' },
  { w: 'pencil', e: '✏️', hi: 'पेंसिल', c: 'school', syl: 'pen cil' },
  { w: 'scissors', e: '✂️', hi: 'कैंची', c: 'school', syl: 'scis sors' },
  { w: 'phone', e: '📱', hi: 'फ़ोन', c: 'home' },
  { w: 'computer', e: '💻', hi: 'कंप्यूटर', c: 'home', syl: 'com pu ter' },
  { w: 'candle', e: '🕯️', hi: 'मोमबत्ती', c: 'home', syl: 'can dle' },
  { w: 'soap', e: '🧼', hi: 'साबुन', c: 'home' },
  { w: 'tent', e: '⛺', hi: 'तंबू', c: 'toys', ph: 't e n t' },
  { w: 'web', e: '🕸️', hi: 'जाला', c: 'nature', ph: 'w e b' },
  { w: 'ten', e: '🔟', hi: 'दस', c: 'numbers', ph: 't e n' },

  // ---------- nature ----------
  { w: 'sun', e: '☀️', hi: 'सूरज', c: 'nature', ph: 's u n' },
  { w: 'moon', e: '🌙', hi: 'चाँद', c: 'nature', ph: 'm oo n' },
  { w: 'star', e: '⭐', hi: 'तारा', c: 'nature', ph: 's t ar' },
  { w: 'tree', e: '🌳', hi: 'पेड़', c: 'nature', ph: 't r ee' },
  { w: 'leaf', e: '🍃', hi: 'पत्ता', c: 'nature' },
  { w: 'flower', e: '🌸', hi: 'फूल', c: 'nature', syl: 'flow er' },
  { w: 'rain', e: '🌧️', hi: 'बारिश', c: 'nature', ph: 'r ai n' },
  { w: 'cloud', e: '☁️', hi: 'बादल', c: 'nature' },
  { w: 'rainbow', e: '🌈', hi: 'इंद्रधनुष', c: 'nature', syl: 'rain bow' },
  { w: 'snow', e: '❄️', hi: 'बर्फ़', c: 'nature' },
  { w: 'fire', e: '🔥', hi: 'आग', c: 'nature' },
  { w: 'hill', e: '⛰️', hi: 'पहाड़', c: 'nature', ph: 'h i ll' },
  { w: 'sea', e: '🌊', hi: 'समुद्र', c: 'nature', rh: 'ee' },
  { w: 'shell', e: '🐚', hi: 'सीप', c: 'nature', ph: 'sh e ll' },
  { w: 'light', e: '💡', hi: 'बल्ब', c: 'home', ph: 'l igh t' },
  { w: 'night', e: '🌃', hi: 'रात', c: 'nature', ph: 'n igh t' },
  { w: 'earth', e: '🌍', hi: 'धरती', c: 'nature', fs: '-' },

  // ---------- people ----------
  { w: 'man', e: '👨', hi: 'आदमी', c: 'people', ph: 'm a n' },
  { w: 'kid', e: '🧒', hi: 'बच्चा', c: 'people', ph: 'k i d' },
  { w: 'king', e: '🤴', hi: 'राजा', c: 'people', ph: 'k i ng' },
  { w: 'queen', e: '👸', hi: 'रानी', c: 'people' },
  { w: 'baby', e: '👶', hi: 'शिशु', c: 'people', syl: 'ba by' },
  { w: 'grandma', e: '👵', hi: 'दादी', c: 'people family', syl: 'grand ma' },
  { w: 'grandpa', e: '👴', hi: 'दादा', c: 'people family', syl: 'grand pa' },
  { w: 'doctor', e: '🧑‍⚕️', hi: 'डॉक्टर', c: 'people helpers', syl: 'doc tor' },
  { w: 'farmer', e: '🧑‍🌾', hi: 'किसान', c: 'people helpers', syl: 'far mer' },
  { w: 'police', e: '👮', hi: 'पुलिस', c: 'people helpers', syl: 'po lice' },
  { w: 'cook', e: '🧑‍🍳', hi: 'रसोइया', c: 'people helpers', ph: 'c oo k' },
  { w: 'teacher', e: '🧑‍🏫', hi: 'शिक्षक', c: 'people helpers', syl: 'teach er' },
];

// Sound identity: different spellings of one sound must never be both "right" and "wrong".
export const SOUND_OF = { c: 'k', k: 'k', ck: 'k', ss: 's', ff: 'f', ll: 'l', q: 'k' };
export const soundOf = (g) => SOUND_OF[g] || g;

const VOWELS = new Set(['a', 'e', 'i', 'o', 'u', 'ai', 'ee', 'igh', 'oa', 'oo', 'ar', 'or', 'ur', 'ow', 'oi', 'ear', 'air', 'er']);

function derive(x) {
  const o = { ...x, c: x.c.split(' ') };
  if (x.ph) o.ph = x.ph.split(' ');
  o.syl = x.syl ? x.syl.split(' ') : [x.w];
  // first sound
  if (x.fs === '-') o.fs = null;
  else if (x.fs) o.fs = x.fs;
  else if (o.ph) o.fs = soundOf(o.ph[0]);
  else {
    const w = x.w;
    if (/^(sh|ch|th)/.test(w)) o.fs = w.slice(0, 2);
    else if (/^[aeiou]/.test(w)) o.fs = null; // vowel starts only when set explicitly
    else if (/^c[eiy]/.test(w)) o.fs = 's';
    else if (/^g[eiy]/.test(w)) o.fs = null;
    else if (/^(kn|wr|ph)/.test(w)) o.fs = null;
    else o.fs = soundOf(w[0]);
  }
  // rhyme key: from the last vowel phoneme onward
  if (x.rh) o.rh = x.rh;
  else if (o.ph) {
    let k = o.ph.length - 1;
    while (k >= 0 && !VOWELS.has(o.ph[k])) k--;
    o.rh = k >= 0 ? o.ph.slice(k).map(soundOf).join('.') : null;
  } else o.rh = null;
  return o;
}

export const WORDS = W.map(derive);
export const byWord = Object.fromEntries(WORDS.map((x) => [x.w, x]));
export const inCat = (cat) => WORDS.filter((x) => x.c.includes(cat));

// Decodable at a given point: every grapheme already taught.
export function decodable(taughtSet, { maxLen = 9 } = {}) {
  return WORDS.filter((x) => x.ph && x.ph.length <= maxLen && x.ph.every((g) => taughtSet.has(g)));
}

// ---------- non-picture banks ----------
export const COLOURS = [
  { w: 'red', hi: 'लाल', hex: '#E53935' },
  { w: 'blue', hi: 'नीला', hex: '#1E88E5' },
  { w: 'yellow', hi: 'पीला', hex: '#FDD835' },
  { w: 'green', hi: 'हरा', hex: '#43A047' },
  { w: 'orange', hi: 'नारंगी', hex: '#FB8C00' },
  { w: 'purple', hi: 'बैंगनी', hex: '#8E24AA' },
  { w: 'pink', hi: 'गुलाबी', hex: '#F06292' },
  { w: 'black', hi: 'काला', hex: '#212121' },
  { w: 'white', hi: 'सफ़ेद', hex: '#FFFFFF' },
  { w: 'brown', hi: 'भूरा', hex: '#795548' },
];

export const FEELINGS = [
  { w: 'happy', hi: 'खुश', e: '😀', lvl: 1, story: 'Tara got a big red balloon!' },
  { w: 'sad', hi: 'उदास', e: '😢', lvl: 1, story: 'Tara dropped her ice cream on the floor.' },
  { w: 'angry', hi: 'गुस्सा', e: '😠', lvl: 2, story: 'Someone broke Tara\'s block tower on purpose.' },
  { w: 'scared', hi: 'डरा हुआ', e: '😨', lvl: 2, story: 'There was a loud thunder in the night.' },
  { w: 'surprised', hi: 'हैरान', e: '😮', lvl: 2, story: 'Tara opened the box and a frog jumped out!' },
  { w: 'sleepy', hi: 'नींद में', e: '😴', lvl: 2, story: 'Tara played all day. Now it is night.' },
  { w: 'proud', hi: 'गर्व', e: '😊', lvl: 3, story: 'Tara tried again and again, and finally rode the cycle!' },
];

// Categories used by "show me", "which is a fruit?" and odd-one-out.
export const CATEGORY_NAMES = {
  animals: { en: 'animal', hi: 'जानवर' },
  fruits: { en: 'fruit', hi: 'फल' },
  vegetables: { en: 'vegetable', hi: 'सब्ज़ी' },
  vehicles: { en: 'vehicle', hi: 'गाड़ी' },
  clothes: { en: 'thing you wear', hi: 'पहनने की चीज़' },
  body: { en: 'body part', hi: 'शरीर का अंग' },
  food: { en: 'food', hi: 'खाना' },
  toys: { en: 'toy', hi: 'खिलौना' },
  nature: { en: 'thing in nature', hi: 'प्रकृति की चीज़' },
  people: { en: 'person', hi: 'इंसान' },
  home: { en: 'thing at home', hi: 'घर की चीज़' },
};

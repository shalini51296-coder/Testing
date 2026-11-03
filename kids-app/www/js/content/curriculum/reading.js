// Reading comprehension passages, L4-L8. All original text.
// Knowledge-rich topics (Recht & Leslie 1988: background knowledge drives comprehension).
// Each question is tagged: literal (L), inference (I), vocabulary (V), main idea (M).
// q: [type, question, answer, [distractors]]

export const PASSAGES = [
  // ---------- L4 (Class 1) ----------
  { id: 'rainy-day', level: 4, title: "Tara's Rainy Day", lang: 'en', text:
    'Drip, drop, drip! It was raining. Tara the elephant could not go out to play. She felt sad. Then Mummy gave her a big paper boat. Tara put the boat in a puddle by the door. The boat sailed and sailed. Tara laughed. "Rainy days are fun too!" she said.',
    q: [['L', 'Why could Tara not go out?', 'It was raining.', ['It was night.', 'She was sick.', 'It was too hot.']],
        ['L', 'What did Mummy give Tara?', 'a paper boat', ['a ball', 'an umbrella', 'a kite']],
        ['I', 'How did Tara feel at the end?', 'happy', ['sad', 'angry', 'scared']]] },
  { id: 'busy-ant', level: 4, title: 'The Busy Ant', lang: 'en', text:
    'Ants are tiny, but they are very strong. An ant can carry things much heavier than its own body. Ants live together in a big home called a colony. They work as a team. Some ants find food. Some ants look after the eggs. When an ant finds food, it leaves a smell on the ground so other ants can follow the path.',
    q: [['L', 'What is an ant\'s home called?', 'a colony', ['a nest of sticks', 'a hive', 'a den']],
        ['L', 'How do other ants find the food?', 'They follow a smell on the ground.', ['They hear a bell.', 'They see a map.', 'They ask a bird.']],
        ['V', 'In this story, "strong" means…', 'able to carry heavy things', ['very small', 'very slow', 'very noisy']]] },
  { id: 'diwali', level: 4, title: 'Diwali at Home', lang: 'en', text:
    'It is Diwali! Meera and her brother clean the house. Dadi draws a rangoli with coloured powder near the door. In the evening, the family lights small clay lamps called diyas. They put them in every window. The whole street glows. Meera shares sweets with her neighbours. "Happy Diwali!" everyone says.',
    q: [['L', 'What does Dadi draw near the door?', 'a rangoli', ['a car', 'a map', 'a tree']],
        ['L', 'What are diyas?', 'small clay lamps', ['sweets', 'flowers', 'kites']],
        ['I', 'Why does the street glow?', 'Many families light diyas.', ['The sun is out.', 'There is a fire.', 'It is raining.']]] },

  // ---------- L5 (Class 2) ----------
  { id: 'seed', level: 5, title: 'How a Seed Grows', lang: 'en', text:
    'A seed looks small and quiet, but there is a baby plant sleeping inside. When the seed gets water and warmth, it wakes up. First, a tiny root pushes down into the soil to drink water. Next, a shoot pushes up towards the light. Soon two little leaves open. The leaves use sunlight to make food for the plant. With water, air and sunlight, the plant grows taller every day.',
    q: [['L', 'What comes out of the seed first?', 'a root', ['a flower', 'a fruit', 'a leaf']],
        ['L', 'What do leaves use to make food?', 'sunlight', ['moonlight', 'sand', 'stones']],
        ['I', 'What would happen to a seed kept in a dry box?', 'It would not grow.', ['It would grow fast.', 'It would turn into a fruit.', 'It would fly away.']],
        ['M', 'What is this passage mostly about?', 'how a seed grows into a plant', ['how to cook seeds', 'why leaves fall', 'how birds eat']]] },
  { id: 'crow', level: 5, title: 'The Thirsty Crow (retold)', lang: 'en', text:
    'On a hot day, a crow was very thirsty. He flew here and there looking for water. At last he found a pot with a little water at the bottom. His beak could not reach it. The crow did not give up. He picked up pebbles, one by one, and dropped them into the pot. Slowly the water rose higher and higher. Soon the crow could drink. He flew away happily.',
    q: [['L', 'Why could the crow not drink at first?', 'The water was too low in the pot.', ['The pot was empty.', 'The water was dirty.', 'Another bird drank it.']],
        ['L', 'What did the crow drop into the pot?', 'pebbles', ['leaves', 'sticks', 'seeds']],
        ['I', 'What lesson does the story teach?', 'Keep trying and think of a clever way.', ['Never drink water.', 'Crows are lazy.', 'Pots are dangerous.']]] },
  { id: 'senses', level: 5, title: 'Our Five Senses', lang: 'en', text:
    'Our body has five senses that tell us about the world. We see colours and shapes with our eyes. We hear music and voices with our ears. Our nose smells flowers and food. Our tongue tastes sweet, salty, sour and bitter things. Our skin feels hot, cold, soft and rough. Our senses send messages to the brain, and the brain tells us what is happening.',
    q: [['L', 'Which sense organ tastes food?', 'tongue', ['skin', 'ear', 'eye']],
        ['L', 'Where do the senses send messages?', 'to the brain', ['to the feet', 'to the hair', 'to the nails']],
        ['V', '"Rough" is the opposite of…', 'smooth', ['loud', 'sweet', 'tall']]] },

  // ---------- L6 (Class 3) ----------
  { id: 'elephants', level: 6, title: 'Gentle Giants', lang: 'en', text:
    'Elephants are the largest animals living on land. Asian elephants, which live in India, have smaller ears than African elephants. Elephants live in family groups called herds, usually led by the oldest female. An elephant\'s trunk is its nose and upper lip together. It has thousands of muscles, so an elephant can pick up a single peanut or lift a heavy log. Elephants eat grass, leaves, bark and fruit for most of the day, often more than 100 kilograms of food. In India, the elephant is our national heritage animal.',
    q: [['L', 'Who usually leads an elephant herd?', 'the oldest female', ['the youngest calf', 'a tiger', 'the biggest male only']],
        ['L', 'How are Asian elephants different from African elephants?', 'They have smaller ears.', ['They have no trunks.', 'They eat meat.', 'They can fly.']],
        ['I', 'Why can an elephant pick up something as small as a peanut?', 'Its trunk has thousands of muscles.', ['It uses its tail.', 'It has fingers.', 'It is very small.']],
        ['V', 'A "herd" is…', 'a group of animals that live together', ['a type of food', 'a baby elephant', 'a loud sound']]] },
  { id: 'water-cycle', level: 6, title: 'The Journey of a Raindrop', lang: 'en', text:
    'The water you drink today may once have been in the sea. When the Sun heats rivers and seas, some water turns into invisible water vapour and rises into the air. This is called evaporation. High in the sky the air is cold, so the vapour cools and turns into tiny drops that make clouds. This is called condensation. When the drops join and become heavy, they fall as rain, hail or snow. The water flows into rivers, lakes and the ground, and finally back to the sea. Then the journey starts again.',
    q: [['L', 'What is it called when water turns into vapour?', 'evaporation', ['condensation', 'freezing', 'raining']],
        ['L', 'What are clouds made of?', 'tiny drops of water', ['smoke', 'cotton', 'dust only']],
        ['I', 'Why is it called a "cycle"?', 'It goes round and round again.', ['It has two wheels.', 'It happens only once.', 'It is very fast.']],
        ['M', 'What is the main idea?', 'Water keeps moving between the sea, the sky and the land.', ['Rain is always cold.', 'The sea is salty.', 'Clouds are white.']]] },
  { id: 'gandhi', level: 6, title: 'Mahatma Gandhi', lang: 'en', text:
    'Mohandas Karamchand Gandhi was born on 2 October 1869 in Porbandar, Gujarat. He believed in truth and non-violence, which he called ahimsa. When India was ruled by the British, Gandhiji led millions of people in peaceful protests. In 1930, he walked to the seaside village of Dandi and made salt from sea water, to protest an unfair tax on salt. People lovingly call him Bapu, and he is known as the Father of the Nation. His birthday, 2 October, is celebrated as Gandhi Jayanti.',
    q: [['L', 'Where was Gandhiji born?', 'Porbandar', ['Delhi', 'Dandi', 'Kolkata']],
        ['L', 'What does ahimsa mean?', 'non-violence', ['salt', 'freedom', 'walking']],
        ['I', 'Why did Gandhiji make salt at Dandi?', 'to protest peacefully against an unfair tax', ['because he was hungry', 'to sell it', 'for a cooking contest']],
        ['L', 'When is Gandhi Jayanti?', '2 October', ['15 August', '26 January', '14 November']]] },

  // ---------- L7 (Class 4) ----------
  { id: 'monsoon', level: 7, title: 'Waiting for the Monsoon', lang: 'en', text:
    'Every summer, the land in India becomes very hot. Hot air over the land rises, and cooler, moist winds blow in from the sea to take its place. These seasonal winds are the monsoon. They usually reach Kerala in early June and spread across most of the country by July. The monsoon brings most of India\'s yearly rain. Farmers depend on it to grow rice, cotton and many other crops, and rivers and reservoirs fill up. But too much rain can cause floods, and too little can cause drought. That is why weather scientists study the monsoon so carefully.',
    q: [['L', 'Where does the monsoon usually arrive first?', 'Kerala', ['Punjab', 'Kashmir', 'Rajasthan']],
        ['I', 'Why do farmers watch the monsoon closely?', 'Their crops need its rain.', ['They like wind.', 'They want to fly kites.', 'They sell umbrellas.']],
        ['V', 'A "drought" is…', 'a long time without enough rain', ['a big flood', 'a type of crop', 'a strong wind from the hills']],
        ['M', 'What is the passage mainly about?', 'what the monsoon is and why it matters', ['how to grow cotton', 'the history of Kerala', 'why summers are hot in Europe']]] },
  { id: 'kalam', level: 7, title: 'The Boy Who Sold Newspapers', lang: 'en', text:
    'A. P. J. Abdul Kalam was born in 1931 in Rameswaram, a small town on an island in Tamil Nadu. His family was not rich, so as a boy he helped by selling newspapers early in the morning before school. He loved watching birds fly and wondered how they did it. That curiosity led him to study science and engineering. He became one of India\'s leading rocket scientists and helped build satellites and missiles, so people called him the "Missile Man of India". From 2002 to 2007 he served as the President of India. He loved talking to students and always told them to dream big and work hard.',
    q: [['L', 'What did Kalam do as a boy before school?', 'sold newspapers', ['drove a bus', 'fished in the sea', 'taught a class']],
        ['I', 'What made young Kalam interested in flying?', 'watching birds', ['reading comics', 'playing cricket', 'watching TV']],
        ['L', 'What important post did Kalam hold from 2002 to 2007?', 'President of India', ['Prime Minister', 'Chief Minister', 'Army Chief']],
        ['V', '"Curiosity" means…', 'wanting to know and learn', ['being afraid', 'being angry', 'being sleepy']]] },
  { id: 'magnets', level: 7, title: 'The Invisible Pull', lang: 'en', text:
    'Have you ever seen a magnet pick up pins without touching them? Magnets pull objects made of iron, nickel and cobalt. Every magnet has two ends called poles: a north pole and a south pole. If you bring two north poles together, they push apart. A north pole and a south pole pull towards each other. People have used this for a very long time. A compass needle is a tiny magnet that always points north-south, which helped sailors find their way across the sea.',
    q: [['L', 'What are the two ends of a magnet called?', 'poles', ['corners', 'tails', 'wheels']],
        ['L', 'What happens when two north poles meet?', 'They push apart.', ['They stick together.', 'They melt.', 'Nothing happens.']],
        ['I', 'Why was a compass useful to sailors?', 'It showed them directions.', ['It caught fish.', 'It made the ship faster.', 'It told the time.']],
        ['L', 'Which of these would a magnet pick up?', 'an iron nail', ['a plastic spoon', 'a wooden block', 'a rubber band']]] },

  // ---------- L8 (Class 5) ----------
  { id: 'solar', level: 8, title: 'Our Neighbourhood in Space', lang: 'en', text:
    'The Sun is a star: a giant ball of hot, glowing gas. It is so far away that its light, travelling faster than anything else, takes about eight minutes to reach us. Eight planets travel around the Sun in paths called orbits. The four closest, Mercury, Venus, Earth and Mars, are small and rocky. The four outer planets, Jupiter, Saturn, Uranus and Neptune, are huge and made mostly of gas or ice. Jupiter is the largest. Pluto was once called the ninth planet, but in 2006 scientists decided to call it a dwarf planet. Earth is special because it has liquid water and air that support life.',
    q: [['L', 'How long does sunlight take to reach Earth?', 'about eight minutes', ['about one second', 'about one day', 'about one year']],
        ['L', 'Which planet is the largest?', 'Jupiter', ['Earth', 'Mars', 'Saturn']],
        ['I', 'Why might the outer planets be very cold?', 'They are very far from the Sun.', ['They have too many people.', 'They are made of ice cream.', 'They have no orbit.']],
        ['V', 'An "orbit" is…', 'the path of a planet around the Sun', ['a type of star', 'a space rocket', 'a cloud of gas']],
        ['M', 'What is the main idea?', 'The Sun and eight planets make up our solar system.', ['Pluto is the largest planet.', 'Stars are cold.', 'Earth has no air.']]] },
  { id: 'chandrayaan', level: 8, title: 'Touchdown on the Moon', lang: 'en', text:
    'On 23 August 2023, millions of Indians watched their screens with excitement. The Vikram lander of Chandrayaan-3, built by the Indian Space Research Organisation (ISRO), slowed down, hovered and gently touched down near the Moon\'s south pole. No country had ever landed there before. A small six-wheeled rover named Pragyan rolled out and studied the Moon\'s soil. Scientists are especially interested in this region because some craters there are always in shadow and may hold frozen water. To remember this achievement, India now celebrates 23 August as National Space Day.',
    q: [['L', 'What was the name of the rover?', 'Pragyan', ['Vikram', 'Mangal', 'Aryabhata']],
        ['L', 'Which organisation built Chandrayaan-3?', 'ISRO', ['NASA', 'a school club', 'the Indian Railways']],
        ['I', 'Why are scientists interested in the Moon\'s south pole?', 'Shadowed craters there may hold frozen water.', ['It is the hottest place.', 'It has cities.', 'It is made of cheese.']],
        ['V', '"Achievement" means…', 'something good done with effort', ['a mistake', 'a type of rocket fuel', 'a holiday']]] },
  { id: 'panchatantra', level: 8, title: 'The Monkey and the Crocodile (retold from the Panchatantra)', lang: 'en', text:
    'The Panchatantra is a very old collection of Indian animal stories, traditionally said to have been written by Vishnu Sharma to teach wisdom to young princes. In one story, a monkey lived in a jamun tree by a river and shared sweet fruit with a crocodile every day. The crocodile\'s wife wanted to eat the monkey\'s heart, so the crocodile invited the monkey for a ride across the river. Halfway, the crocodile told him the plan. The clever monkey said calmly, "Oh! I left my heart in the jamun tree. Take me back and I will fetch it." The foolish crocodile swam back, and the monkey leapt to safety. He never trusted the crocodile again.',
    q: [['L', 'Who is said to have written the Panchatantra?', 'Vishnu Sharma', ['Kalidasa', 'Tulsidas', 'Premchand']],
        ['I', 'How did the monkey save himself?', 'He used a quick, clever trick.', ['He fought the crocodile.', 'He swam faster.', 'He called his friends.']],
        ['I', 'What lesson does the story teach?', 'Stay calm and think clearly in danger.', ['Always ride crocodiles.', 'Never eat fruit.', 'Rivers are boring.']],
        ['V', '"Foolish" is the opposite of…', 'wise', ['kind', 'wet', 'slow']]] },
  { id: 'save-water', level: 8, title: 'Every Drop Counts', lang: 'en', text:
    'Water covers most of our planet, yet clean fresh water is surprisingly scarce. Most of Earth\'s water is salty sea water, and much of the fresh water is frozen in ice. In many Indian cities, people already face water shortages in summer. Each of us can help. A dripping tap can waste many litres a day, so fixing leaks matters. Using a bucket instead of a hose to wash a car saves water. Rooftop rainwater harvesting can collect rain and refill the ground. If everyone saves a little, together we can save a lot. Every drop counts!',
    q: [['M', 'What is the writer trying to persuade us to do?', 'save water', ['buy more taps', 'wash cars daily', 'drink sea water']],
        ['L', 'Why is clean fresh water scarce?', 'Most water is salty or frozen.', ['There is no rain anywhere.', 'Fish drink it all.', 'It is all in bottles.']],
        ['I', 'Why does the writer mention a dripping tap?', 'to show how small leaks waste lots of water', ['to sell new taps', 'because taps are noisy', 'to explain rain']],
        ['V', '"Scarce" means…', 'not enough; hard to find', ['very cheap', 'very cold', 'everywhere']]] },

  // ---------- Hindi passages (अनुच्छेद) ----------
  { id: 'hi-baag', level: 5, title: 'मेरा बगीचा', lang: 'hi', text:
    'मेरे घर के पीछे एक छोटा बगीचा है। उसमें गुलाब, गेंदा और तुलसी के पौधे हैं। हर सुबह मैं और दादी पौधों को पानी देते हैं। तितलियाँ फूलों पर उड़ती हैं। एक दिन हमने टमाटर का बीज बोया। कुछ दिनों बाद उसमें से हरा पौधा निकला। मुझे अपना बगीचा बहुत अच्छा लगता है।',
    q: [['L', 'हर सुबह पौधों को कौन पानी देता है?', 'मैं और दादी', ['पापा', 'माली', 'कोई नहीं']],
        ['L', 'बगीचे में कौन सा बीज बोया गया?', 'टमाटर', ['आम', 'गेहूँ', 'मटर']],
        ['I', 'बच्चे को बगीचा कैसा लगता है?', 'बहुत अच्छा', ['बुरा', 'डरावना', 'उबाऊ']]] },
  { id: 'hi-holi', level: 6, title: 'रंगों का त्योहार', lang: 'hi', text:
    'होली रंगों का त्योहार है। यह वसंत ऋतु में फाल्गुन महीने की पूर्णिमा पर मनाया जाता है। होली से एक रात पहले होलिका दहन होता है, जो बुराई पर अच्छाई की जीत का प्रतीक है। अगले दिन लोग एक-दूसरे को गुलाल लगाते हैं, गले मिलते हैं और गुजिया खाते हैं। हमें प्राकृतिक रंगों से होली खेलनी चाहिए और पानी बचाना चाहिए।',
    q: [['L', 'होली किस ऋतु में मनाई जाती है?', 'वसंत', ['वर्षा', 'शिशिर', 'ग्रीष्म']],
        ['L', 'होलिका दहन किसका प्रतीक है?', 'बुराई पर अच्छाई की जीत', ['बारिश', 'फसल कटाई', 'नया साल']],
        ['I', 'हमें प्राकृतिक रंगों से होली क्यों खेलनी चाहिए?', 'ताकि त्वचा और पर्यावरण सुरक्षित रहें', ['क्योंकि वे महँगे हैं', 'क्योंकि वे चमकते नहीं', 'क्योंकि वे खाए जाते हैं']]] },
  { id: 'hi-chidiya', level: 7, title: 'गौरैया कहाँ गई?', lang: 'hi', text:
    'पहले हर आँगन में गौरैया चहचहाती थी। अब शहरों में यह छोटी चिड़िया कम दिखाई देती है। पेड़ कटने, पक्के मकानों में घोंसले की जगह न होने और कीड़ों के कम होने से गौरैया को भोजन और घर नहीं मिलता। हम इसकी मदद कर सकते हैं: छत पर पानी का बर्तन रखें, दाना डालें और लकड़ी का घोंसला लगाएँ। हर साल 20 मार्च को विश्व गौरैया दिवस मनाया जाता है।',
    q: [['L', 'विश्व गौरैया दिवस कब मनाया जाता है?', '20 मार्च', ['15 अगस्त', '5 जून', '2 अक्टूबर']],
        ['I', 'शहरों में गौरैया कम क्यों हो गई है?', 'उसे भोजन और घोंसले की जगह नहीं मिलती', ['उसे ठंड पसंद है', 'वह समुद्र में चली गई', 'वह बहुत बड़ी हो गई']],
        ['L', 'हम गौरैया की मदद कैसे कर सकते हैं?', 'पानी, दाना और घोंसला रखकर', ['पेड़ काटकर', 'शोर करके', 'उसे पकड़कर']]] },
];

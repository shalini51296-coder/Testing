# Adaptive Syllabus: Level 0 (about 2 years) to Level 8 (about 10 years)

**Phase 2b of planning.** This document turns the curriculum into a **knowledge-based syllabus**:
- Any child from about 2 years old starts at the level they are actually at, separately in each subject.
- The child then moves forward through mastery, not by birthday.

It supersedes the age-based framing in `02-master-plan.md` Section 4. That document's engine, session and risk sections still apply.

---

## 0. Decisions added in this revision

| Decision | Choice |
|---|---|
| Starting age | **About 2 years (Level 0)**, running to about 10+ (Level 8). Multiple child profiles, each with its own learner model. |
| Progression | **Levels, not ages.** Age is used only as the *starting guess* for placement. |
| Primary device | **Mobile phone**, landscape orientation (rules in Section 6) |
| Companion | **A baby elephant.** Working name **"Tara"**; it works in Hindi and English and is easy for a 2-year-old to say. Name is final in the UI phase. |
| Voice | **North Indian female voice**, bilingual Hindi + Indian English, one consistent persona (Section 7) |
| School context | Her school teaches the alphabet (letter names). The app links letter **names ↔ sounds** so school and app reinforce each other (Section 3.3). |

---

## 1. Design principles of the syllabus

1. **Levels describe knowledge, not age.** Typical ages are shown only as a guide.
2. **Uneven profiles are normal.** One child can be at Math L3, English phonics L2 and Hindi script L0. Each strand places and progresses on its own.
3. **Skill nodes are the real unit.** Each level is a cluster of small skill nodes with prerequisites (the skills graph). A next-level node unlocks **as soon as its own prerequisites are mastered**, without waiting for the whole level to finish. This is mastery learning (Bloom; Kulik et al., 1990) applied at fine grain.
4. **Mastered never means forgotten.** Every mastered node stays in the spaced-review schedule. Retention is checked after gaps of 2 weeks or more.
5. **Developmental order comes from research trajectories**, not from textbook chapter order:
   - Math: Clements & Sarama learning trajectories; Sarnecka & Carey on counting
   - Phonological awareness: Kilpatrick and the National Reading Panel
   - Phonics: *Letters and Sounds* sequence
   - Hindi script: Nag & Snowling
   - Pre-writing strokes: Beery VMI norms
   - Executive function: Zelazo and Diamond
6. **Indian school alignment.** Levels map approximately to Indian school stages, and Class 1–5 outcomes are cross-checked against NCERT / NIPUN Bharat learning outcomes:

| Level | Name | Typical age | Indian stage (approx.) |
|---|---|---|---|
| **L0** | Seed | 2–2.5 | Home / playgroup |
| **L1** | Sprout | 2.5–3.5 | Playgroup / Pre-nursery |
| **L2** | Bud | 3.5–4.5 | Nursery |
| **L3** | Bloom | 4.5–5.5 | LKG / UKG |
| **L4** | Sapling | 5.5–6.5 | UKG / Class 1 |
| **L5** | Branch | 6.5–7.5 | Class 1–2 |
| **L6** | Tree | 7.5–8.5 | Class 2–3 |
| **L7** | Grove | 8.5–9.5 | Class 3–4 |
| **L8** | Forest | 9.5–10.5+ | Class 4–5 |

---

## 2. Very young learners (L0–L1, about 2–3.5 years): what the science allows

This section matters because it limits what an app can honestly do for a 2-year-old.

- **Screen guidance:**
  - WHO (2019): for age 2, no more than 1 hour/day of sedentary screen time, and less is better. Under 2, none is recommended.
  - AAP (2016): for 18–24 months, only high-quality content **watched with a parent**.
- **Video deficit:** before about 30 months, children learn much less from a screen than from a live person (Barr, 2010; Anderson & Pempek, 2005).
- **Interaction narrows the gap.** When a 2-year-old must *tap the right object* rather than just watch, word learning improves (Kirkorian, Choi & Pempek, 2016). Responsive (contingent) screens beat passive ones (Troseth et al., 2006).

**What the app does for L0–L1:**
- Sessions of **5–7 minutes**, at most about 10 min/day.
- **Tap-only** interactions, 1–2 choices.
- Content focused on **words, listening, early counting, shapes, matching and cause–effect**.
- Every activity ends with a **real-world prompt** ("Find something red in your room!").

**Honest limit:** at L0–L1, a parent sitting with the child for even part of the session roughly doubles the value. The app supports this with tiny on-screen "say this together" cues, but works alone if needed. From L2–L3 onward the app is designed for fully independent use, as agreed.

**What is deliberately *not* taught at L0–L1:**
- **Phonics** (letter-sound decoding). Phonemic awareness is not developmentally available yet.
- **Formal writing**, apart from pre-writing strokes.
- **Rote counting to 100 or flashcard drills.**

Exception: the letters of the child's **own name**. Children learn these first and fastest (Treiman & Broderick, 1998), so they make a natural first step into print.

---

## 3. Syllabus by strand

**Notation:**
- **Strand codes:** EN = English, HI = Hindi, MA = Math, SP = Spatial, LG = Logic and coding, EF = Executive function, KW = Knowledge and science, SE = Social-emotional.
- **"Mastery"** means accuracy of about 90% or more on mixed items across 2+ days, then retained after a spaced gap.
- **Assessment format:** all scored items are tap, drag or build. Spoken and written work is recorded or done off-screen, unscored (see `02-master-plan.md` Section 3).

### 3.1 EN-OL: English oral language and vocabulary

The comprehension half of the Simple View of Reading, and her most important English strand given Hindi at home.

| Level | Skills (each line is one skill node or cluster) |
|---|---|
| L0 | Point-to-name ("show me the…"): body parts, animals, family, food, toys, clothes (~50 words, **receptive**). Animal sounds. 1-step instructions |
| L1 | Naming (~150 words). Action verbs. Colours (red, blue, yellow, green; colour words are learned slowly, so this is spaced over months). Big/small. In/on/under. 2-step instructions. Listening to nursery rhymes |
| L2 | Categories (fruits, vehicles, clothes). Opposites. Prepositions (behind, in front, next to). Describing words. Picture-story listening with who/what questions. 3-picture sequencing. **Hindi helper** bridge available |
| L3 | 3–5 Tier-2 words per story (Beck). Why/how questions. Retelling (recorded). Simple inference ("How does she feel?"). 4–5-picture sequencing |
| L4 | Vocabulary from knowledge units. Synonyms. Words with two meanings. Story elements (character, setting, problem, solution) |
| L5 | Word families and morphology for meaning (un-, re-, -ful). Context clues. Following multi-step oral directions |
| L6 | Academic vocabulary (compare, describe, because). Idioms (common). Explaining reasoning (recorded) |
| L7 | Figurative language (simile, metaphor). Shades of meaning. Presentation talk (recorded) |
| L8 | Latin/Greek-root vocabulary. Debate-style opinion with reasons. Summarising orally |

### 3.2 EN-PA: Phonological and phonemic awareness

Oral only, with no letters needed. Progression follows the NRP (2000) and Kilpatrick (2015).

| Level | Skills |
|---|---|
| L1 | Environmental sound discrimination (same/different). Rhyme exposure through songs |
| L2 | Rhyme recognition ("Do *cat* and *hat* rhyme?"). Syllable clapping (1–3 syllables). First-sound recognition with continuous sounds (/s/, /m/, /f/) |
| L3 | Rhyme production (choose). Onset–rime blending (*c–at*). Phoneme blending of CVC words. Phoneme segmentation of CVC words. Final sound |
| L4 | Medial vowel isolation. Blend and segment CCVC/CVCC words (*frog, milk*). Initial phoneme deletion (*sat* without /s/ → *at*) |
| L5 | Phoneme substitution and manipulation (*cat* → change /c/ to /b/). Deletion inside blends (*slip* without /l/). This "advanced phonemic awareness" drives orthographic mapping and sight-word growth (Kilpatrick) |
| L6+ | Maintained through spelling and morphology. Strand completes |

### 3.3 EN-PH: Alphabet and phonics (decoding)

Systematic synthetic phonics, using the *Letters and Sounds* order.

**School alignment:** her school teaches letter *names*. The app teaches each letter as **name + sound + key picture** ("This is *ess*. It says /sss/, like *sun*"). The **sound** is used for reading because decoding requires it (Ehri). The **name** is kept so school and app agree. Placement detects which letters she already knows by name, and those letters are fast-tracked to their sounds.

| Level | Skills |
|---|---|
| L1 | Letters of **own name** (recognition). "Letters vs pictures" (print awareness). Book handling (in the e-book: page turning, left-to-right finger tracking) |
| L2 | Uppercase/lowercase recognition and matching (name). First sounds **s a t p i n m d** linked to names |
| L3 | All single letter-sounds (g o c k ck e u r h b f l ss ff ll j v w x y z qu). **CVC decoding**. Tricky words set 1 (the, I, to, no, go, into). Consonant digraphs **sh ch th ng**. Decodable phrases and sentences |
| L4 | Vowel digraphs and trigraphs **ai ee igh oa oo ar or ur ow oi ear air er**. Adjacent consonants (CCVC/CVCC). Tricky words set 2 (he, she, we, me, be, was, my, you, they, all, are). **Decodable books** |
| L5 | Alternative spellings (ay/a-e/ai, ea/ee/e-e, ie/i-e/y, oe/o-e/ow, ue/u-e/ew), split digraphs. Suffixes -s -es -ed -ing. Two-syllable words. Common exception words (school year 2 list) |
| L6 | Six syllable types and syllable division. Prefixes un- re- dis- pre-. Suffixes -ful -less -ly -er -est. Multisyllabic decoding |
| L7 | -tion/-sion/-cian. Homophones. Latin roots (port, rupt, struct, spect) |
| L8 | Greek combining forms (bio, graph, tele, phon). Etymology "word detective" |

### 3.4 EN-WR: Pre-writing, handwriting, spelling, composition

Writing happens on paper; the app gives the model, the mission and spelling practice.

| Level | Skills |
|---|---|
| L0 | Finger-painting and scribbling in-app (motor exploration) |
| L1 | Pre-writing strokes by imitation: vertical line (about 2 y), horizontal line (about 2.5 y), circle (about 3 y) (Beery VMI norms). In-app finger tracing plus crayon mission |
| L2 | Cross (+), diagonal lines. **Own name** on paper. Lowercase letter formation groups (c-a-d-g-o-q, then l-t-i-j, etc.) |
| L3 | All lowercase formation (paper). Capitals. **Spell CVC words with letter tiles**, then on paper |
| L4 | Spell digraph and adjacent-consonant words. Write a sentence with a capital letter and full stop (paper, photo optional) |
| L5 | Spelling-pattern practice (spaced). 3–5-sentence recount or story. Joined handwriting only if the school uses it |
| L6 | Paragraph with topic sentence. Editing checklist. Apostrophes, commas in lists |
| L7 | Narrative, explanation and opinion genres. Planning with organisers. **Keyboarding** starts |
| L8 | Multi-paragraph writing. Revising for audience. Dictionary and thesaurus skills |

### 3.5 EN-RD: Fluency and comprehension

Fluency targets are approximate end-of-year 50th-percentile words correct per minute (Hasbrouck & Tindal, 2017):
- Class 1 about 60; Class 2 about 100; Class 3 about 112; Class 4 about 133; Class 5 about 146.

The app shows these as guidance to the parent only. Measurement is optional (parent listens, or future on-device speech recognition).

| Level | Skills |
|---|---|
| L3 | Read decodable sentences. Answer "who/what" after reading |
| L4 | Decodable books (accuracy ≥ 95%). Literal questions. Retell sequence |
| L5 | Repeated reading for fluency (model → read → re-read). Main idea. Character feelings with text evidence |
| L6 | Inference. Predicting. Questioning. Non-fiction text features (headings, captions, glossary) |
| L7 | Text structures (sequence, cause–effect, compare). Summarising. Author's purpose |
| L8 | Comparing two texts. Theme. Fact vs opinion. Reading for research projects |

### 3.6 HI: Hindi (oral, then script, reading and writing)

Script order follows akshara research (Nag & Snowling, 2012).

| Level | HI-OL (oral) | HI-SC/RD/WR (script, reading, writing) |
|---|---|---|
| L0–L1 | बालगीत (rhymes), animal/body/food words in Hindi, simple stories | — |
| L2 | Stories with questions. Colours, numbers 1–10 orally. Opposites | — (exposure only: own name in Devanagari) |
| L3 | Rich-vocabulary stories (beyond home words). Riddles (पहेलियाँ) | **स्वर** (अ–अः); first व्यंजन with inherent अ (क ग ज त द न प ब म र ल स); 2–3-akshara words without matra (जल, घर, कमल) |
| L4 | Story retell (recorded). Numbers 1–20 orally | All **व्यंजन** (including ड़ ढ़ ञ ण). Matras **ा ि ी ु ू**. Words and phrases. Letter formation on paper |
| L5 | Poems. Describing words | Matras **े ै ो ौ ं ँ ृ** (full **बारहखड़ी**). Simple sentences. Hindi decodable stories |
| L6 | Short speeches (recorded) | **Half letters and conjuncts** (क्ष त्र ज्ञ श्र, र् / ्र forms). Reading short stories. Writing sentences |
| L7 | मुहावरे (common idioms) | Fluency and comprehension. Grammar: संज्ञा, सर्वनाम, लिंग, वचन. Paragraph writing |
| L8 | Story/poem appreciation | Grammar: क्रिया, विशेषण, काल. Letter writing (पत्र). **Hindi number names to 100** (irregular, so learned as vocabulary with spaced retrieval) |

**Script separation rule:** Hindi script activities live in their own world region (Section 4 of the master plan). Devanagari and Roman letters never appear together in matching tasks during the child's first year of Hindi script.

### 3.7 MA: Mathematics

Trajectories from Clements & Sarama. Counting milestones follow the "knower-level" research: children become one-, two- and three-knowers and then cardinal-principle knowers at about 3.5–4 (Wynn, 1990; Sarnecka & Carey, 2008).

**Number sense and counting (MA-NS)**

| Level | Skills |
|---|---|
| L0 | One vs many. "Give one" / "Give more" with large differences |
| L1 | Subitize 1–2 → 1–3. Rote count to 5 → 10. **Give-N** to 2 → 3 (knower levels). Compare small sets |
| L2 | **Cardinal principle** (how many = last number said). Count objects to 10. Subitize to 5 (dice/dot patterns). Numerals 1–5 → 1–10. Same/more/fewer |
| L3 | Count to 20, then rote to 100. Numerals 0–20. One more/one less. **Linear number board game 1–10 → 1–20** (Siegler & Ramani). Teen numbers as "ten and some more" |
| L4 | Count to 120 from any number. Skip count by 10s, 5s, 2s. **Number line 0–20 → 0–100** placement. Ordinal numbers |

**Operations (MA-OP)**

| Level | Skills |
|---|---|
| L2 | "Put together / take away" with ≤ 5 objects (stories) |
| L3 | Ten-frames. Compose/decompose **5 and 10** (number bonds). Add/subtract within 10 with objects → pictures (concrete → pictorial → abstract) |
| L4 | Fluent facts within 10 (spaced retrieval). Within 20 by strategy (make-10, doubles, near doubles). Missing addend. Word problems (voiced) |
| L5 | Add/subtract within 100 (place-value strategies, then the standard method). Multiplication as equal groups and arrays. Division as sharing |
| L6 | Within 1000. Tables 2, 5, 10 → 3, 4. Division as grouping. Relationship between × and ÷ |
| L7 | All tables to 10×10 fluent (spaced). Multi-digit × 1-digit. Division with remainders. Multi-step word problems (bar models) |
| L8 | Multi-digit × and ÷. Factors, multiples, primes. Order of operations (simple). Estimation |

**Place value (MA-PV)**

| Level | Skills |
|---|---|
| L4 | Tens and ones (bundling, base-ten blocks) |
| L5 | Hundreds. Compare and order to 1000 |
| L6 | Thousands. Rounding to 10 and 100 |
| L7 | To 1,00,000. **Indian (lakh, crore) and international comma systems**, both as in Indian textbooks |
| L8 | Decimals (tenths, hundredths) as an extension of place value |

**Fractions (MA-FR)**, built on the number line (Siegler)

| Level | Skills |
|---|---|
| L4 | Halves and quarters of shapes and sets |
| L5 | Unit fractions (1/2, 1/3, 1/4). Fair shares |
| L6 | Fractions **on the number line**. Equivalent fractions. Comparing |
| L7 | Adding and subtracting like denominators. Mixed numbers. Fractions of quantities |
| L8 | Fraction ↔ decimal. Unlike denominators (introduction). Percent as "out of 100" (introduction) |

**Geometry and measurement (MA-GM)**

| Level | Skills |
|---|---|
| L0 | Shape matching (circle/square in a shape sorter) |
| L1 | Names circle, square, triangle. Big/small. Tall/short |
| L2 | Rectangle, oval, star. Sides and corners. Long/short, heavy/light, full/empty |
| L3 | 3D shapes (ball, box, can). Positional words. Compare lengths directly |
| L4 | Non-standard measuring. Time (o'clock, half past). **Indian money** (₹1–₹100 coins and notes) |
| L5 | cm/m, kg/g, L/mL. Time to 5 minutes. Money word problems |
| L6 | Perimeter. Area by counting squares. Right angles. Calendar |
| L7 | Angles (types, measurement). Area and perimeter formulas for rectangles. 24-hour clock |
| L8 | Volume (cubes). Symmetry. Scale. Nets |

**Data (MA-DT)**

| Level | Skills |
|---|---|
| L2 | Sort and count |
| L3 | Pictographs |
| L5 | Bar graphs |
| L7 | Tables and line graphs |
| L8 | Average (simple) |

**Patterns and algebraic thinking (MA-PT)**

| Level | Skills |
|---|---|
| L1 | Copy AB pattern |
| L2 | Extend AB, AAB |
| L3 | ABC, ABB. Identify the unit of repeat. Growing patterns |
| L5 | Number patterns |
| L7 | Function machines (in → rule → out) |
| L8 | Unknowns in equations (□ + 7 = 15) |

### 3.8 SP: Spatial reasoning

Trainable, with durable effects (Uttal et al., 2013).

| Level | Skills |
|---|---|
| L0 | 1–2-piece puzzles, shape sorter, stacking |
| L1 | 3–4-piece puzzles. Matching shapes in different orientations |
| L2 | 6–12-piece puzzles. Copy simple 2D block designs. Spatial words |
| L3 | Tangrams with inner outline. Simple 2D mental rotation (which one is turned?). Mirror symmetry |
| L4 | Tangrams with silhouette only. Map of a room. Left/right |
| L5 | Nets of a cube. Viewpoints (what does the elephant see?). Grid routes |
| L6 | 3D mental rotation (cube figures). Cross-sections |
| L7 | Coordinates (first quadrant). Scale maps of India and her city |
| L8 | Paper-folding prediction (origami mission). 3D construction from views |

### 3.9 LG: Logic, reasoning and computational thinking

| Level | Skills |
|---|---|
| L0 | Cause–effect (tap → result). Hide-and-find (where did the ball go?) |
| L1 | Match same. Sort by one attribute (colour *or* shape). Odd-one-out (obvious) |
| L2 | Sort by 2 attributes. Sequence 3 pictures. Simple "if–then" rule games |
| L3 | Picture analogies (A:B :: C:?). **Robot path** with 2–4 arrows |
| L4 | Robot path with debugging (find the wrong arrow). 2×2 matrix patterns. Sequences of commands (ScratchJr-like) |
| L5 | Loops (repeat ×3). Logic grids 2×2. Venn sorting |
| L6 | Conditionals (if wall then turn). Event-based programs. Logic grids 3×3 |
| L7 | Variables (score). Strategy games (Nim, connect-style). Algorithms (sorting by comparison) |
| L8 | Decomposition projects (make your own game or story). Debugging others' code. Logical deduction puzzles |

### 3.10 EF: Executive function games

Inside play and short. Expect near transfer, not IQ gains (research doc, Section 2).

| Level | Skills |
|---|---|
| L0–L1 | Wait-and-tap (tap only when Tara opens her eyes). 2-card memory |
| L2 | Go/no-go (tap fruit, not stones). **Dimensional Change Card Sort**: sort by colour, then switch to shape. 3-year-olds usually fail the switch; most pass by 4–5 (Zelazo, 2006) |
| L3 | Day/Night Stroop-type (say or tap "night" for the sun picture) (Gerstadt, Hong & Diamond, 1994). Remember 3–4 items in order |
| L4 | Advanced DCCS (border version). Tower puzzle with 2–3 discs. Remember 4–5 |
| L5+ | Folded into planning puzzles, strategy games and coding (LG) |

### 3.11 KW: World knowledge and science

These themes also feed reading comprehension. Each theme is a 2–4-week unit, revisited in spiral form. Alignment to NCERT EVS (Classes 3–5) is checked at build time.

| Level | Themes |
|---|---|
| L0–L1 | My body. Animals and their sounds. Food. My home. Day and night |
| L2 | Family. Weather and seasons. Plants around us. Vehicles. Colours in nature |
| L3 | Animals and their homes. Community helpers. Festivals of India. Five senses |
| L4 | Life cycles (butterfly, frog, plant). Materials (wood, metal, plastic). Water. Sky (sun, moon, stars) |
| L5 | How plants grow (experiment mission). Magnets. Light and shadow. India map (states, rivers) |
| L6 | Human body systems (simple). Food chains. Solids, liquids, gases. Solar system. Continents and oceans |
| L7 | Forces and simple machines. Electricity basics (safe). Ecosystems. Stories from Indian history |
| L8 | Earth (volcanoes, earthquakes, water cycle). Health and nutrition. Stories from world history. Fair-test experiment design |

Every unit uses the **Predict → Try → Observe → Explain** loop and has a real-world mission (plant a seed, make a shadow puppet).

### 3.12 SE: Feelings and social skills

Delivered through stories.

| Level | Skills |
|---|---|
| L1 | Happy, sad (faces). Tara feels… |
| L2 | Angry, scared, surprised. "Balloon breathing" calm-down |
| L3 | Empathy stories. Turn-taking. Naming the reason for a feeling |
| L4 | Strategies for frustration (try again, ask for help, take a break). Effort language |
| L5–L8 | Friendship problems. Honesty. Handling worry. Perspective-taking. Growth after mistakes |

The emotion vocabulary approach follows the RULER model (Brackett).

---

## 4. Placement and progression

### 4.1 Placement

Placement runs in the first 2–3 sessions as a game called **"Meet Tara"**, about 5 minutes each.

1. **Starting guess:** the level typical for the child's age (e.g. 4.2 years → L2), minus one level, so placement starts with easy wins.
2. **Probe order** per strand: about 3 items per skill cluster.
   - ≥ 2/3 correct → move up a cluster.
   - < 2/3 correct → move down.
   - Stop when the boundary is found (adaptive staircase).
3. **Feel:** placement items look and play like normal games. No "test" framing, no wrong-answer sounds.
4. **Result:** per-strand level and node states:
   - **mastered** (above the boundary) → enters spaced review
   - **frontier** (at the boundary) → taught next
   - **locked**
5. **Placement is never final.** Fast, accurate answers on a "frontier" node jump it straight to review (skip-ahead). Errors on a "mastered" node reopen it.

### 4.2 Progression rules

- A node is **mastered** when BKT P(known) ≥ 0.95 *and* it has been correct on ≥ 2 separate days.
- A node is **retained** after a correct retrieval at a gap of ≥ 14 days.
- A next node **unlocks** when all its prerequisite nodes are mastered.
- A **level badge** is earned when ≥ 90% of that level's nodes in a strand are retained. This is visible progress in the world, not a gate.
- **Cross-strand rules:**
  - Any task that needs reading gets **full audio support** until the child's EN-PH is ≥ L4 (or HI-SC ≥ L5 for Hindi tasks).
  - Math word problems are voiced until EN-RD L5.
  - Hindi script (HI-SC L3) unlocks only after EN-PA L3 is mastered, since phonological awareness transfers across languages, and EN-PH CVC decoding is stable. The parent can override this.
- **Daily mix:** the session composer picks the strands that day using the time-share table (master plan Section 4.1), with each strand's share keyed to the child's **level** instead of her age. Due reviews come first.

### 4.3 Interface mode follows the child

Interaction complexity also adapts. Mode is set by motor and independence signals plus level; the parent can adjust it.

| Mode | Typical levels | Interaction | Choices on screen | Session |
|---|---|---|---|---|
| **Tiny** | L0–L1 | Tap only, no navigation (flow is automatic) | 1–2 | 5–7 min |
| **Little** | L2–L3 | Tap + simple drag, a home map with 2–3 big doors | 2–4 | 10–15 min |
| **Explorer** | L4–L6 | Drag, big letter keyboard, free map choice, simple on-screen words | up to 4–6 | 15–20 min |
| **Pro** | L7–L8 | Text, keyboard, multi-step projects, coding canvas | as needed | 20–30 min |

Dragging is reliable for most children only from about age 3. Before that, tapping is the dependable gesture on touchscreens. This is why Tiny mode is tap-only.

---

## 5. What this means for your daughter right now (4.2 years, letter names at school)

Expected placement (to be confirmed by "Meet Tara"):

| Strand | Expected level |
|---|---|
| EN-OL | L2 |
| EN-PA | L2 |
| EN-PH | L2, possibly L3 if she knows several letter names, which are then fast-tracked to sounds |
| EN-WR | L2 |
| HI-OL | L2–L3 (home language) |
| HI-SC | Locked until EN-PA L3 and CVC decoding |
| MA-NS | L2 |
| SP / LG | L2 |
| EF | L2 |

**Interface:** Little mode.

So the 12-month plan in `02-master-plan.md` Section 4.3 remains her likely path. It now sits inside a syllabus that also serves a 2-year-old sibling or cousin and carries on to age 10.

---

## 6. Mobile-first constraints

These feed directly into the UI phase.

- **Orientation:** **landscape**. It gives more horizontal room for 2–4 large choices and matches how children hold phones for games.
- **Touch targets:**
  - Children are markedly less accurate than adults on small targets and gestures (Anthony et al., 2012; Hourcade, 2008).
  - Targets: **≥ 20 mm for Tiny mode, ≥ 15 mm for Little, ≥ 12 mm for Explorer**.
  - **≥ 5 mm spacing** between targets.
  - Ignore palm and multi-touch contacts.
- **Max choices on a phone:** 4 large choices in Little mode. More than that means scrolling or tiny targets, both of which are avoided.
- **No edge gestures and no small "X" buttons.** Use Android **screen pinning** so she cannot leave the app. The parent exit is a **long-press plus a simple math gate**.
- **Audio on phone speakers:**
  - Normalize loudness.
  - Avoid music under speech.
  - Prompt for headphones only for older levels.
- **Offline package size:**
  - About 3,000 short clips in Opus at 24–32 kbps (~3–8 KB/s × ~2 s ≈ 10–15 KB each).
  - That is about **30–50 MB of audio** plus illustrations (SVG/WebP), which is comfortable for an APK.
- **Battery and performance:** CSS/SVG animation, no heavy 3D, target mid-range Android phones (2–3 GB RAM).

---

## 7. Voice: North Indian female persona

**Persona:** Tara the baby elephant speaks in a **warm, clear, North Indian female voice**. She is bilingual: natural Hindi (Khari Boli standard, not heavily regional) and clear Indian English. One persona across both languages helps a young child feel it is the same friend.

**Production approach:**

| Content | Source | Why |
|---|---|---|
| English phonemes (44), Hindi varna/akshara sounds, barakhadi | **Human recording**, North Indian female voice artist | Speech synthesis adds vowels to isolated consonants ("suh" instead of "sss") and distorts pure phonemes. Accurate phonemes are non-negotiable for phonics. |
| Rhymes, songs, Tara's key lines (greetings, praise, hints) | **Human recording** (same artist) | Warmth and consistency; children respond to familiar, expressive voices |
| Bulk words, sentences, stories, item prompts | **Neural speech synthesis, generated in advance and bundled offline** | Thousands of items; easy to update. Candidate Indian female neural voices to audition: Microsoft Azure `hi-IN-SwaraNeural` and `en-IN-NeerjaNeural`; Google Cloud `hi-IN` / `en-IN` female Neural2/WaveNet voices. Choose the pair that sounds most like the human artist. |
| Optional | A **consented** custom voice built from the artist's recordings | One identical voice for everything. Only with the artist's written consent. |

**Audio quality rules:**
- Quiet room
- 44.1 kHz mono capture
- Loudness normalized (about −16 LUFS for phone speakers)
- No background music under instructions
- Every phoneme file checked by ear against a reference (e.g. a phonics-programme pronunciation guide)
- Hindi recordings checked for correct nasalisation (ं/ँ) and aspiration (क/ख, ग/घ)

The final voice is chosen in the UI phase by listening to 2–3 auditions with your daughter: whichever she responds to best.

---

## 8. References added in this revision

- Anderson, D. R., & Pempek, T. A. (2005). Television and very young children. *American Behavioral Scientist*, 48(5), 505–522.
- Anthony, L., Brown, Q., Nias, J., Tate, B., & Mohan, S. (2012). Interaction and recognition challenges in interpreting children's touch and gesture input on mobile devices. *Proceedings of ACM ITS 2012*, 225–234.
- Barr, R. (2010). Transfer of learning between 2D and 3D sources during infancy. *Developmental Review*, 30(2), 128–154.
- Beery, K. E., Buktenica, N. A., & Beery, N. A. (2010). *Beery-Buktenica Developmental Test of Visual-Motor Integration* (6th ed.). Pearson.
- Gerstadt, C. L., Hong, Y. J., & Diamond, A. (1994). The relationship between cognition and action: Performance of children 3½–7 years old on a Stroop-like day-night test. *Cognition*, 53(2), 129–153.
- Hourcade, J. P. (2008). Interaction design and children. *Foundations and Trends in Human–Computer Interaction*, 1(4), 277–392.
- Kilpatrick, D. A. (2015). *Essentials of Assessing, Preventing, and Overcoming Reading Difficulties*. Wiley.
- Kirkorian, H. L., Choi, K., & Pempek, T. A. (2016). Toddlers' word learning from contingent and noncontingent video on touch screens. *Child Development*, 87(2), 405–413.
- Sarnecka, B. W., & Carey, S. (2008). How counting represents number: What children must learn and when they learn it. *Cognition*, 108(3), 662–674.
- Treiman, R., & Broderick, V. (1998). What's in a name: Children's knowledge about the letters in their own names. *Journal of Experimental Child Psychology*, 70(2), 97–116.
- Troseth, G. L., Saylor, M. M., & Archer, A. H. (2006). Young children's use of video as a source of socially relevant information. *Child Development*, 77(3), 786–799.
- Wynn, K. (1990). Children's understanding of counting. *Cognition*, 36(2), 155–193.
- Zelazo, P. D. (2006). The Dimensional Change Card Sort (DCCS): A method of assessing executive function in children. *Nature Protocols*, 1(1), 297–301.

# Kids Learning App: Master Plan

**Phase 2: planning.** This document turns the research in `01-research-foundations.md` into a concrete plan:
- what she learns, in what order, how much per day
- how she learns it **without an adult**
- how the app adapts
- how content gets made
- how we measure whether it works

UI and visual design come next (Phase 3) and are built on this plan.

---

## 0. Decisions locked

> **Revision (Phase 2b).**
> - The app now starts from about **2 years** with a level-based adaptive syllabus (L0–L8). See `03-adaptive-syllabus.md`, which supersedes the age-based framing of Section 4.
> - Primary device is a **mobile phone, used in landscape**.
> - The companion is a **baby elephant ("Tara", working name)**.
> - The voice is a **North Indian female persona**.
> - The age bands in Sections 1 and 4 below remain the *typical* path for a child who starts at about 4.

| Decision | Choice | Reason |
|---|---|---|
| Learner | Daughter, 4 years 2 months now; plan runs to about 10 years | — |
| Languages | **Hindi (home) + English (school medium)** | — |
| Parent involvement | **Minimal.** She learns alone, and the parent spends about 2 minutes a week | The design compensates; see Section 3 |
| Platform | **One web codebase → (a) offline Android app via Capacitor, primary, and (b) installable web app (PWA), secondary** | Rationale in Section 9 |
| Philosophy | Evidence-based learning engine inside a playful world; no "IQ training" claims; no manipulative design | Research doc, Sections 1–3 |

---

## 1. North-star outcomes

These are measurable targets. The learning engine logs each one automatically, with no testing sessions needed.

Benchmarks are aligned to:
- NIPUN Bharat / NCF-FS foundational literacy and numeracy (FLN) goals
- UK/US phonics expectations for English-medium schooling

Each target is **"secure"** only when retrieval stays accurate after at least a 2-week gap.

| By age | English literacy | Hindi literacy | Math | Thinking skills |
|---|---|---|---|---|
| **5.0** | Hears first/last sound in words; blends 3 sounds orally; knows ~25 letter-sounds; reads simple CVC words (*cat, pin*) | Rich oral Hindi stories and rhymes; recognises ~10 स्वर/व्यंजन | Counts objects to 20 reliably (cardinality); subitizes to 5; numerals 0–20; compares quantities; AB/ABC patterns | Follows 2-step rules; sorts by 2 attributes; solves 6–8-piece shape puzzles |
| **6.0** | All 44 phonemes with common spellings; reads decodable sentences; spells CVC/CCVC; ~30 tricky words; 1,500+ English oral words | All स्वर + व्यंजन; first matras (ा ि ी); reads 2–3-akshara words | Number bonds to 10; add/subtract within 10; number line 0–20; counts to 100 | Rule-switching (DCCS); tangrams with outline; simple robot-path sequences |
| **7.0** | Reads simple chapter-book text with ~90% accuracy; alternative spellings; writes 3–4 sentences (on paper) | All matras; reads simple sentences; NIPUN Class 1 reading target | Place value to 100; add/subtract within 100; skip counting; time and money basics | Multi-step planning puzzles; analogies; ScratchJr-level coding |
| **8.0** | Fluent oral reading (~90+ words/min on grade text); morphology (prefixes/suffixes); comprehension strategies | Conjuncts (क्ष त्र ज्ञ, half letters); reads short stories fluently | Multiplication and division concepts; unit fractions on the number line; bar-model word problems | Spatial rotation and nets; logic grids; block coding with loops |
| **10.0** | Reads and comprehends grade-level non-fiction; academic vocabulary; structured paragraphs | Reads and writes Hindi at grade level; Hindi number names to 100 | Fluent ×/÷ facts; fractions and decimals on one number line; multi-step problems; early algebra | Independent inquiry projects; debugging; strategy games |

The English fluency figure follows Hasbrouck & Tindal oral reading fluency norms (about Grade 2 level). It is a guide, not a gate.

---

## 2. Language strategy: Hindi at home, English at school

This is the most important planning decision for her specifically.

### 2.1 What the evidence says

1. **Phonological awareness transfers across languages.** Rhyme, syllable and phoneme skills learned in one language support reading in the other (Durgunoğlu, Nagy & Hancin-Bhatt, 1993; Cummins' interdependence hypothesis). She does not need to learn "listening for sounds" twice.
2. **English vocabulary is her likely bottleneck, not decoding.** Phonics will let her *decode* English words. But under the Simple View of Reading (Comprehension = Decoding × Language), a child who decodes words she does not know orally becomes a "word caller". Children learning in a second language commonly decode well but lag in vocabulary and comprehension (Lesaux & Siegel, 2003; August & Shanahan, National Literacy Panel on Language-Minority Children, 2006).
3. **Home-language support speeds second-language vocabulary.** Brief explanations in the home language during English instruction improved English vocabulary in dual-language preschoolers (Lugo-Neris, Jackson & Goldstein, 2010). Hindi is a bridge, not a competitor.
4. **Devanagari takes longer and is learned in a different way.** It is an akshara (syllable) system with ~400+ units. It needs a systematic barakhadi sequence, and mastery runs to about Class 4 (Nag & Snowling, 2012). Learning two scripts at once is normal for Indian children, but starting both on the same day at 4.2 overloads working memory.
5. **Hindi number names (1–100) are mostly irregular** (e.g. *उनतालीस*, 39). They are much harder than English tens structure. Her school teaches math in English, so **math runs in English**, and Hindi number names come later (about 7–8+) as a vocabulary topic.

### 2.2 The resulting plan

| Age | English | Hindi |
|---|---|---|
| 4.2–5.0 | **Main literacy track:** phonological awareness → phonics. **Daily English oral vocabulary** (stories, songs, picture talk). | **Oral only:** rhymes, stories and a "say it in Hindi" bridge in vocabulary games. No script yet. *(Pilot rule: if she already knows letters from school, Hindi script can start earlier; placement decides.)* |
| 5.0–6.0 | Advanced phonics, decodable books, tricky words | **Script starts:** स्वर, then व्यंजन (high-frequency first), letters taught as sounds with the inherent अ |
| 6.0–7.5 | Fluency, spelling patterns, comprehension | **Barakhadi** (all matras), words, sentences, Hindi decodable stories |
| 7.5–10 | Morphology, comprehension strategies, knowledge-rich reading, writing | Conjuncts, fluency, Hindi stories and poems, grammar basics, number names |

**Instruction language (the voice that guides her):**
- Ages 4–5: **English with a Hindi helper**. A tap on the "दीदी/helper" bubble repeats the instruction or the word meaning in Hindi.
- From 6: mostly in the target language of the activity.
- Hindi activities: always in Hindi.

**Script interference:**
- Keep English and Hindi letter activities in **separate worlds**, with distinct colour, character and music. Contextual cues reduce confusion.
- Never put Roman and Devanagari letters on the same screen in a matching task during the first year of Hindi script.

---

## 3. Independent learning: how the app replaces the absent adult

The research says social interaction strongly helps learning in young children (Kuhl et al., 2003; Hirsh-Pasek et al., 2015). With minimal parent time, the app must supply what an adult normally does.

| An adult normally... | The app does it by... |
|---|---|
| Explains the task | **Audio-first instructions.** Every instruction is spoken, with no reading required until about 6. A one-time animated demo per game type. A replay button (ear icon) on every screen. |
| Notices confusion | **Frustration detection:** 2 errors in a row → hint; 3 → model the answer and step down one difficulty level; slow taps or idling → gentle check-in. |
| Gives help gradually | **Help ladder:** (1) replay the sound → (2) narrow choices from 4 to 2 → (3) highlight the answer → (4) worked demo → (5) do it together, then retry later in the session (retrieval). |
| Responds contingently | **A companion character** who reacts to *what she did* ("You heard the /s/ at the start of *sun*!"). Responsive interaction beats passive video for young children. |
| Keeps the right level | **Adaptive engine** keeps success at ~80–85% (Section 6). |
| Says "that's enough" | **Session ends itself** after 12–15 min (ages 4–5) with a calm closing ritual and a "come back tomorrow" world change. Daily cap set once by the parent. |
| Reads a story with her | **Talking storybook** with the companion asking dialogic-reading prompts (Prompt → she answers → Expand). Her spoken answers are recorded and played back; she is not graded on them. |
| Checks handwriting | **Off-screen mission card:** "Write the letter *s* 3 times on your slate, then show the camera / tap done." Self-report is honest enough at this age, and the parent sees it weekly. Finger tracing in-app is only a supplement. |

**Speech recognition decision:**
- Do **not** use speech recognition to grade a 4–6-year-old in the MVP:
  - Child-speech recognition accuracy is markedly lower than adult accuracy, especially for Indian-accented English and Hindi.
  - Browser speech recognition on Android needs internet.
  - False "wrong!" feedback damages trust.
- Instead, all scored tasks are **tap, drag or build** (receptive and constructive). Speaking tasks use **record → listen to yourself → compare with the model**, an established self-monitoring technique, and are not scored.
- Revisit for read-aloud fluency at about 7+ when on-device models improve.

**The parent's ~2 minutes a week:**
- Open the Parent Corner (behind a math gate, e.g. "type 7 × 8").
- Read a plain-language summary ("Mastered this week: /sh/ /ch/, number bonds of 5. Struggling: b/d. Try: point at b and d in a book.").
- Set or adjust the daily time cap.
- Optionally hear her recorded story answers.

---

## 4. Curriculum architecture

### 4.1 Strands and time share

Shares are percentages of app time and are rebalanced automatically by age.

| Strand | 4–5 | 5–6 | 6–8 | 8–10 |
|---|---|---|---|---|
| English: sounds, phonics, reading, spelling | 35 | 35 | 25 | 15 |
| English: oral vocabulary and stories (comprehension) | 15 | 10 | 10 | 10 |
| Hindi: oral → script → reading | 5 | 10 | 15 | 15 |
| Math | 25 | 25 | 25 | 25 |
| Spatial, logic, coding | 10 | 10 | 10 | 15 |
| Executive function games (embedded) | 5 | 5 | 5 | — (folded into strategy/coding) |
| World knowledge, science, curiosity (feeds comprehension) | 5 | 5 | 10 | 15 |
| Feelings and social (SEL) | — (embedded in stories) | — | short units | short units |

### 4.2 Skills graph

The curriculum is a **directed graph of small skills (nodes)** with prerequisites (edges).
- A node is a single teachable, testable skill, e.g. `EN.PA.first-sound`, `EN.PH.s-a-t-p`, `MA.NUM.cardinality-10`, `HI.SC.matra-aa`.
- Each node stores:
  - prerequisites
  - activity templates that can teach and test it
  - the item pool (words, pictures, audio)
  - the mastery criterion
  - its spaced-review state per learner
- Estimated size:

| Strand | Nodes |
|---|---|
| English literacy | ~140 |
| Hindi literacy | ~110 |
| Math | ~120 |
| Spatial/logic/coding | ~40 |
| EF | ~12 |
| Knowledge units | ~30 |
| **Total** | **~450** |

- **Why a graph and not a fixed lesson list:**
  - She can enter where she already is (placement).
  - She can choose among unlocked paths (autonomy).
  - The engine never asks for a skill whose prerequisites are not secure.
- This is the structure used by Clements & Sarama's learning trajectories and by intelligent tutoring systems.

### 4.3 First 12 months in detail (age 4.2 → 5.2)

This year gets built first. Months are approximate; the adaptive engine sets the real pace.

**English sounds and phonics** (sequence follows *Letters and Sounds* / Jolly Phonics order)

| Month | Skills |
|---|---|
| 1 | Placement check. Listening games: environmental sounds, rhythm, rhyme recognition, syllable clapping |
| 2 | Rhyme production (choose a rhyme), first-sound isolation (*sun* starts with /s/), oral blending of 2–3 sounds |
| 3 | Letter-sounds **s a t p i n**. Blend/read *at, sat, pin, tap*. Segment for spelling with letter tiles |
| 4 | **m d g o c k**, CVC reading/spelling. Tricky words: *the, I* |
| 5 | **ck e u r h b f l** (b/d separated by ≥3 weeks; see risks). Decodable 2-word phrases |
| 6 | **ss ff ll j v w x y z qu**. Decodable sentences. Tricky words: *to, no, go, into* |
| 7–8 | Digraphs **sh ch th ng**. First decodable mini-books (6–8 pages, read-along with self-paced word tapping) |
| 9–10 | **ai ee igh oa oo ar or** |
| 11–12 | **ur ow oi ear air er**. CVCC/CCVC words (*milk, frog*). Letter **names** ("A for Apple") linked to sounds, to align with school |

**English oral vocabulary** (daily, alongside phonics)
- Talking picture-book stories, 2–3 per week. Each introduces 3–5 target words (Beck Tier 2, plus concrete nouns and verbs).
- Target words are retrieved in mini-games for 3 weeks on a spaced schedule.
- Hindi helper bubble available throughout.
- Themes run in parallel with the knowledge units (body, family, animals, food, weather, vehicles, etc.).

**Hindi** (oral; script only if placement shows readiness)
- Hindi rhymes and stories, about 2 per week, with listening comprehension.
- "English ↔ Hindi" word-pair games (bridging).

**Math** (trajectories from Clements & Sarama)

| Month | Skills |
|---|---|
| 1 | Placement. Subitizing 1–3 → 1–5 (dot flashes, dice). Verbal counting to 10 |
| 2 | One-to-one counting; **cardinality** ("how many?" = last number); numerals 1–5 |
| 3 | **Number Race board game 1–10** (Siegler & Ramani protocol); compare more/less/same |
| 4 | Numerals 0–10; ordering; "one more / one less" |
| 5 | Ten-frames; composing 5 (2+3, 4+1); 2D shapes and properties |
| 6 | Counting 11–20; teen numbers as "ten and some more"; Number Race 1–20 |
| 7–8 | Number bonds to 10 (concrete → pictorial); measurement by comparison (longer/heavier) |
| 9–10 | Adding as combining, subtracting as taking away, within 10 with objects; AB/ABB/ABC patterns |
| 11–12 | Number line 0–20 (placing numbers); positional language; simple data (sort and count) |

**Spatial, logic and EF** (embedded, about 2–3 short games per week)
- Shape puzzles → tangrams with outlines
- Block copying
- Sort by colour, then shape, then switch rules (DCCS)
- Go/no-go animal games
- "Remember the order" sequences (2 → 4 items)
- Robot path with 2–4 arrows

**Off-screen missions** (1 per session, 2–5 min, she does them alone)
- Write a letter on a slate.
- Find 5 things that start with /m/.
- Count the spoons.
- Build a tower of 6 blocks.
- Freeze-dance game (music plays in-app; she freezes when it stops: inhibition).

### 4.4 Years 2–6 (age 5.2 → 10)

These follow the scope tables in the research document (Sections 5.2, 5.3, 6.1 and 7). Each later year gets its own detailed month plan **just before it is built**, using her real data from the previous year. Planning six years in detail now would be guesswork.

---

## 5. A day in the app (session design)

The session is 12–15 min at ages 4–5 and 15–25 min at 6–10. It follows Dehaene's pillars: attention, active engagement, error feedback, consolidation.

| Segment | Time | Purpose |
|---|---|---|
| 1. **Hello ritual** | 30 s | The companion greets her by name and shows the "world change" since yesterday (the garden grew a flower for each newly mastered skill). Signals that learning has begun. |
| 2. **Warm-up review** | 2–3 min | 4–6 **due items from spaced repetition**, mixed across strands (interleaving). Easy-ish wins to build momentum. |
| 3. **Curiosity hook** | 30 s | A mystery: "The monkey has 3 bananas, but the bag says 5… where did they go?" or "What sound is hiding at the start of *sun*?" |
| 4. **New learning** | 3–4 min | **One** new skill: demo → guided try → independent tries (worked example → faded support). |
| 5. **Play practice** | 3–4 min | A game template mixing the new skill with 1–2 earlier ones. Adaptive difficulty. |
| 6. **Story or explore** | 2–3 min | Alternates day by day: talking storybook (vocabulary, Hindi or English) / knowledge mini-explore / spatial puzzle / EF game. |
| 7. **Mission card and goodbye** | 30 s | An off-screen mission; a calm goodbye; the app shows "see you tomorrow" and locks for the day once the cap is reached. |

**Weekly rhythm:**
- 5–6 days a week.
- One "free play" day with replay of favourite unlocked games, still logged for review.
- About every 4 weeks, a **"checkpoint adventure"**: a playful, game-shaped mixed review of skills not seen for 2+ weeks. It is the real mastery confirmation, and she never experiences it as a test.

---

## 6. Learning engine (adaptivity)

1. **Placement (first 3 sessions):** short adaptive probes per strand (letter-sounds, rhyme, counting, subitizing, shapes, Hindi letters). Start each strand just below the first failure point.
2. **Per-skill mastery estimate:**
   - **Bayesian Knowledge Tracing** (Corbett & Anderson, 1995), with parameters for prior knowledge, learning, guess and slip.
   - Guess rate is set by the number of choices (2 options = 0.5, 4 = 0.25). Guessing is high for 4-year-olds.
   - Mastered when P(known) ≥ 0.95 **and** at least 2 correct responses on different days.
3. **Difficulty control:**
   - Target **~80–85% rolling accuracy**.
   - Levers: number of choices (2 → 3 → 4), distractor similarity (*s* vs *m* → *b* vs *d*), support (audio cue, highlight), item set size, time.
4. **Spaced review scheduler:**
   - Expanding intervals (1 → 3 → 7 → 16 → 35 → 90 days).
   - A correct answer extends the interval; an error resets it to a short gap and marks the skill "shaky".
   - About 30–50% of each session is due reviews.
5. **Interleaving:** once two confusable skills are both introduced (b/d, 6/9, ि/ी), they are deliberately mixed in discrimination games.
6. **Unlocking and choice:** after the warm-up, she picks between 2–3 unlocked quests (autonomy). The engine guarantees coverage of strand shares across the week.
7. **Frustration and boredom:**
   - Error streaks and slow responses → step down and give encouragement.
   - Very fast, accurate responses → skip ahead (no forced drill on mastered items).
8. **Everything is logged locally** (skill, item, correct, response time, hints used, timestamp). Logs power the parent summary and later tuning.

---

## 7. Motivation and game world (principles; visuals come in the UI phase)

- **One persistent world** that **visibly grows with mastery**: a garden/island/village where each mastered skill adds something permanent. Progress is visible and *informational*, the competence pillar of self-determination theory.
- **A companion character** (animal friend). Bilingual, warm, responds to her actions, models making mistakes ("Oops, I mixed up b and d too!").
- **Regions per strand**, e.g. Sound Forest (English), अक्षर नगर (Hindi), Number Mountain, Shape Workshop, Curiosity Lab. Distinct regions also help keep the scripts separate.
- **Rewards:**
  - Unexpected surprises (a new animal visits the garden), not pay-per-task coins.
  - A sticker book of *things she learned* (each sticker is a word, letter or number she mastered, and tapping it replays it).
  - **No** currency, shop, streak loss, leaderboards, ads, purchases or timers before 8.
- **Personalisation:** her name, photo-free avatar, family words (Mummy, Papa, Dadi/Nani in Hindi) in stories and math problems.
- **Calm by design:** limited animation during tasks, no flashing, soft sound. Celebrations are short (1–2 s) so they do not steal attention from the learning.

---

## 8. Content production plan

Content is the biggest workload. The code is mostly reusable templates.

| Asset | Year-1 quantity (approx.) | How |
|---|---|---|
| **English phoneme audio** (pure sounds, no schwa: "sss" not "suh") | 44 phonemes + blends | **Human recording.** TTS distorts isolated phonemes. Parent's voice is possible, or a hired voice. Studio-quiet room, 44.1 kHz, normalized. |
| English words (audio + picture) | ~400 decodable words + ~250 vocabulary words | Neural TTS acceptable for whole words and sentences (check each); picture per word |
| Hindi audio (letters, words, rhymes) | ~50 letters/akshara sounds, ~200 words, ~30 rhymes and stories | Human for letters and rhymes; TTS (Indian Hindi voice) for words and sentences, checked |
| Instruction and feedback lines (companion) | ~300 lines, EN + HI | Human recording preferred for warmth; TTS for prototyping |
| Decodable mini-books | ~20 English (phases A–D), later ~15 Hindi | Written to the taught-code list (an automatic checker verifies every word is decodable at that point) |
| Story/vocabulary books | ~60 short stories (EN), ~30 (HI) | Written for the target words; illustrated |
| Illustrations | ~800 images year 1 | Consistent flat illustration style; must be unambiguous (a "pin" picture must not be read as "needle") |
| Math, spatial and EF items | Mostly **generated by code** (dot patterns, numbers, shapes) | Parametric generation means effectively unlimited items |

**Quality rules:**
- Every word picture is tested for ambiguity: would a 4-year-old in India name it with the intended word? (*Tap* for faucet is not used in Indian English, which says *nal*; prefer *tap* = "tap with finger" or avoid.)
- Use Indian-context vocabulary and images (roti, auto, mango, peacock) alongside standard ones.
- English accent: a clear, neutral Indian-English or standard voice, consistent throughout.

---

## 9. Platform and technical architecture

**Recommendation: one web codebase, shipped two ways.**
- **Primary: an offline Android app built with Capacitor.** This is the same pipeline already in this repo for Super TET.
  - All audio and images are bundled.
  - Works with zero internet.
  - Storage is not wiped by the browser.
  - Can run on a cheap Android tablet with screen pinning, so she cannot leave the app.
- **Secondary: an installable web app (PWA)** from the same code, for laptop/tablet use and quick testing. Not primary because browsers can evict offline storage and audio caches.

**Why web technology at all:** one codebase, fast iteration, and easy preview while designing. HTML5 audio, canvas and drag/drop are fully adequate for 2D learning games.

**Architecture (draft; finalized after the UI phase):**
- **Content as data:** skills graph, items and books are JSON files. Adding content means no code changes.
- **Game templates** as components that take a skill + items + difficulty parameters.
- **Engine module:** placement, BKT mastery, difficulty controller, spaced scheduler, session composer. Pure logic, unit-tested.
- **Local storage:** IndexedDB on the device; optional export/backup file for the parent. No accounts, servers, analytics SDKs or ads. This is consistent with India's DPDP Act 2023 on children's data.
- **Device target:** Android tablet 8–10" (larger touch targets for small fingers). Phones supported.

---

## 10. Risks and mitigations

| Risk | Why it matters | Mitigation |
|---|---|---|
| **Low social interaction** (minimal parent) | Weakens oral-language learning at this age (Kuhl) | Responsive companion; dialogic prompts with recorded answers; "say it to Mummy/Papa" missions (10 s, optional); the weekly summary gives the parent one targeted thing to say. Honest note: 2–3 min/day of parent talk using the prompts would measurably help vocabulary. Optional, never required. |
| **b/d, p/q, ि/ी confusion** | Mirror-letter confusion is normal at 4–7 (Dehaene: mirror invariance must be "unlearned") | Separate their introduction by weeks; teach with motion and stroke direction; deliberate interleaved discrimination once both are known |
| **App vs school conflict** (school uses letter names, "A for Apple", cursive, or a different phonics order) | Confusion, double load | Placement check plus a periodic parent tick-box ("What is school teaching now?"). Letter names added in month 11–12. The engine can promote skills the school is covering. |
| **Too much screen** | Displaces sleep, play, movement | Built-in session cap; off-screen missions; no evening use (parent sets a cutoff); no autoplay. |
| **Over-gamification** | Extrinsic reward undermines interest | Rules in Section 7; review every game against them before building. |
| **Content errors** (wrong phoneme audio, ambiguous pictures) | Teaches errors that are hard to unlearn | Automatic decodability checker; picture-naming checklist; we listen to every phoneme file. |
| **Boredom over 6 years** | Engagement drops | New world regions per age band; increasing autonomy (projects, coding, building); content refreshed every ~6 months from her data. |
| **Plan becomes too big to build** | Never ships | Strict phasing (Section 11). The MVP covers only year 1 of 4 strands. |

---

## 11. Roadmap

| Phase | Output | Exit criteria |
|---|---|---|
| **1. Research** ✅ | `01-research-foundations.md` | Done |
| **2. Master plan** ✅ (this doc) | Strategy, curriculum architecture, engine, risks | Parent approves |
| **3. UI/UX design for a 4-year-old** (next) | Design principles (touch size, audio-first navigation, no-text UI); world and companion concept; screen flows; clickable prototype of 3 games | She can use the prototype without help for 10 min; parent approves the look |
| **4. Curriculum data, year 1** | Full skills graph for year 1 (~150 nodes) as JSON; word lists; decodable book texts; audio script | Decodability checker passes; content reviewed |
| **5. MVP build** | Engine + 6 game templates (Sound Safari, Blend Train, Word Builder, Number Race, Bond Builder, Shape Shifter) + 1 EF game + talking storybook + Parent Corner; Android APK + PWA | Runs offline on tablet; engine unit tests pass |
| **6. Pilot with her** (4 weeks) | Usage and mastery logs; observation notes | She returns to it willingly ≥5 days/week; accuracy stays in the 75–90% band; measurable gains on year-1 targets |
| **7. Iterate and expand** | Tune difficulty and content; add Hindi script world (~5.0), then later age bands every 6–12 months | Next age-band targets (Section 1) |

---

## 12. Questions for Phase 3 (UI design)

These can be answered when we start the design phase.

1. **Device:** which device will she use (tablet or phone, approximate screen size)?
2. **School check:** does her school already teach letter sounds or only letter names? Has Hindi varnamala started? (This sets placement and the Hindi start month.)
3. **Companion:** any animal or character she loves (or dislikes)?
4. **Voice:** would you be willing to record the phonemes and companion lines yourself? (A familiar voice increases engagement; otherwise we use a hired voice or TTS.)

---

### Additional references (beyond the research doc)

- August, D., & Shanahan, T. (Eds.) (2006). *Developing Literacy in Second-Language Learners: Report of the National Literacy Panel on Language-Minority Children and Youth*. Erlbaum.
- Cummins, J. (1979). Linguistic interdependence and the educational development of bilingual children. *Review of Educational Research*, 49(2), 222–251.
- Durgunoğlu, A. Y., Nagy, W. E., & Hancin-Bhatt, B. J. (1993). Cross-language transfer of phonological awareness. *Journal of Educational Psychology*, 85(3), 453–465.
- Hasbrouck, J., & Tindal, G. (2017). *An update to compiled ORF norms* (Technical Report 1702). Behavioral Research and Teaching, University of Oregon.
- Lesaux, N. K., & Siegel, L. S. (2003). The development of reading in children who speak English as a second language. *Developmental Psychology*, 39(6), 1005–1019.
- Lugo-Neris, M. J., Jackson, C. W., & Goldstein, H. (2010). Facilitating vocabulary acquisition of young English language learners. *Language, Speech, and Hearing Services in Schools*, 41(3), 314–327.

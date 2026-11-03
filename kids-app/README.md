# Tara Learning (ages 2–10)

Tara is an offline learning app for young children, built on the research and plans in `docs/kids-learning-app/`. A baby-elephant companion, Tara, speaks in English and Hindi. Learning is adaptive, mastery-based and spaced over time.

## What is in it now (v0.2): ages 2 to 10

The full homeschool plan is in `docs/kids-learning-app/05-homeschool-curriculum.md`.

**205 skills across levels L0–L8** (about 2 years to Class 5), each mastered adaptively.

| Area | Content |
|---|---|
| **Maths** | 25 foundation skills plus **54 generator topics** (unlimited questions; wrong answers model real misconceptions). Covers place value to crores, the four operations, fractions, decimals, percent, ₹ money, time, measurement, geometry, bar graphs, Roman numerals and early algebra. |
| **English** | Phonics and phonological awareness; **108 graded vocabulary words** (meaning, example, Hindi gloss); **352 grammar and morphology rows** feeding 21 question types. |
| **Reading** | **19 original passages** (16 English, 3 Hindi) with 69 questions: literal, inference, vocabulary, main idea. |
| **Hindi** | 48 akshara and first words; **208 rows** of matra words, conjuncts, विलोम, पर्यायवाची, लिंग, वचन, मुहावरे, शब्द-भेद; number names 1–100, days, ऋतुएँ. |
| **EVS** | **162 explained questions** across 15 units (science, India, world, history, civics). |
| **Thinking** | Patterns, rotation, rule switching, memory, go/no-go, Number Race. |

**Three interface modes:**
- **Tiny** (2–3.5): tap only, 2 choices.
- **Little** (3.5–6): games with tiles, frames and boards.
- **Explorer** (6+): read-aloud quizzes with an explanation after every answer, and a reading-comprehension reader.

**Engine:**
- Bayesian Knowledge Tracing.
- Mastery means P ≥ 0.95 and correct answers on 2 separate days.
- Spaced review at 1, 3, 7, 16, 35 and 90 days.
- Age-based placement.
- Skills offered only up to one level above the child's current level.
- Difficulty tuned to about 80–85% success.

**Parent Corner:** progress, settings, voices, backup, multiple children, and the Recording Studio.

## Run it

**Browser:**
```bash
cd kids-app && npm run serve      # then open http://localhost:8765 on a phone-sized window, landscape
```

**Android APK:**
1. On GitHub, open **Actions → Build Tara Learning APK → Run workflow**.
2. Download **Tara-Learning-apk** from the run.

The APK is signed with the repository's fixed debug key, so new versions install over old ones and keep her progress.

## Code map

```
www/
  index.html, css/app.css, fonts/ (Andika, Baloo 2: SIL OFL), sw.js (offline web)
  js/main.js           app shell: onboarding, home, sessions, goodbye, stickers, Parent Corner
  js/studio.js         Recording Studio
  js/core/engine.js    BKT mastery, spaced review, placement, session composer
  js/core/audio.js     human clip → native TTS → web speech; soft synthesized SFX
  js/core/ui.js        screens, top bar, celebration, parent gate
  js/core/tara.js      Tara (SVG, moods)
  js/content/*.js      syllabus as data: skills graph, words, phonics, Hindi
  js/games/*.js        game templates (generate items from data, help ladder in runner.js)
```

## Privacy

Everything stays on the device. There are no accounts, ads, analytics or network calls. This is consistent with India's DPDP Act 2023 provisions on children's data.

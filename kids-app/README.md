# Tara Learning (ages 2–10)

Tara is an offline learning app for young children, built on the research and plans in `docs/kids-learning-app/`. A baby-elephant companion, Tara, speaks in English and Hindi. Learning is adaptive, mastery-based and spaced over time.

## What is in it now (v0.1)

**Content inventory:**

| Item | Count |
|---|---|
| Skills in the adaptive syllabus | **92** (levels L0–L4, about 2 to 6.5 years) |
| Game templates | **35** |
| Picture words, each with a Hindi translation | **175** (79 fully decodable for phonics) |
| Phonics graphemes | **47** (full *Letters and Sounds* order) |
| Hindi akshara | **48** (स्वर, व्यंजन, conjuncts) |
| Hindi first words without matras | **12** |

**Skills by area:**

| Area | Skills |
|---|---|
| English oral vocabulary (EN-OL) | 13 |
| Listening for sounds (EN-PA) | 6 |
| Letters and reading (EN-PH) | 22 |
| Maths (MA) | 25 |
| Logic and spatial (LG/SP) | 5 |
| Attention and self-control (EF) | 4 |
| Hindi (HI) | 14 |
| Feelings (SE) | 3 |

**Learning engine:**
- Bayesian Knowledge Tracing per skill.
- Mastery means P ≥ 0.95 and correct answers on 2 separate days.
- Spaced review at 1, 3, 7, 16, 35 and 90 days.
- Age-based placement guess, with lower-level skills checked quickly by review.
- Difficulty steps keep success around 80–85%.

**Games:**

| Area | Games |
|---|---|
| Language | Show-me words (English and Hindi), colours, big/small, categories, prepositions, feelings |
| Sounds | Clap syllables, rhyme, first and last sound, blending |
| Letters | Letters of my name, capital/small matching, letter sounds (name + sound + picture), read-a-word with sound buttons, build-a-word with tiles, tricky words |
| Maths | One/many, compare more/fewer, quick-look dots (subitizing), tap-to-count, give-N "feed Tara", numerals to 20, Number Race (linear board game), one more/less, number bonds with five- and ten-frames, story sums, patterns, shapes |
| Thinking | Find the same, odd one out, mental rotation, colour-then-shape rule switch (DCCS), memory pairs, go/no-go |
| Hindi | Akshara with keyword pictures; first words with akshara sound buttons |

**Around the games:**
- Home world with a garden that grows as she masters skills.
- Quest doors to choose an area, a sticker book, and off-screen missions.
- Daily time cap and bedtime lock.
- **Parent Corner** behind a long-press and a sum:
  - weekly minutes and level by area
  - struggling / learning / mastered lists
  - settings and voice choice
  - backup and restore
  - multiple children
  - **Recording Studio** for recording pure phonemes and akshara in a real voice

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

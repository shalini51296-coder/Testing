# Tara Learning: UI and Interaction Design System

**Phase 3.** This document turns the research and plans (docs 01–03) into rules for screens and interactions. The working app in `kids-app/` implements every rule here. When a rule and the code disagree, the code is the bug.

---

## 1. The ten design rules and their evidence

| # | Rule | Why (evidence) | Where in code |
|---|---|---|---|
| 1 | **Audio-first.** Every instruction is spoken. No reading is needed to use the app before about age 6. | Pre-readers need instructions they can hear. Narration beats on-screen text for young learners (modality principle; Mayer, *Multimedia Learning*). | `core/audio.js`; every item has `say` |
| 2 | **Replay is always top-left, Home is always top-right.** Positions never change. | Consistent spatial layout reduces load on working memory. Young children rely on location, not labels (Hourcade 2008). | `ui.topBar()` |
| 3 | **Task screens are calm.** Plain warm background and one focal area. Decoration is only allowed on the home world. | A heavily decorated classroom reduced kindergartners' attention and learning (Fisher, Godwin & Seltman 2014, *Psych Sci*). Extra decoration hurts learning (coherence principle). | `.activity` vs `.home-screen` CSS |
| 4 | **At most 4 choices on a phone, 2 in Tiny mode.** Choice count grows with difficulty: 2 → 3 → 4. | Decision time grows with the number of options (Hick's law). Small screens and immature motor control make small targets error-prone (Anthony et al. 2012). | `parts.nChoices()` |
| 5 | **Big touch targets:** at least 15 mm in Little mode and at least 20 mm in Tiny mode, with gaps of at least 3 mm. | Children's touch accuracy is much lower than adults' (Anthony et al. 2012; Hourcade 2008). | `--choice` tokens |
| 6 | **Choices unlock after the spoken prompt.** | The child listens before acting. This prevents tap-spamming and supports attention, Dehaene's first pillar of learning. | `runChoiceItem` |
| 7 | **Errors teach and never punish.** A gentle sound, a short shake, informative feedback, then a help ladder. No lives, no timers, no "game over". | Elaborated feedback beats right/wrong feedback (Shute 2008; Van der Kleij et al. 2015). Punishment raises anxiety and avoidance. | Help ladder, §3 |
| 8 | **The first item of a new skill is a worked example** ("Watch me… now you"). | The worked-example effect, then fading of support (Sweller; Renkl). | `demo` in runner |
| 9 | **Celebrations are short (≤ 1.2 s) and informational.** No coins, shop or streaks. | Expected tangible rewards undermine intrinsic motivation (Deci, Koestner & Ryan 1999). Progress you can see supports competence (self-determination theory). | `celebrate()`, garden, stickers |
| 10 | **A companion character who responds to what the child did.** | Pedagogical agents give a small positive effect (Schroeder, Adesope & Gilbert 2013, g ≈ 0.19). Responsive (contingent) screens beat passive video for toddlers (Kirkorian et al. 2016; Troseth et al. 2006). | `core/tara.js` |

---

## 2. Screen anatomy (phone, landscape)

```
┌──────────────────────────────────────────────────────────────┐
│ (🔊 replay)          ● ● ◉ ○ ○  (progress)           (🏠 home) │  68 px top bar
│                                                              │
│                    ┌──────────────┐                          │
│                    │   PROMPT     │  ← target picture / word │  prompt zone
│                    └──────────────┘    / dots / frame        │
│                                                              │
│        ┌──────┐   ┌──────┐   ┌──────┐   ┌──────┐            │  choice row
│        │  A   │   │  B   │   │  C   │   │  D   │            │  (2–4 cards)
│        └──────┘   └──────┘   └──────┘   └──────┘            │
│ 🐘 Tara                                              (हिं)    │  Tara dock · Hindi helper
└──────────────────────────────────────────────────────────────┘
```

- **Tara** sits bottom-left. She reacts with these moods: idle, talk, happy, encourage, wave, sleepy.
- **हिं (Hindi helper)** sits bottom-right. It repeats the instruction or the word meaning in Hindi, which bridges English vocabulary for a child with Hindi at home.
- **Portrait fallback:** choices wrap into 2×2. Landscape is preferred and enforced in the Android app.

### Home world

- Sky, hills and a **garden that grows one flower per mastered skill**. This is a permanent, visible record of mastery.
- One **big Play button**. The engine picks the session.
- **2–3 quest doors** for different areas. The child chooses one, which supports autonomy (self-determination theory).
- **Sticker book** of what she has learned. Tapping a sticker replays its name.
- **Grown-ups gear:** long-press for 1.5 s, then a multiplication question (e.g. 7 × 8). Toddlers cannot get into settings.

### Other screens

- **Between rounds:** stars for the round plus one line of effort or strategy praise ("Your brain is growing!"). It never says "you're smart" (Mueller & Dweck 1998).
- **Mastery:** a sticker reveal and a flower added to the garden.
- **Goodbye:** an **off-screen mission** (count spoons, write the first letter of your name, find something red). Missions are spoken in English and shown in Hindi.
- **Sleeping Tara:** shown when the daily limit or bedtime is reached. "Sleep helps your brain remember."

---

## 3. Interaction patterns

### Help ladder (every choice item)

1. **First wrong answer:** a soft two-note sound, the card shakes and fades, and the feedback explains the error, e.g. *"That's a dog. Dog starts with /d/. Listen for /s/."*
2. **Second wrong answer:** every choice except the answer and one other is removed, and the prompt replays.
3. **Third wrong answer:** the correct card pulses. *"It's this one. Tap it!"* She always finishes the item herself (errorless finish).

**Scoring:** an item is "known" only if it was right on the first try. Hinted answers are recorded as not yet known, which keeps the learner model honest.

### Reading support

- Words are shown with **sound buttons**: tap any grapheme to hear its sound.
- This lets her decode without an adult.
- It reinforces orthographic mapping: each letter linked to its sound in the word (Ehri 2014).

### Counting support

- Objects in "How many?" can be tapped. Each tap places a number badge and says the count.
- This builds one-to-one correspondence and cardinality (Gelman & Gallistel's counting principles).

### Session flow

1. Spaced reviews come first, up to 3.
2. Then frontier skills, weighted by subject share for her level.
3. The same subject never appears twice in a row (interleaving).
4. The session ends at 6 minutes in Tiny mode or 13 minutes in Little mode, or at the daily cap. It closes with an off-screen mission.

---

## 4. Visual tokens

| Token | Value | Use |
|---|---|---|
| `--bg` | `#FFF8EC` warm cream | All task screens (low glare, calm) |
| `--ink` | `#2E3150` | Text and letters (contrast > 12:1 on cream) |
| `--primary` | `#5B6CC2` | Tara's blue-violet, replay button, numerals |
| `--accent` | `#FFB547` mango | Play button, current progress dot, hints |
| `--good` | `#3FAE6A` | Correct answer. Always paired with ✔ motion and a chime, never colour alone (about 8% of boys have colour-vision deficiency) |
| `--r` | 26 px | Card radius (soft, friendly) |
| `--choice` | `clamp(84px, min(30vh, 21vw), 168px)` | Choice card size. Tiny mode: `clamp(110px, min(42vh, 30vw), 210px)` |

**Type:**
- **Andika** (SIL International) for all English letters and words. It was designed for beginning readers: single-storey *a* and *g*, and clearly distinct *I l 1*.
- **Baloo 2** for the interface and for Devanagari. It is rounded and friendly, and has full conjunct support.
- Both fonts are bundled offline under the SIL Open Font License.

**Motion:**
- Ear flap and blink keep Tara feeling alive.
- Celebrations last 0.8–1.2 s.
- `prefers-reduced-motion` turns off all motion.

---

## 5. Interface modes (syllabus §4.3)

| Mode | Who | Differences |
|---|---|---|
| **Tiny** | about 2–3.5 y | Tap only; 2 choices; larger cards and Tara; no quest doors (just Play); 4 items per round; about 6-minute sessions |
| **Little** | about 3.5–6 y | Tap plus tap-to-place (letter tiles); 2–4 choices; quest doors; 5 items per round; about 13-minute sessions |
| **Explorer / Pro** | 6+ | Planned: keyboard, free map, on-screen text, projects |

---

## 6. What is placeholder today

| Placeholder | Final | Why it is acceptable for now |
|---|---|---|
| Emoji pictures | Commissioned flat illustrations in one consistent style, culturally Indian where relevant | Emoji render offline on every Android phone and are mostly unambiguous. Each picture was checked against the naming rule. |
| Device text-to-speech | Human North Indian female voice for phonemes, akshara and Tara's key lines (doc 03 §7) | The Recording Studio in Parent Corner lets a parent record these today. Recordings automatically replace speech synthesis. |
| Sound effects synthesised in code | Same (deliberately minimal) | Short, soft and asset-free |

---

## 7. Checklist for adding a new game

1. Does it teach **one** skill node with a clear mastery test?
2. Is every instruction spoken, with a Hindi helper line?
3. Does wrong-answer feedback **explain** the error?
4. Does it have at most 4 choices on a phone?
5. Is there no decoration on the task screen?
6. Is there no timer, life, coin or loss mechanic? (Go/no-go uses a time window as the skill itself, never as punishment.)
7. Does it generate items from data, so it can be repeated without repeating items?
8. Does it run offline?
9. Does it pass `gen.js` (every skill, every difficulty, no duplicate or missing answers) and get a screenshot review at 800×360?

---

### References added

- Anthony, L., et al. (2012). Interaction and recognition challenges in interpreting children's touch and gesture input on mobile devices. *ACM ITS*.
- Fisher, A. V., Godwin, K. E., & Seltman, H. (2014). Visual environment, attention allocation, and learning in young children: When too much of a good thing may be bad. *Psychological Science*, 25(7), 1362–1370.
- Hourcade, J. P. (2008). Interaction design and children. *Foundations and Trends in HCI*, 1(4).
- Schroeder, N. L., Adesope, O. O., & Gilbert, R. B. (2013). How effective are pedagogical agents for learning? A meta-analytic review. *Journal of Educational Computing Research*, 49(1), 1–39.
- Shute, V. J. (2008). Focus on formative feedback. *Review of Educational Research*, 78(1), 153–189.
- Van der Kleij, F. M., Feskens, R. C. W., & Eggen, T. J. H. M. (2015). Effects of feedback in a computer-based learning environment on students' learning outcomes: A meta-analysis. *Review of Educational Research*, 85(4), 475–511.

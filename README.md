# CloudPulse — "Worst Cancel Screen Ever"
> **Keytos Hack Mini-Challenge #1**  
> *"Hostile, confusing, and delightfully unhinged — but 100% possible to cancel."*

---

## Overview & Mini-Game Gauntlet

**CloudPulse** satirizes predatory SaaS dark patterns by turning subscription cancellation into an escalating boss gauntlet featuring multiple interactive mini-games and an adversarial **Reverse Akinator**:

- **Stage 1: Fictional SaaS Dashboard:** Flashing red countdown (`04:59`), decoy renew buttons, and an exit link camouflaged in legal micro-print under `Appendix 14C`.
- **Stage 2: Caribbean Cruise & Evasive Cursor:** A 1-in-4,000,000 sweepstakes bribe, pre-checked $149/mo upsell, and an exit button that physically flees from the cursor twice before it can be caught.
- **Stage 3: Confirmshame & Double Negatives:** Live server hamster cam (*Barnaby*), loss ledger, and an interlocking double-negative logic trap (`Clause 1A` & `Clause 1B`).
- **Stage 4: Reverse Akinator Boss Fight (Main Loop):** You cannot say "cancel". Feed indirect clues to make the *Retention Oracle* deduce your intent over 5 rounds. Includes:
  - **Forbidden Word Strikes:** Buzzers, screen shakes, flashing red alarm (Strike 3), and hard session reset back to Stage 1 (Strike 4).
  - **Police Sobriety Checkpoint:** Drag a police cruiser through an ultra-narrow corridor to prove mental fitness for cancellation.
  - **Bouncing DVD Logo:** A ricocheting exit target moving at constant velocity that must be timed and clicked.
- **Stage 5: Non-Declination De-Enrollment:** A triple-negative legal receipt, a floating DVD exit box unlocking the *Certificate of Eternal Freedom*, and a circular trap button that shoots confetti and loops back to Stage 1.

---

## Deterministic Heuristic Engine (No External AI)

To guarantee zero latency, zero API costs, and a deterministic, 100% solvable path, we replaced external LLMs with a custom **Client-Side Semantic Heuristic Engine** (`src/utils/akinatorEngine.ts`):
- **Semantic Intent Mapping:** Categorizes clues across financial cessation, account closure, and dissatisfaction clusters.
- **Corporate Deflection:** Deflects the first 4 rounds with corporate upsells (Caribbean upgrades, tuna barter, burnout diagnosis).
- **Forbidden Tokenizer:** Regex-based penalty machine monitoring banned terms (`cancel`, `quit`, `unsub`, `leave`, `stop`, `end`, `terminate`).
- **Instant & Offline:** Zero external network calls, runs entirely client-side at 60 FPS.

---

## Ambient Hostility Systems
- **Skyscraper Ads:** Left and right gutters stretch to fill 100% of unused screen space with corporate parody ads.
- **Danmaku Bullet Comments:** 16 lanes of Bilibili-style user comments passing through non-blocking click targets.
- **Mascot Guilt Banners:** Animated mascots cross every 15s with native browser Web Speech Synthesis audio pleas.
- **Font Chaos:** Periodic typography mutations (Comic Sans, Papyrus, Impact, Monospace, Serif) to induce cognitive fatigue.
- **Web Audio Synthesizer:** Procedural sirens, buzzers, and fanfares synthesized via native Web Audio API with zero external audio files.

---

## Submission Videos & Links

- **GitHub Repository:** [Keytos-Mini-Challenge-1-2026](https://github.com/secondjb/Keytos-Mini-Challenge-1-2026)
- **Google Drive (All Recordings):** [Google Drive Video Folder](https://drive.google.com/drive/folders/1T9ez2y0TaUL8KWD2rWE1bKQZlJdYVx-5?usp=sharing)
- **Judge Bypass Shortcut:** Press `Ctrl + Shift + \` to fast-forward stages during evaluation.

| Video | Description | Format | Link |
| :--- | :--- | :--- | :--- |
| **Video #1: Speedrun** | Full deterministic exit path from Stage 1 to Certificate of Freedom. | 1080p 60fps (41s) | [GitHub](./docs/videos/video_1_speedrun_1080p.mp4) • [Drive](https://drive.google.com/drive/folders/1T9ez2y0TaUL8KWD2rWE1bKQZlJdYVx-5?usp=sharing) |
| **Video #2: Deep Dive** | Showcases ads, danmaku comments, animal speech, strikes 1-4, sobriety checkpoint, and circular trap. | 1080p 60fps (52s) | [GitHub](./docs/videos/video_2_feature_showcase_1080p.mp4) • [Drive](https://drive.google.com/drive/folders/1T9ez2y0TaUL8KWD2rWE1bKQZlJdYVx-5?usp=sharing) |
| **Video #3: Combined** | Continuous official submission with 3s title cards under 5 minutes. | 1080p 60fps (1m 39s) | [GitHub](./docs/videos/video_3_combined_submission_1080p.mp4) • [Drive](https://drive.google.com/drive/folders/1T9ez2y0TaUL8KWD2rWE1bKQZlJdYVx-5?usp=sharing) |

---

## Quickstart & Tech Stack

**Stack:** React 18, TypeScript, Tailwind CSS, esbuild, Web Audio API, Web Speech API, Canvas-Confetti.

```bash
npm install
npm run build
npm start
# http://localhost:5173
```
*Configured with `vercel.json` for 1-click Vercel deployment with SPA rewrites.*

---

## Development & Authorship

- **Concept & Architecture:** The overall concept, game mechanics, user flow design, and tech stack choices originated from the human author (@secondjb).
- **Implementation:** Code generation, component architecture, and refactoring were primarily implemented using AI agents.
- **Automated QA & Video Recording:** AI agents were also utilized to double-check the flow, conduct autonomous end-to-end QA click-through validation across every stage, and record and compile the final 1080p submission videos.

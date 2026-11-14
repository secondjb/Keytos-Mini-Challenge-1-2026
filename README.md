# CloudPulse — "Worst Cancel Screen Ever"
> **Keytos Hack — Mini-Challenge #1 Submission**  
> *"Hostile, confusing, and delightfully unhinged — but 100% possible to cancel."*

---

## Executive Summary

**CloudPulse** is a satirical, interactive web experience that satirizes the predatory dark patterns found across modern SaaS, telecom, and subscription services, turning them into an entertaining, playable obstacle course.

Rather than just presenting passive hostile text, the entire application is architected around an escalating **5-stage boss gauntlet** featuring a gauntlet of interactive mini-games and a centerpiece **Reverse Akinator AI loop**:

1. **The Evasive Cursor Mini-Game (Stage 2):** The true cancellation link physically flees across the viewport when the user's cursor approaches, forcing precision and persistence.
2. **The Interlocking Double-Negative Puzzle (Stage 3):** An adversarial legal matrix requiring users to reconcile inverted checkboxes (`Clause 1A` and `Clause 1B`) before unlocking progression.
3. **The Reverse Akinator Boss Battle (Stage 4 - Main Loop):** Instead of an AI guessing what character you are thinking of, you must play against the *Retention Oracle*. You must provide subtle, indirect conversational clues until the AI deduces your intent is to cancel.
4. **The Police Sobriety Checkpoint (Mid-Stage 4):** A mandatory field-sobriety mini-game requiring the user to steer a police cruiser through an ultra-narrow corridor without touching the barrier before being allowed to submit further clues.
5. **The Bouncing DVD Logo Timing Mini-Game (Stages 4 & 5):** The exit triggers bounce off the screen boundaries at constant velocity like a retro DVD screensaver logo, requiring hand-eye coordination to click.
6. **The Circular Reset Trap (Stage 5):** A celebratory decoy button that shoots confetti and loops the user right back to Stage 1!

---

## The Deterministic Semantic Heuristic Engine (Replacing External AI)

To ensure **100% reliability, zero network latency, zero API costs, and a deterministic, guaranteed-solvable path** for judges, we replaced external LLM API calls with a custom **Client-Side Semantic Heuristic Intent Engine** (`src/utils/akinatorEngine.ts`):

- **Keyword Cluster Mapping:** The engine analyzes user input across multiple semantic categories (financial cessation, account closure, parting phrases, dissatisfaction, competitor migration).
- **Adversarial Deflection System:** For the first 4 rounds, the engine intentionally misinterprets intent into absurd upsells (e.g., offering Caribbean diamond cruises, proposing barter payments with canned tuna, or diagnosing user burnout).
- **Forbidden Tokenizer & Strike Machine:** A strict regex-based violation detector monitors banned vocabulary (`cancel`, `quit`, `unsub`, `leave`, `stop`, `end`, `terminate`). Submitting forbidden terms triggers real-time audio buzzers, viewport shakes, strike increments, a flashing red emergency alert at Strike 3, and a hard session reset at Strike 4.
- **Dramatic Revelation Threshold:** Once the user inputs sufficient semantic clues across 5+ rounds, the engine triggers the dramatic crystal shatter sequence.
- **Offline & Standalone:** Runs entirely inside the browser with zero third-party dependencies, guaranteeing an instant 60 FPS response rate.

---

## Submission Overview
- **Event:** Keytos Hackathon Mini-Challenge 01
- **Theme:** Worst Cancel Screen Ever
- **GitHub Repository:** [https://github.com/secondjb/Keytos-Mini-Challenge-1-2026](https://github.com/secondjb/Keytos-Mini-Challenge-1-2026)
- **Google Drive Video Folder (All Recordings):** [https://drive.google.com/drive/folders/1T9ez2y0TaUL8KWD2rWE1bKQZlJdYVx-5?usp=sharing](https://drive.google.com/drive/folders/1T9ez2y0TaUL8KWD2rWE1bKQZlJdYVx-5?usp=sharing)
- **Local Dev Port:** `http://localhost:5173/`

---

## Submission Videos (1080p, 60 FPS, Sub-5 Minutes)

> **Watch / Download All Videos on Google Drive:**  
> **[Google Drive Video Folder (All 3 Videos)](https://drive.google.com/drive/folders/1T9ez2y0TaUL8KWD2rWE1bKQZlJdYVx-5?usp=sharing)**

All videos are also committed directly inside the repository under [`docs/videos/`](./docs/videos/):

| Video | Title & Description | Runtime & Specs | Links |
| :--- | :--- | :--- | :--- |
| **Video #1** | **The Solvable Speedrun**<br>Demonstrates the full end-to-end deterministic exit path from Stage 1 through the Reverse Akinator and final freedom certificate with visible cursor interaction. | 41.2s<br>1080p 60 FPS, BT.709 | [GitHub File](./docs/videos/video_1_speedrun_1080p.mp4) • [Google Drive](https://drive.google.com/drive/folders/1T9ez2y0TaUL8KWD2rWE1bKQZlJdYVx-5?usp=sharing) |
| **Video #2** | **Feature Deep Dive & Hostility Showcase**<br>Comprehensive walkthrough of every anti-pattern: skyscraper ads, Bilibili danmaku comments, animal guilt banners with speech synthesis, early renew trap, double-negative clauses, forbidden word strikes (1, 2, 3 blinking alarm, 4th reset), sobriety checkpoint swerve, and circular restart trap. | 51.8s<br>1080p 60 FPS, BT.709 | [GitHub File](./docs/videos/video_2_feature_showcase_1080p.mp4) • [Google Drive](https://drive.google.com/drive/folders/1T9ez2y0TaUL8KWD2rWE1bKQZlJdYVx-5?usp=sharing) |
| **Video #3** | **Official Combined Submission (Recommended for Judges)**<br>Combines both parts seamlessly with 3-second title cards under 5 minutes continuous runtime (~1m 39s) for one-shot review. | 1m 39s<br>1080p 60 FPS, BT.709 | [GitHub File](./docs/videos/video_3_combined_submission_1080p.mp4) • [Google Drive](https://drive.google.com/drive/folders/1T9ez2y0TaUL8KWD2rWE1bKQZlJdYVx-5?usp=sharing) |

---

## The 5-Stage Gauntlet & Hostile Mechanics

### 1. Stage 1: Fictional SaaS Dashboard (CloudPulse Titan Suite)
- **Active Tier:** Fictional *CloudPulse Titan Suite* ($89.99/mo).
- **Urgency Stress:** Countdown timer (`04:59`) flashing red to create artificial panic.
- **Boss Health Bar:** Arcade header tracking `"BOSS: THE RETENTION DEPARTMENT"` with 100% HP.
- **Decoy Primary CTAs:** Massive glowing green buttons renew early for 5,000 karma points or lock in 3-year commitments.
- **Camouflaged Exit:** Disguised in micro-print legal disclaimers: *"Manage subscription termination and non-renewal options under Appendix 14C"*.

### 2. Stage 2: The Caribbean Cruise Giveaway & Evasive Exit
- **Absurd Bribes:** *"Wait! Win an All-Inclusive 7-Day Caribbean Cruise!"* (1-in-4,000,000 odds; leaving gives ticket to `@kevin_99`).
- **Hidden Upsell Trap:** Sneaky pre-checked 3-year Platinum upsell checkbox ($149/mo).
- **Double-Negative Decoy Button:** *"Don't not keep my subscription"*.
- **Evasive Button Mechanic:** The true exit link physically flees from the cursor twice before allowing a determined user to catch and click it.

### 3. Stage 3: The Confirmshame Audit & Double-Negative Logic Trap
- **Live Hamster Cam:** Shows *Barnaby the Server Hamster*, whose sunflower seed rations drop to 58% if you terminate.
- **Sunk-Cost Loss Ledger:** Lists vaporized karma points and forfeiture of personalized CFO holiday greetings.
- **Double-Negative Logic Trap:** Requires solving two interlocking negative clauses (`Clause 1A` and `Clause 1B`) before unlocking the arbitration button.

### 4. Stage 4: The Reverse Akinator Boss Fight
- **The Core Mechanic:** You cannot simply say you want to cancel. You must provide clues to make the AI Retention Oracle deduce your intent.
- **5 Minimum Rounds:** The Oracle deflects the first 4 rounds with corporate double-speak and absurd upsells.
- **Banned Words & Strike System:**
  - Typing forbidden words (`cancel`, `quit`, `unsub`, `leave`, `stop`, `end`, `terminate`) triggers a **penalty buzzer** and screen shake.
  - **Strike 3:** Triggers a full-screen blinking red emergency siren banner.
  - **Strike 4:** Executes an instant hard session reset back to Stage 1!
- **Mandatory Police Sobriety Field Checkpoint:** Triggered midway through the boss fight; the user must drag a police cruiser through an ultra-narrow corridor to the checkered flag before they are permitted to proceed.
- **Dramatic Crystal Shatter:** On Round 5 with valid semantic clues, the crystal ball shatters with audio fanfare:
  > *"THE SACRED CRYSTAL SHATTERS! Ceasing payment? Severing access? Walking away from CloudPulse?! ARE YOU TRYING TO CANCEL YOUR SACRED SUBSCRIPTION?! NOOOOO!"*
- **Bouncing DVD Logo Target:** Defeating the Oracle spawns a bouncing DVD screensaver box that ricochets across the screen at constant velocity, requiring precision timing to click.

### 5. Stage 5: Notice of Non-Declination De-Enrollment & Circular Trap
- **Triple-Negative Legal Receipt:**
  - *"Confirmation: You have not failed to unsuccessfully avoid declining not to discontinue your non-active subscription status."*
  - *"In accordance with Subsection 44-D, we have not omitted to not process your non-continuance request..."*
- **The Circular Reset Trap:**
  - Massive celebratory button: *"NEVERMIND! I MADE A HORRIBLE MISTAKE! RESTORE MY PLAN NOW!"*
  - Clicking it fires a confetti explosion and resets the user completely back to Stage 1!
- **True Exit Target:** A floating pink bouncing DVD logo exit box that unlocks the official **Certificate of Eternal Freedom** modal.

---

## Ambient Hostility Systems

1. **Full-Gutter Responsive Skyscraper Ads (`SidebarSkyscraperAds.tsx`):**
   - Left and right gutters dynamically expand to occupy 100% of unused viewport space.
   - Parody ads include: *"Doctors HATE This One Weird Retention Trick!"*, *"3 Hot Single Discounts Near You Want To Renew!"*, *"Download 128GB of Virtual RAM For Free!"*, and *"Why Eat Real Pizza? Own a Pizza JPG!"*.
2. **Bilibili-Style Danmaku Bullet Comments (`DanmakuComments.tsx`):**
   - 16 moving lanes of user comments flying across the screen with real-time peer pressure ("Auto-renewal is self-care", "Subscribed since 2019, zero regrets!", "Bro don't do it, the reverse akinator broke my friend's soul").
   - Implemented with `pointer-events-none` so visual chaos never breaks click targets.
3. **Roaming Mascot Guilt Banners with Web Speech Synthesis (`RoamingAnimalBanner.tsx`):**
   - Corporate animal mascots (*Charles the Penguin*, *Barnaby the Hamster*) slowly march across the screen every 15 seconds, complete with real browser audio voice synthesis pleading for retention.
4. **Dynamic Brand Identity Crisis / Font Shuffling:**
   - The application dynamically cycles its primary typography every 10–20 seconds (Comic Sans, Papyrus, Monospace, Impact, Serif) to induce maximum cognitive fatigue.
5. **Web Audio API Synthesizer:**
   - 100% client-side synthesized sound effects (sirens, strike buzzers, confetti fanfares, boss music cues) with zero external audio assets.

---

## Judge / Developer Shortcuts
- **Instant Stage Navigation:** Need to jump directly between stages during evaluation? Press `Ctrl + Shift + \` or look for the discreet developer indicator in the footer to fast-forward through the gauntlet.

---

## Deployment & Local Setup

### Vercel Deployment (Instant 1-Click)
This project is configured with a zero-config [`vercel.json`](./vercel.json) and standard SPA rewrites:
- **Build Command:** `npm run build` (or `node scripts/build.js`)
- **Output Directory:** `dist`
- **Install Command:** `npm install`

### Local Development
```bash
# 1. Install dependencies
npm install

# 2. Build production assets
npm run build

# 3. Start local server
npm run dev
# Opens at http://localhost:5173
```

---

## Tech Stack
- **Framework:** React 18, TypeScript, Tailwind CSS
- **Bundler:** esbuild (instant 200ms sub-second bundling)
- **Icons:** Lucide React
- **Animations & FX:** Canvas-Confetti, Web Audio API Sound Synthesizer, Web Speech Synthesis
- **AI Simulation Engine:** Client-side semantic heuristic intent evaluation engine

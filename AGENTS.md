# AGENTS.md — Mission Brief & Operating Directives

> **Project:** Keytos Hack Mini-Challenge #1 — **"Worst Cancel Screen Ever"**  
> **Target:** Win 1st ($500) or 2nd ($250) prize by engineering the most hostile, confusing, and creative cancellation UX flow ever devised.  
> **Deadline:** 9:00 PM ET

---

## 🎯 High-Level Objective
Every agent working on this codebase must focus on delivering an interactive web application that embodies the worst possible subscription cancellation experience. We are satirizing the predatory dark patterns found across modern SaaS, telecom, and subscription services, turning them into an entertaining, playable obstacle course.

---

## ⚖️ Non-Negotiable Challenge Constraints

| Rule | Requirement | Agent Verification |
| :--- | :--- | :--- |
| **1. Must Be Possible to Cancel** | **Hostile, NOT broken.** A determined user who pays extreme attention must be able to reach the final cancellation screen. | Never implement an impossible dead-end or disabled button with no exit trigger. Always maintain a deterministic, solvable path. |
| **2. Fake Everything** | Zero real accounts, emails, payments, or third-party tracking. | All account state, subscription tiers, and payment data must be fictional and local to the client. |
| **3. Keep It PG & Friendly** | Delightfully evil and annoying, never toxic, hateful, or abusive. | Use humor, absurd bureaucracy, and corporate double-speak. |
| **4. Submission Readiness** | Deadline is 9:00 PM ET. Deliver a deployable, polished demo. | Ensure zero runtime errors, instant startup, and mobile/desktop responsive design. |

---

## 🏆 Scoring Pillars & Design Directives

### 1. Most Confusing (Navigation & Semantics)
- **Inverted Affordances:** Primary CTA (bright green, large) renews or upgrades; true cancellation link is buried, unstyled, or disguised as legal disclaimers.
- **Double/Triple Negatives:**
  - *"Uncheck this box to decline not keeping your auto-renewal active."*
  - Buttons labeled *"Don't Keep"* that actually cancel the *cancellation*.
- **Shifting Steps & Circular Loops:** Progress bar reads *"Step 1 of 3"*, then advances to *"Step 2 of 14"*, and on error resets to *"Step 1 of 27"*.
- **Decoy Options:** Presenting a "Pause for $0" option that automatically switches to a 12-month billing lock-in.

### 2. Most Hostile (Psychological Friction & Confirmshaming)
- **Extreme Confirmshaming:**
  - *"Yes, I confirm I hate saving money and want my account permanently flagged as ungrateful."*
  - Displaying arbitrary metrics: *"You are about to throw away 4,920 unused Karma Coins and make our server hamsters cry."*
- **Artificial Scarcity & Countdown Stress:**
  - Urgent timers (`04:59... 04:58`) that flash red, trigger fake alert modals, or speed up when moving the cursor.
- **Micro-Aggressive Traps:**
  - Unchecking an upgrade option triggers a modal: *"Are you sure? We already prepared your perks!"*
  - Traps that reset progress if the mouse hovers outside a designated "cancellation corridor".

### 3. Most Creative (Novel Dark Patterns & Interaction Stunts)
- **Evasive Elements:** The cancel button drifts away or teleports when the cursor approaches, unless caught by holding a special key or timing a click.
- **Reverse CAPTCHA / Proof of Loyalty:** Require the user to solve a test (e.g., *"Select all images of people who look visibly heartbroken by your departure"* or *"Type the phrase: 'I acknowledge my regrettable mistake' with no typos in 10 seconds"*).
- **Physical Friction / Absurd Mechanics:**
  - *"Hold button down for precisely 6.5 to 7.0 seconds. Release too early or late and you start over."*
  - Tiny scrollboxes inside scrollboxes with low contrast text (`#8a8a8a` on `#808080`).
- **Support Chat Interruption:** A fake live agent bot ("Chad from Retention") pops up persistently, renegotiating prices down to \$0.01 and blocking clicks.

---

## 🏗️ Architecture & Development Standards

1. **Deterministic State Machine:**
   - Keep flow stages clearly typed (e.g., `OFFER_RETENTION`, `CONFIRMSHAME`, `CAPTCHA_MAZE`, `HOLD_BUTTON`, `REASON_SURVEY`, `FINAL_VERIFICATION`, `SUCCESS_CANCELLED`).
   - Include a hidden debug / judge shortcut (e.g. `Ctrl + Shift + \` or an accessible cheat code) so developers and judges can jump through steps if needed while testing.
2. **Audio & Visual Immersion:**
   - Visual touches: Health bar (Boss battle theme: "Boss: The Cancellation Screen"), screen shakes, fake popup browser warnings, confetti explosions when the user accidentally re-subscribes.
3. **Responsive & Fluid:**
   - Ensure layouts don't clip off-screen and work smoothly in standard modern browsers.
4. **Code Cleanliness:**
   - Modular components for each stage/trap.
   - Self-contained styles and zero external backend dependencies.

---

## 📋 Quick Reference: Challenge Info
- **Event:** Keytos Hack Mini-Challenge #1
- **File Summary:** See [CHALLENGE.md](file:///c:/Users/b1a7e/Desktop/Keytos%20Hackathon%20All/Keytos%20Challenge%20#1/CHALLENGE.md)
- **Top Goal:** Maximum laughs, maximum frustration, but 100% playable and cancellable!

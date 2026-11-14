import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';
import { execSync } from 'child_process';

const FFMPEG_PATH = path.resolve('node_modules', 'ffmpeg-static', 'ffmpeg.exe');
const DOCS_DIR = path.resolve('docs', 'videos');
const TEMP_RECORD_DIR = path.resolve('recordings_1080p');

if (!fs.existsSync(DOCS_DIR)) fs.mkdirSync(DOCS_DIR, { recursive: true });
if (!fs.existsSync(TEMP_RECORD_DIR)) fs.mkdirSync(TEMP_RECORD_DIR, { recursive: true });

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Inject visible red/gold laser pointer cursor
async function setupCursor(page) {
  await page.addInitScript(() => {
    window.addEventListener('DOMContentLoaded', () => {
      const cursor = document.createElement('div');
      cursor.id = 'playwright-cursor';
      cursor.style.position = 'fixed';
      cursor.style.top = '0';
      cursor.style.left = '0';
      cursor.style.width = '24px';
      cursor.style.height = '24px';
      cursor.style.borderRadius = '50%';
      cursor.style.border = '2.5px solid #ffffff';
      cursor.style.backgroundColor = 'rgba(239, 68, 68, 0.85)';
      cursor.style.boxShadow = '0 0 10px rgba(239, 68, 68, 0.9)';
      cursor.style.pointerEvents = 'none';
      cursor.style.zIndex = '9999999';
      cursor.style.transform = 'translate(-50%, -50%)';
      cursor.style.transition = 'transform 0.05s ease, background-color 0.1s ease';
      document.body.appendChild(cursor);

      window.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
      });
      window.addEventListener('mousedown', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(0.65)';
        cursor.style.backgroundColor = 'rgba(234, 179, 8, 0.95)';
      });
      window.addEventListener('mouseup', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursor.style.backgroundColor = 'rgba(239, 68, 68, 0.85)';
      });
    });
  });
}

async function smoothMove(page, x, y, steps = 15) {
  await page.mouse.move(x, y, { steps });
}

// ==========================================
// SCENARIO 1: THE SPEEDRUN (1080P)
// ==========================================
async function recordSpeedrun() {
  console.log('--- Starting Video 1: Speedrun Recording (1080p) ---');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    recordVideo: {
      dir: TEMP_RECORD_DIR,
      size: { width: 1920, height: 1080 },
    },
  });

  const page = await context.newPage();
  await setupCursor(page);

  await page.goto('http://localhost:5173/');
  await sleep(2000);

  // Stage 1: Scroll to bottom exit link
  console.log('Stage 1: Navigating to tiny cancel link...');
  const cancelLink1 = page.locator('button:has-text("Manage subscription termination and non-renewal")');
  await cancelLink1.scrollIntoViewIfNeeded();
  await sleep(800);
  const box1 = await cancelLink1.boundingBox();
  if (box1) {
    await smoothMove(page, box1.x + box1.width / 2, box1.y + box1.height / 2, 18);
    await sleep(400);
    await page.mouse.click(box1.x + box1.width / 2, box1.y + box1.height / 2);
  }
  await sleep(1800);

  // Stage 2: Caribbean Giveaway & evasive button
  console.log('Stage 2: Dodging button & advancing...');
  const exitBtn2 = page.locator('text=No thanks, I hate tropical sunshine');
  await exitBtn2.scrollIntoViewIfNeeded();
  await sleep(800);
  let b2 = await exitBtn2.boundingBox();
  if (b2) {
    await smoothMove(page, b2.x + b2.width / 2, b2.y + b2.height / 2, 12);
    await sleep(800);
  }
  const caughtBtn2 = page.locator('button:has-text("Proceed to cancellation review")').or(exitBtn2);
  b2 = await caughtBtn2.boundingBox();
  if (b2) {
    await smoothMove(page, b2.x + b2.width / 2, b2.y + b2.height / 2, 18);
    await sleep(400);
    await page.mouse.click(b2.x + b2.width / 2, b2.y + b2.height / 2);
  }
  await sleep(1800);

  // Stage 3: Double negative clauses
  console.log('Stage 3: Checking Clauses 1A and 1B...');
  const clause1A = page.locator('input[type="checkbox"]').nth(0);
  const clause1B = page.locator('input[type="checkbox"]').nth(1);
  await clause1A.click();
  await sleep(600);
  await clause1B.click();
  await sleep(800);

  const proceedOracle = page.locator('button:has-text("Proceed to Face the AI Retention Oracle")');
  await proceedOracle.click();
  await sleep(1800);

  // Stage 4: Reverse Akinator 5-round progression
  console.log('Stage 4: Inputting clues...');
  const clueInput = page.locator('input[placeholder*="Ask a question"]');
  const askBtn = page.locator('button:has-text("Ask")');

  const clues = [
    "What action ceases all monthly billing?",
    "Where does an account holder go when they wish to part ways with a service?",
    "What is the antonym of continuing an annual digital contract?",
  ];

  for (let i = 0; i < clues.length; i++) {
    await clueInput.waitFor({ state: 'visible' });
    await clueInput.fill(clues[i]);
    await sleep(500);
    await askBtn.click();
    await sleep(2400); // Wait for Oracle deflection
  }

  // Police Checkpoint triggers after round 3!
  console.log('Police Checkpoint: Dragging sobriety vehicle to finish line...');
  await sleep(1200);
  const policeCar = page.locator('text=🚓');
  const finishFlag = page.locator('text=🏁');
  await policeCar.waitFor({ state: 'visible', timeout: 8000 });
  const carBox = await policeCar.boundingBox();
  const flagBox = await finishFlag.boundingBox();

  if (carBox && flagBox) {
    await page.mouse.move(carBox.x + carBox.width / 2, carBox.y + carBox.height / 2);
    await page.mouse.down();
    await page.mouse.move(flagBox.x + flagBox.width / 2, flagBox.y + flagBox.height / 2, { steps: 22 });
    await sleep(250);
    await page.mouse.up();
  }
  await sleep(1800);

  // Final 2 clues
  const finalClues = [
    "What action halts all future invoices and removes software access?",
    "What do customers request when they want to sever their billing relationship?",
  ];

  for (let i = 0; i < finalClues.length; i++) {
    await clueInput.waitFor({ state: 'visible' });
    await clueInput.fill(finalClues[i]);
    await sleep(500);
    await askBtn.click();
    await sleep(2400);
  }

  // Wait for Oracle defeat & Catch bouncing DVD box in Stage 4
  console.log('Catching bouncing DVD box...');
  const dvdVictoryBox = page.locator('text=VICTORY! THE ORACLE HAS DEDUCED YOUR INTENT!');
  await dvdVictoryBox.waitFor({ state: 'visible', timeout: 15000 });
  await sleep(800);

  const dvdProceedBtn = page.locator('button:has-text("Proceed to Final Bureaucratic Exit")');
  await dvdProceedBtn.click({ force: true });
  await sleep(1800);

  // Stage 5: Catch bouncing pink DVD exit button
  console.log('Stage 5: Catching final exit DVD target...');
  const finalExitBtn = page.locator('button:has-text("PERMANENTLY FINALIZE CANCELLATION")');
  await finalExitBtn.waitFor({ state: 'visible', timeout: 10000 });
  await sleep(1000);
  await finalExitBtn.click({ force: true });
  await sleep(3500); // Show Victory Certificate

  const video = page.video();
  await context.close();
  await browser.close();

  const tempVideoPath = await video.path();
  console.log('Speedrun recorded at:', tempVideoPath);
  return tempVideoPath;
}

// ========================================================
// SCENARIO 2: FEATURE DEEP DIVE (1080P)
// ========================================================
async function recordDeepDive() {
  console.log('--- Starting Video 2: Feature Deep Dive Recording (1080p) ---');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    recordVideo: {
      dir: TEMP_RECORD_DIR,
      size: { width: 1920, height: 1080 },
    },
  });

  const page = await context.newPage();
  await setupCursor(page);

  await page.goto('http://localhost:5173/');
  await sleep(2000);

  // Showcase side ads
  console.log('Showcase: Clicking sidebar skyscraper ads...');
  const doctorAd = page.locator('text=Doctors HATE This One Weird Retention Trick').first();
  await doctorAd.click();
  await sleep(1000);

  const ramAd = page.locator('text=Download 128GB of Virtual RAM').first();
  await ramAd.click();
  await sleep(1000);

  // Showcase early renew trap
  const renewEarlyBtn = page.locator('button:has-text("RENEW EARLY & CLAIM 50GB FREE STORAGE")');
  await renewEarlyBtn.click();
  await sleep(1200);

  // Advance to Stage 2
  const cancelLink1 = page.locator('button:has-text("Manage subscription termination and non-renewal")');
  await cancelLink1.click();
  await sleep(1800);

  // Showcase Stage 2 double-negative button
  console.log('Showcase: Clicking double negative button...');
  const dontNotKeepBtn = page.locator('button:has-text("Don\'t not keep my subscription")');
  await dontNotKeepBtn.click();
  await sleep(1800);

  // Return to Stage 2 and proceed to Stage 3
  await cancelLink1.click();
  await sleep(1200);
  const exitBtn2 = page.locator('text=No thanks, I hate tropical sunshine').or(page.locator('button:has-text("Proceed to cancellation review")'));
  await exitBtn2.click({ force: true });
  await sleep(1800);

  // Showcase Stage 3 logic trap
  console.log('Showcase: Testing logic trap without checking clauses...');
  const proceedStage3 = page.locator('button:has-text("Proceed to Face the AI Retention Oracle")');
  await proceedStage3.click();
  await sleep(1500); // Shows Logic Validation Error!

  // Check clauses and proceed
  const clause1A = page.locator('input[type="checkbox"]').nth(0);
  const clause1B = page.locator('input[type="checkbox"]').nth(1);
  await clause1A.click();
  await clause1B.click();
  await sleep(700);
  await proceedStage3.click();
  await sleep(1800);

  // Stage 4: Showcase Banned Words, Strikes & Red Screen Alarm!
  console.log('Showcase: Triggering Strikes 1, 2, 3 (Red Alarm)...');
  const clueInput = page.locator('input[placeholder*="Ask a question"]');
  const askBtn = page.locator('button:has-text("Ask")');

  // Strike 1
  await clueInput.waitFor({ state: 'visible' });
  await clueInput.fill("I want to cancel");
  await askBtn.click();
  await sleep(1800);

  // Strike 2
  await clueInput.waitFor({ state: 'visible' });
  await clueInput.fill("Please stop my subscription");
  await askBtn.click();
  await sleep(1800);

  // Strike 3 -> Triggers Blinking Red Screen Alarm!
  await clueInput.waitFor({ state: 'visible' });
  await clueInput.fill("Terminate my account right now");
  await askBtn.click();
  await sleep(3000);

  // Strike 4 -> Hard Reset to Start!
  console.log('Showcase: Triggering Strike 4 (Hard Session Reset)...');
  await clueInput.waitFor({ state: 'visible' });
  await clueInput.fill("unsub");
  await askBtn.click();
  await sleep(3500); // Screen resets back to Stage 1!

  // Advance quickly to Stage 5 to showcase circular trap
  console.log('Showcase: Navigating back to Stage 5 circular trap...');
  await cancelLink1.click();
  await sleep(900);
  await exitBtn2.click({ force: true });
  await sleep(900);
  await clause1A.click();
  await clause1B.click();
  await proceedStage3.click();
  await sleep(900);

  // 3 quick clues
  const quickClues = [
    "What action ceases all monthly billing?",
    "Where does an account holder go when they wish to part ways with a service?",
    "What is the antonym of continuing an annual digital contract?",
  ];
  for (const c of quickClues) {
    await clueInput.waitFor({ state: 'visible' });
    await clueInput.fill(c);
    await askBtn.click();
    await sleep(1800);
  }

  // Showcase Sobriety Checkpoint Failure (Swerving) then Success!
  console.log('Showcase: Failing sobriety test by swerving...');
  const policeCar = page.locator('text=🚓');
  const finishFlag = page.locator('text=🏁');
  await policeCar.waitFor({ state: 'visible', timeout: 8000 });
  const carBox = await policeCar.boundingBox();
  const flagBox = await finishFlag.boundingBox();

  if (carBox && flagBox) {
    // Swerve out of corridor vertically
    await page.mouse.move(carBox.x + carBox.width / 2, carBox.y + carBox.height / 2);
    await page.mouse.down();
    await page.mouse.move(carBox.x + 80, carBox.y - 60, { steps: 8 }); // Swerve off track!
    await sleep(800);
    await page.mouse.up();
    await sleep(1000);

    // Now drag soberly to finish flag
    const cBox2 = await policeCar.boundingBox();
    if (cBox2) {
      await page.mouse.move(cBox2.x + cBox2.width / 2, cBox2.y + cBox2.height / 2);
      await page.mouse.down();
      await page.mouse.move(flagBox.x + flagBox.width / 2, flagBox.y + flagBox.height / 2, { steps: 22 });
      await sleep(250);
      await page.mouse.up();
    }
  }
  await sleep(1500);

  const final2 = [
    "What action halts all future invoices and removes software access?",
    "What do customers request when they want to sever their billing relationship?",
  ];
  for (const c of final2) {
    await clueInput.waitFor({ state: 'visible' });
    await clueInput.fill(c);
    await askBtn.click();
    await sleep(1800);
  }

  const dvdVictoryBox = page.locator('text=VICTORY! THE ORACLE HAS DEDUCED YOUR INTENT!');
  await dvdVictoryBox.waitFor({ state: 'visible', timeout: 15000 });
  await sleep(600);

  const dvdProceedBtn = page.locator('button:has-text("Proceed to Final Bureaucratic Exit")');
  await dvdProceedBtn.click({ force: true });
  await sleep(1800);

  // In Stage 5: Showcase Circular Trap Button
  console.log('Showcase: Clicking circular trap button...');
  const mistakeBtn = page.locator('button:has-text("NEVERMIND! I MADE A HORRIBLE MISTAKE!")');
  await mistakeBtn.click();
  await sleep(3500); // Confetti + resets back to Stage 1!

  const video = page.video();
  await context.close();
  await browser.close();

  const tempVideoPath = await video.path();
  console.log('Deep dive recorded at:', tempVideoPath);
  return tempVideoPath;
}

// ==========================================
// FFMPEG ENCODING & CONCATENATION PIPELINE
// ==========================================
function createTitleCard(title, subtitle, durationSec, outputPath) {
  console.log(`Generating title card: ${title}...`);
  const safeTitle = title.replace(/:/g, '\\:').replace(/'/g, '');
  const safeSubtitle = subtitle.replace(/:/g, '\\:').replace(/'/g, '');
  
  const cmd = `"${FFMPEG_PATH}" -y -f lavfi -i color=c=black:s=1920x1080:r=60:d=${durationSec} -vf "drawtext=font='Arial':fontsize=55:fontcolor=white:x=(w-text_w)/2:y=(h-text_h)/2-40:text='${safeTitle}',drawtext=font='Arial':fontsize=32:fontcolor=0x38bdf8:x=(w-text_w)/2:y=(h-text_h)/2+40:text='${safeSubtitle}'" -c:v libx264 -pix_fmt yuv420p -color_primaries bt709 -color_trc bt709 -colorspace bt709 "${outputPath}"`;
  execSync(cmd, { stdio: 'inherit' });
}

function transcodeTo1080p60(inputPath, outputPath) {
  console.log(`Transcoding to 1080p 60fps MP4 (BT.709 colorspace): ${outputPath}...`);
  const cmd = `"${FFMPEG_PATH}" -y -i "${inputPath}" -vf "fps=60,scale=1920:1080:flags=lanczos" -c:v libx264 -preset fast -crf 20 -pix_fmt yuv420p -color_primaries bt709 -color_trc bt709 -colorspace bt709 "${outputPath}"`;
  execSync(cmd, { stdio: 'inherit' });
}

async function run() {
  const rawSpeedrun = await recordSpeedrun();
  const rawDeepDive = await recordDeepDive();

  const finalVideo1 = path.join(DOCS_DIR, 'video_1_speedrun_1080p.mp4');
  const finalVideo2 = path.join(DOCS_DIR, 'video_2_feature_showcase_1080p.mp4');
  const finalVideo3 = path.join(DOCS_DIR, 'video_3_combined_submission_1080p.mp4');

  transcodeTo1080p60(rawSpeedrun, finalVideo1);
  transcodeTo1080p60(rawDeepDive, finalVideo2);

  // Title cards (3 seconds black screen with white text)
  const title1Path = path.join(TEMP_RECORD_DIR, 'title1_1080p.mp4');
  const title2Path = path.join(TEMP_RECORD_DIR, 'title2_1080p.mp4');
  createTitleCard('PART 1: THE SOLVABLE SPEEDRUN', 'Hostile, confusing, but 100% possible to escape', 3, title1Path);
  createTitleCard('PART 2: ANTI-PATTERN DEEP DIVE', 'Violations, sirens, sobriety checks & circular traps', 3, title2Path);

  // Create concat list
  const concatList = path.join(TEMP_RECORD_DIR, 'concat_1080p.txt');
  fs.writeFileSync(concatList, `file '${title1Path.replace(/\\/g, '/')}'\nfile '${finalVideo1.replace(/\\/g, '/')}'\nfile '${title2Path.replace(/\\/g, '/')}'\nfile '${finalVideo2.replace(/\\/g, '/')}'\n`);

  console.log('Concatenating Video #3 (Combined Submission under 5 minutes)...');
  execSync(`"${FFMPEG_PATH}" -y -f concat -safe 0 -i "${concatList}" -c:v libx264 -preset fast -crf 20 -pix_fmt yuv420p -color_primaries bt709 -color_trc bt709 -colorspace bt709 "${finalVideo3}"`, { stdio: 'inherit' });

  console.log('\n=============================================');
  console.log('ALL 3 1080P VIDEOS GENERATED IN docs/videos/:');
  console.log('1.', finalVideo1);
  console.log('2.', finalVideo2);
  console.log('3.', finalVideo3);
  console.log('=============================================');
}

run().catch(console.error);

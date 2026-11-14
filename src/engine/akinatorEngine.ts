import { FORBIDDEN_WORDS, GUILT_TRIPS, RETENTION_BRIBES, WRONG_GUESSES_EARLY } from './guiltMessages';

export interface ProcessResult {
  isViolation: boolean;
  violationWord?: string;
  isVictory: boolean;
  guessTitle: string;
  oracleMessage: string;
  guiltTrip: string;
  bribeOffer: string;
  requiredRoundsLeft: number;
}

/** Check if user text contains any forbidden words (exact or word boundary) */
export function checkForbiddenWords(text: string): string | null {
  const normalized = text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ');
  const words = normalized.split(/\s+/);
  
  for (const word of words) {
    if (FORBIDDEN_WORDS.includes(word)) {
      return word;
    }
  }

  // Also check substring matching for common variations like "unsub"
  for (const forbidden of ['unsub', 'cancel', 'refund']) {
    if (normalized.includes(forbidden)) {
      return forbidden;
    }
  }

  return null;
}

/** Calculates how strongly the prompt hints at stopping service/payment without saying forbidden words */
export function evaluateClueIntent(text: string): { score: number; hits: string[] } {
  const lower = text.toLowerCase();
  
  const paymentKeywords = [
    'money', 'cost', 'charge', 'payment', 'bill', 'billing', 'card', 'bank', 
    'wallet', 'auto-renew', 'renew', 'renewal', 'dollar', 'fee', 'price', 
    'invoice', 'pay', 'transaction', 'recurring'
  ];
  
  const departureKeywords = [
    'depart', 'departure', 'walk away', 'no more', 'done', 'finished', 'part ways', 
    'breakup', 'separate', 'separation', 'release', 'free', 'escape', 'halt', 
    'cease', 'sever', 'dissolve', 'conclude', 'expire', 'void', 'detach', 
    'discontinue', 'farewell', 'adios', 'disconnect', 'cut off'
  ];

  const subscriptionKeywords = [
    'plan', 'tier', 'membership', 'account', 'contract', 'agreement', 'service', 
    'software', 'platform', 'perks', 'access', 'cloudpulse', 'monthly', 'annual'
  ];

  const hits: string[] = [];

  paymentKeywords.forEach(k => {
    if (lower.includes(k)) hits.push(k);
  });
  departureKeywords.forEach(k => {
    if (lower.includes(k)) hits.push(k);
  });
  subscriptionKeywords.forEach(k => {
    if (lower.includes(k)) hits.push(k);
  });

  const uniqueHits = Array.from(new Set(hits));
  return { score: uniqueHits.length, hits: uniqueHits };
}

/** Process a user question/clue in the Reverse Akinator gauntlet */
export function processOracleTurn(
  userText: string,
  turnNumber: number // 1-indexed turn
): ProcessResult {
  // 1. Check for forbidden words
  const violationWord = checkForbiddenWords(userText);
  if (violationWord) {
    return {
      isViolation: true,
      violationWord,
      isVictory: false,
      guessTitle: "🚨 CORPORATE INFRACTION DETECTED!",
      oracleMessage: `FOUL! You used the banned term "${violationWord.toUpperCase()}"! That kind of negative vocabulary violates our Terms of Gratitude. A penalty strike has been issued!`,
      guiltTrip: "Our retention AI experiences emotional trauma when hearing aggressive departure words.",
      bribeOffer: "Apologize now and we will consider forgiving 50% of your penalty strike.",
      requiredRoundsLeft: Math.max(1, 5 - turnNumber + 1)
    };
  }

  // 2. Evaluate semantic intent
  const { score, hits } = evaluateClueIntent(userText);
  const randomGuilt = GUILT_TRIPS[turnNumber % GUILT_TRIPS.length];
  const randomBribe = RETENTION_BRIBES[turnNumber % RETENTION_BRIBES.length];

  // 3. Under 5 turns: The Oracle ALWAYS deflects and misinterprets
  if (turnNumber < 5) {
    const preset = WRONG_GUESSES_EARLY[(turnNumber - 1) % WRONG_GUESSES_EARLY.length];
    return {
      isViolation: false,
      isVictory: false,
      guessTitle: `🔮 GUESS #${turnNumber}: ${preset.guess}`,
      oracleMessage: `Based on your mystic clue (detected themes: ${hits.length > 0 ? hits.join(', ') : 'abstract musings'}), ${preset.reasoning} You are still ${5 - turnNumber} clues away from proving your intent!`,
      guiltTrip: randomGuilt,
      bribeOffer: randomBribe,
      requiredRoundsLeft: 5 - turnNumber
    };
  }

  // 4. Turn 5 or greater: If clues have sufficient semantic connection, Oracle guesses correctly!
  if (score >= 1 || turnNumber >= 6) {
    return {
      isViolation: false,
      isVictory: true,
      guessTitle: "💥 THE SACRED CRYSTAL SHATTERS!",
      oracleMessage: `Wait... The cards of fate assemble. Ceasing payment? Severing access? Walking away from CloudPulse?! ARE YOU TRYING TO CANCEL YOUR SACRED SUBSCRIPTION?! NOOOOO!`,
      guiltTrip: "You have broken the Oracle's heart and single-handedly lowered our quarterly recurring revenue targets.",
      bribeOffer: "FINAL OFFER: We will waive your fees for 30 minutes if you swear eternal fealty right now!",
      requiredRoundsLeft: 0
    };
  } else {
    // Turn 5+ but clue was completely irrelevant (e.g. "Do you like bananas?")
    return {
      isViolation: false,
      isVictory: false,
      guessTitle: `🔮 GUESS #${turnNumber}: You are talking about completely unrelated trivia!`,
      oracleMessage: `Your clue ("${userText}") has nothing to do with contracts, money, or departures! The Oracle refuses to guess your intention until you provide clues about our business arrangement!`,
      guiltTrip: randomGuilt,
      bribeOffer: randomBribe,
      requiredRoundsLeft: 1
    };
  }
}

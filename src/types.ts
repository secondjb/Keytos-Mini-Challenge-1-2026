export type Stage = 
  | 'DASHBOARD' 
  | 'CARIBBEAN_BRIBE' 
  | 'GUILT_TRIP' 
  | 'REVERSE_AKINATOR' 
  | 'FINAL_TRAP';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'oracle';
  text: string;
  guessTitle?: string;
  guiltTrip?: string;
  bribeOffer?: string;
  isViolation?: boolean;
  timestamp: string;
}

export interface UserStats {
  planName: string;
  price: string;
  pulseCoins: number;
  daysSubscribed: number;
  serverHamstersSaved: number;
  retentionAttendedRounds: number;
  strikes: number;
}

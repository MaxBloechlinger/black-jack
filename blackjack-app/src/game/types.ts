export type Suit = "♠" | "♥" | "♦" | "♣";

export type Value =
  | "A"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "J"
  | "Q"
  | "K";

export interface Card {
  suit: Suit;
  value: Value;
}

export interface GameState {
  deck: Card[];
  playerHand: Card[];
  dealerHand: Card[];
  playerStand: boolean;
  gameOver: boolean;
  result?: "win" | "lose" | "push";
  chips: number;
}

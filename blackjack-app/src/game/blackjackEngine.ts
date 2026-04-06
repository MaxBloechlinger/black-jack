import { GameState } from "./types";
import { createDeck } from "./deck";
import { calculateScore } from "./scoring";

export function startGame(): GameState {
  const deck = createDeck();

  return {
    deck,
    playerHand: [deck.pop()!, deck.pop()!],
    dealerHand: [deck.pop()!, deck.pop()!],
    playerStand: false,
    gameOver: false,
  };
}

export function playerHit(state: GameState): GameState {
  const deck = [...state.deck];
  const card = deck.pop()!;
  const playerHand = [...state.playerHand, card];

  if (calculateScore(playerHand) > 21) {
    return { ...state, deck, playerHand, gameOver: true, result: "lose" };
  }

  return { ...state, deck, playerHand };
}

export function playerStand(state: GameState): GameState {
  let dealerHand = [...state.dealerHand];
  const deck = [...state.deck];

  while (calculateScore(dealerHand) < 17) {
    dealerHand.push(deck.pop()!);
  }

  const playerScore = calculateScore(state.playerHand);
  const dealerScore = calculateScore(dealerHand);

  let result: "win" | "lose" | "push";

  if (dealerScore > 21 || playerScore > dealerScore) result = "win";
  else if (dealerScore > playerScore) result = "lose";
  else result = "push";

  return {
    ...state,
    dealerHand,
    deck,
    gameOver: true,
    result,
  };
}

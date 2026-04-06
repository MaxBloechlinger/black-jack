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
  if (state.gameOver) return state;

  const card = state.deck.pop()!;
  const newHand = [...state.playerHand, card];

  if (calculateScore(newHand) > 21) {
    return {
      ...state,
      playerHand: newHand,
      gameOver: true,
      result: "lose",
    };
  }

  return {
    ...state,
    playerHand: newHand,
  };
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
    playerStand: true,
    gameOver: true,
    result,
  };
}

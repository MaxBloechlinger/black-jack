import type { GameState } from "./types";
import { createDeck } from "./deck";
import { calculateScore } from "./scoring";

const BET = 10;

export function startGame(prevChips?: number): GameState {
  const deck = createDeck();

  return {
    deck,
    playerHand: [deck.pop()!, deck.pop()!],
    dealerHand: [deck.pop()!, deck.pop()!],
    playerStand: false,
    gameOver: false,
    chips: prevChips ?? 100,
    doubleDown: false,
  };
}

function isBlackjack(hand: any[]) {
  return hand.length === 2 && calculateScore(hand) === 21;
}

export function playerHit(state: GameState): GameState {
  if (state.doubleDown) return state;

  const deck = [...state.deck];
  const card = deck.pop()!;
  const playerHand = [...state.playerHand, card];

  if (calculateScore(playerHand) > 21) {
    return {
      ...state,
      deck,
      playerHand,
      gameOver: true,
      result: "lose",
      chips: state.chips - BET * (state.doubleDown ? 2 : 1),
    };
  }

  return { ...state, deck, playerHand };
}

export function playerDoubleDown(state: GameState): GameState {
  if (state.playerHand.length !== 2) return state;

  const deck = [...state.deck];
  const card = deck.pop()!;
  const playerHand = [...state.playerHand, card];

  // after double → forced stand
  return playerStand({
    ...state,
    deck,
    playerHand,
    doubleDown: true,
  });
}

export function playerStand(state: GameState): GameState {
  let dealerHand = [...state.dealerHand];
  const deck = [...state.deck];

  while (calculateScore(dealerHand) < 17) {
    dealerHand.push(deck.pop()!);
  }

  const playerScore = calculateScore(state.playerHand);
  const dealerScore = calculateScore(dealerHand);

  const betMultiplier = state.doubleDown ? 2 : 1;
  let chips = state.chips;
  let result: "win" | "lose" | "push";

  // blackjack payout
  if (isBlackjack(state.playerHand) && !isBlackjack(dealerHand)) {
    result = "win";
    chips += Math.floor(BET * 1.5);
  } else if (dealerScore > 21 || playerScore > dealerScore) {
    result = "win";
    chips += BET * betMultiplier;
  } else if (dealerScore > playerScore) {
    result = "lose";
    chips -= BET * betMultiplier;
  } else {
    result = "push";
  }

  return {
    ...state,
    dealerHand,
    deck,
    gameOver: true,
    result,
    chips,
  };
}

import { Card } from "./types";

export function calculateScore(hand: Card[]) {
  let total = 0;
  let aces = 0;

  for (const card of hand) {
    if (["J", "Q", "K"].includes(card.value)) total += 10;
    else if (card.value === "A") {
      total += 11;
      aces++;
    } else total += Number(card.value);
  }

  while (total > 21 && aces > 0) {
    total -= 10;
    aces--;
  }

  return total;
}

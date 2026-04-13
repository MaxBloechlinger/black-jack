import type { Card as CardType } from "../game/types";

interface Props {
  card: CardType;
  hidden?: boolean;
}

export default function Card({ card, hidden }: Props) {
  if (hidden) {
    return <img src="/cards/card_back.svg" className="card-img" />;
  }

  const suitMap = {
    "♠": "S",
    "♥": "H",
    "♦": "D",
    "♣": "C",
  };

  const filename = `${card.value}${suitMap[card.suit]}`;

  return (
    <img src={`/cards/${filename}.svg`} className="card-img" alt={filename} />
  );
}

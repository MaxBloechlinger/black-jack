import { Card as CardType } from "../game/types";

interface Props {
  card: CardType;
}

export default function Card({ card }: Props) {
  return (
    <div className="card">
      {card.value}
      {card.suit}
    </div>
  );
}

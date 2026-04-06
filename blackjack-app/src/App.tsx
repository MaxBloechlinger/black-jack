import { useState } from "react";
import { startGame, playerHit, playerStand } from "./game/blackjackEngine";
import Card from "./components/Card";

function App() {
  const [game, setGame] = useState(startGame());

  return (
    <div className="table">
      <h2>Dealer</h2>
      <div className="hand">
        {game.dealerHand.map((c, i) => (
          <Card key={i} card={c} />
        ))}
      </div>

      <h2>Player</h2>
      <div className="hand">
        {game.playerHand.map((c, i) => (
          <Card key={i} card={c} />
        ))}
      </div>

      {!game.gameOver && (
        <div className="controls">
          <button onClick={() => setGame(playerHit(game))}>Hit</button>
          <button onClick={() => setGame(playerStand(game))}>Stand</button>
        </div>
      )}

      {game.gameOver && (
        <div className="result">
          <h3>{game.result}</h3>
          <button onClick={() => setGame(startGame())}>New Game</button>
        </div>
      )}
    </div>
  );
}

export default App;

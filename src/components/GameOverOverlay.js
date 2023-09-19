import { useDispatch, useSelector } from "react-redux";
import { gameActions } from "../store";
import { useContext } from "react";
import { TimerContext } from "../App";

function GameOverOverlay(props) {
  const { resetCounter } = useContext(TimerContext);
  const dispatch = useDispatch();

  const { isWon: gameIsWon } = useSelector((state) => state.game.gameStatus);

  function restartGameHandler() {
    dispatch(gameActions.restart());
    resetCounter();
    props.onRestart();
  }

  return (
    <>
      <div className="game-over-backdrop">
        <div className="game-over-modal">
          {!gameIsWon && <div>Game over, you lose...</div>}
          {gameIsWon && <div>Game over, you win!</div>}
          <button onClick={restartGameHandler}>Restart!</button>
        </div>
      </div>
    </>
  );
}

export default GameOverOverlay;

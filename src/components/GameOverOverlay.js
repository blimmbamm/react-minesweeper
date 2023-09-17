import { useDispatch, useSelector } from "react-redux";
import { fieldsGridActions, timerActions } from "../store";


function GameOverOverlay(props) {
  const dispatch = useDispatch();
  
    const { isWon: gameIsWon } = useSelector(
    (state) => state.fieldsGrid.gameStatus
  );


  function restartGameHandler(){
    dispatch(fieldsGridActions.restart());
    dispatch(timerActions.resetSecondsPlayed());

    props.onRestart();
  }

  return (
    <>
      <div
        style={{
          zIndex: 1,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          position: "fixed",
          top: "0",
          left: "0",
        }}
      >
        <div
          style={{
            display: "flex",
            // position: "fixed",
            // marginTop: "5rem",
            // marginLeft: "auto",
            // marginRight: "auto",
            margin: "auto",
            width: "fit-content",
            zIndex: 2,
            backgroundColor: "green",
            padding: "5px",
            marginTop: "100px",
            gap: "1rem"
          }}
        >
          {!gameIsWon && <div>Game over, you lose...</div>}
          {gameIsWon && <div>Game over, you win!</div>}
          <button onClick={restartGameHandler}>Restart</button>
        </div>
      </div>
    </>
  );
}

export default GameOverOverlay;

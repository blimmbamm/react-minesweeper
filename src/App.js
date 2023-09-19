import { useSelector } from "react-redux";
import "./App.css";
import MinesweeperGrid from "./components/MinesweeperGrid";
import MenuBar from "./components/MenuBar";
import GameOverOverlay from "./components/GameOverOverlay";
import { createContext, useEffect, useState } from "react";

export const TimerContext = createContext({
  counter: 0,
  resetCounter: () => {},
});

function App() {
  const [counter, setCounter] = useState(0);
  const [readyForRestart, setReadyForRestart] = useState(false);

  const { isOver: gameIsOver, isRunning: gameIsRunning } = useSelector(
    (state) => state.game.gameStatus
  );

  // If game is over, wait until the other game over effects are finished before GameOverOverlay component is rendered:
  useEffect(() => {
    if (gameIsOver) {
      const timer = setTimeout(() => {
        setReadyForRestart(true);
      }, 5500);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [gameIsOver]);

  // Start and stop timer:
  useEffect(() => {
    // if gameIsRunning changes to true, start interval
    let timer;
    if (gameIsRunning) {
      console.log("Timer started");
      timer = setInterval(() => {
        setCounter((prevCounter) => prevCounter + 1);
      }, 1000);
    }

    // if gameIsRunning changes again (to false), clear interval first and then do nothing:
    return () => {
      clearInterval(timer);
    };
  }, [gameIsRunning]);

  function restartHandler() {
    setReadyForRestart(false);
  }


  return (
    <TimerContext.Provider
      value={{ counter: counter, resetCounter: () => setCounter(0) }}
    >
      <div className="App">
        <MenuBar />
        <MinesweeperGrid />
        {readyForRestart && <GameOverOverlay onRestart={restartHandler} />}
      </div>
    </TimerContext.Provider>
  );
}

export default App;

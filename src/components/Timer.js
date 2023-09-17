import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { timerActions } from "../store";

function Timer() {
    const dispatch = useDispatch();

  const { isRunning: gameIsRunning } = useSelector(
    (state) => state.fieldsGrid.gameStatus
  );
//   const [secondsPassed, setSecondsPassed] = useState(0);
  const secondsPlayed = useSelector(state => state.timer.secondsPlayed);

  const minutes = "0" + Math.floor(secondsPlayed / 60);
  const seconds = "0" + (secondsPlayed - 60 * minutes);

  const timePassedSinceStartingGame = `${minutes.substring(
    minutes.length - 2,
    minutes.length
  )}:${seconds.substring(seconds.length - 2, seconds.length)}`;

  useEffect(() => {
    console.log("Timer effect running");

    // if gameIsRunning changes to true, start interval
    let timer;
    if (gameIsRunning) {
    //   setSecondsPassed(0);
      console.log("Timer started");
      timer = setInterval(() => {
        // setSecondsPassed((prevSeconds) => prevSeconds + 1);
        dispatch(timerActions.increaseSecondsPlayed());
      }, 1000);
    }

    // if gameIsRunning changes again (to false), clear interval first and then do nothing:
    return () => {
      clearInterval(timer);
    //   setSecondsPassed(0);
    };
  }, [gameIsRunning, dispatch]);

  return <div>{timePassedSinceStartingGame}</div>;
}

export default Timer;

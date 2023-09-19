import { useContext} from "react";
import { TimerContext } from "../App";

function Timer() {

  const {counter} = useContext(TimerContext);
  
  const minutes = "0" + Math.floor(counter / 60);
  const seconds = "0" + (counter - 60 * minutes);

  const timePassedSinceStartingGame = `${minutes.substring(
    minutes.length - 2,
    minutes.length
  )}:${seconds.substring(seconds.length - 2, seconds.length)}`;
  
  return <div>{timePassedSinceStartingGame}</div>
}

export default Timer;

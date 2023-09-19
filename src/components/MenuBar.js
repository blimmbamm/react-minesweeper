import { useDispatch, useSelector } from "react-redux";
import flag from "../images/flag.png";
import { gameActions, uiActions } from "../store";
import gameConfigurations from "../config/gameConfig";
import Timer from "./Timer";
import { useContext } from "react";
import { TimerContext } from "../App";

const MenuBar = () => {
  const { resetCounter } = useContext(TimerContext);
  const dispatch = useDispatch();

  const { numberOfBombs, numberOfFlags } = useSelector(
    (state) => state.game
  );

  function changeGameLevelHandler(event) {
    dispatch(
      gameActions.initializeGrid({
        ...gameConfigurations[event.target.value],
        level: event.target.value,
      })
    );
    dispatch(uiActions.setActionsMenuVisible(false));
    resetCounter();
  }

  return (
    <div className="menu-bar">
      <select
        onChange={changeGameLevelHandler}
        defaultValue="medium"
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <div className="flex align-center">
        <img src={flag} alt="flag" />
        {numberOfBombs - numberOfFlags}
      </div>
      <Timer />
    </div>
  );
};

export default MenuBar;

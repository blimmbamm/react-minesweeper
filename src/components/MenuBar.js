import { useDispatch, useSelector } from "react-redux";
import flag from "../images/flag.png";
import { fieldsGridActions, timerActions } from "../store";
import gameConfigurations from "../config/gameConfig";
import Timer from "./Timer";

const MenuBar = () => {
  const dispatch = useDispatch();

  const { numberOfBombs, numberOfFlags } = useSelector(
    (state) => state.fieldsGrid
  );
  function changeGameLevelHandler(event) {
    dispatch(
      fieldsGridActions.initializeGrid({
        ...gameConfigurations[event.target.value],
        level: event.target.value,
      })
    );
    dispatch(timerActions.resetSecondsPlayed());
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "300px",
        margin: "auto",
        padding: "5px",
        boxSizing: "border-box",
        backgroundColor: "green",
      }}
    >
      <select
        style={{ margin: "5px" }}
        onChange={changeGameLevelHandler}
        defaultValue="medium"
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <div style={{ display: "flex" }}>
        <img src={flag} alt="flag" style={{ width: "30px" }} />
        <div>{numberOfBombs - numberOfFlags}</div>
      </div>
      <Timer />
    </div>
  );
};

export default MenuBar;

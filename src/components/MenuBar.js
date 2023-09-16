import { useDispatch, useSelector } from "react-redux";
import flag from "../images/flag.png";
import { useRef } from "react";
import { fieldsGridActions } from "../store";
import gameConfigurations from "../config/gameConfig";

const MenuBar = () => {
    const dispatch = useDispatch();

    const {numberOfBombs, numberOfFlags} = useSelector(state => state.fieldsGrid);
    // const numberOfBombs = useSelector(state => state.gameConfig.numberOfBombs);

    const gameLevelSelectionRef = useRef();

    function changeGameLevelHandler() {
        dispatch(fieldsGridActions.initializeGrid({...gameConfigurations[gameLevelSelectionRef.current.value], level: gameLevelSelectionRef.current.value}));
        // dispatch(gameConfigActions.setLevel(gameLevelSelectionRef.current.value));
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
      <select style={{ margin: "5px" }} ref={gameLevelSelectionRef} onChange={changeGameLevelHandler} defaultValue="medium">
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <div style={{display: "flex"}}>
        <img src={flag} alt="flag" style={{ width: "30px" }} />
        <div>{numberOfBombs - numberOfFlags}</div>
      </div>
      <div>00:00</div>
    </div>
  );
};

export default MenuBar;

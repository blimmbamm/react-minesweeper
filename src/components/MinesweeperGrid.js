import MinesweeperField from "./MinesweeperField";
import { flattenGrid } from "../util/grid-helpers";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fieldsGridActions } from "../store";

const MinesweeperGrid = () => {

  const dispatch = useDispatch();
  const fieldsGrid = useSelector((state) => state.fieldsGrid.fieldsGrid);

  const flattenedFieldsGrid = flattenGrid(fieldsGrid);

  const [gameWon, setGameWon] = useState(false);

  // Todo: Limit number of possible flags to amount of bombs


  useEffect(() => {
    for (let i = 0; i < fieldsGrid.length; i++) {
      for (let j = 0; j < fieldsGrid[0].length; j++) {
        if(fieldsGrid[i][j].isBomb && !fieldsGrid[i][j].isFlaggedAsBomb) {
          return;
        }
      }
    }
    dispatch(fieldsGridActions.gameOver());    
    setTimeout(() => {
      setGameWon(true);
    }, 1000);
  });


  function restartGameHandler(){
    dispatch(fieldsGridActions.resetGame());
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${fieldsGrid.length}, 1fr)`,
        width: "fit-content",
        margin: "auto",
      }}
    >
      {flattenedFieldsGrid.map(({ x, y }, index) => (
        <MinesweeperField key={index} x={x} y={y} />
      ))}
      {gameWon && (
        <div style={{ backgroundColor: "whitesmoke", position: "fixed" }}>
          Congrats, You won the game!
          <button onClick={restartGameHandler}>Restart</button>
        </div>
      )}
    </div>
  );
};

export default MinesweeperGrid;

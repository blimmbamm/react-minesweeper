import MinesweeperField from "./MinesweeperField";
import { flattenGrid } from "../util/grid-helpers";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fieldsGridActions } from "../store";
import ActionsMenu from "./ActionsMenu";

const MinesweeperGrid = () => {
  const dispatch = useDispatch();
  const fieldsGrid = useSelector((state) => state.fieldsGrid.fieldsGrid);
  const { isOver: gameIsOver } = useSelector(
    (state) => state.fieldsGrid.gameStatus
  );

  const flattenedFieldsGrid = flattenGrid(fieldsGrid);

  const [actionsMenuVisible, setActionsMenuVisible] = useState(false);
  const [actionsMenuPosition, setActionsMenuPosition] = useState(null);
  const [actionsMenuFieldPosition, setActionsMenuFieldPosition] =
    useState(null);

  function openActionsMenuHandler(x, y, top, left) {
    setActionsMenuVisible(true);
    setActionsMenuPosition({ top, left });
    setActionsMenuFieldPosition({ x, y });
    dispatch(fieldsGridActions.setHighlighted({ x, y, isHighlighted: true }));
  }
  
  function resizeWindowHandler(){
    setActionsMenuVisible(false);    
  }

  function closeActionsMenuHandler() {
    setActionsMenuVisible(false);
  }

  function permuteIndices(n) {
    const indices = [...Array(n).keys()];
    let randomIndices = [];
    for (let i = 0; i < n; i++) {
      randomIndices.push(
        indices.splice(Math.floor(Math.random() * indices.length), 1)
      );
    }
    return randomIndices;
  }

  // console.log(permuteIndices(10));

  function applyFor2dArray(array, callback, randomly) {
    if (randomly) {
      for (const i of permuteIndices(array.length)) {
        for (const j of permuteIndices(array[0].length)) {
          callback(array[i][j]);
        }
      }
    } else {
      for (const nestedArray of array) {
        for (const arrayElement of nestedArray) {
          callback(arrayElement);
        }
      }
    }
  }

  useEffect(() => {
    let timeoutIncrement = 0;
   

    // for(const i of permuteIndices(fieldsGrid.length)) {
    //   for(const j of permuteIndices(fieldsGrid[0].length)) {
    //     // if game is over and bomb was not flagged or digged
    //     if(gameIsOver && fieldsGrid[i][j].isBomb && !fieldsGrid[i][j].isDigged && !fieldsGrid[i][j].isFlaggedAsBomb ) {
    //       setTimeout(() => {
    //         dispatch(fieldsGridActions.digSingleField({x: i, y: j}));
    //       }, 500+timeoutIncrement);
    //       timeoutIncrement+=1000;
    //     }
    //   }
    // }

    applyFor2dArray(fieldsGrid, (field) => {
      if (
        gameIsOver &&
        field.isBomb &&
        !field.isDigged &&
        !field.isFlaggedAsBomb
      ) {
        setTimeout(() => {
          dispatch(
            fieldsGridActions.digSingleField({ x: field.x, y: field.y })
          );
        }, 500 + timeoutIncrement);
        timeoutIncrement += 1000;
      }
    }, true);
  });

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
        <MinesweeperField
          key={index}
          x={x}
          y={y}
          onOpenActionsMenu={openActionsMenuHandler}
        />
      ))}

      {actionsMenuVisible && (
        <ActionsMenu
          position={actionsMenuPosition}
          onCloseActionsMenu={closeActionsMenuHandler}
          fieldPosition={actionsMenuFieldPosition}
          onResizeWindow={resizeWindowHandler}
        />
      )}

      {/* {gameWon && (
        <div style={{ backgroundColor: "whitesmoke", position: "fixed" }}>
          Congrats, You won the game!
          <button onClick={restartGameHandler}>Restart</button>
        </div>
      )} */}
    </div>
  );
};

export default MinesweeperGrid;

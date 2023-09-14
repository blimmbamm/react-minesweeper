import MinesweeperField from "./MinesweeperField";
import { flattenGrid } from "../util/grid-helpers";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fieldsGridActions } from "../store";
import ActionsMenu from "./ActionsMenu";

const MinesweeperGrid = () => {
  const dispatch = useDispatch();
  const fieldsGrid = useSelector((state) => state.fieldsGrid.fieldsGrid);
  const {isOver: gameIsOver} = useSelector(state => state.fieldsGrid.gameStatus);

  const flattenedFieldsGrid = flattenGrid(fieldsGrid);

  // const [gameWon, setGameWon] = useState(false);

  // Todo: Limit number of possible flags to amount of bombs

  // useEffect(() => {
  //   for (let i = 0; i < fieldsGrid.length; i++) {
  //     for (let j = 0; j < fieldsGrid[0].length; j++) {
  //       if (fieldsGrid[i][j].isBomb && !fieldsGrid[i][j].isFlaggedAsBomb) {
  //         return;
  //       }
  //     }
  //   }
  //   dispatch(fieldsGridActions.gameOver());
  //   setTimeout(() => {
  //     setGameWon(true);
  //   }, 1000);
  // });

  const [actionsMenuVisible, setActionsMenuVisible] = useState(false);
  const [actionsMenuPosition, setActionsMenuPosition] = useState(null);
  const [actionsMenuFieldPosition, setActionsMenuFieldPosition] = useState(null);

  function openActionsMenuHandler(x, y, top, left) {
    setActionsMenuVisible(true);    
    setActionsMenuPosition({ top, left });
    setActionsMenuFieldPosition({x, y});    
    dispatch(fieldsGridActions.setHighlighted({x, y, isHighlighted: true}));
  }

  function closeActionsMenuHandler() {
    setActionsMenuVisible(false);
  }

  // function restartGameHandler() {
  //   dispatch(fieldsGridActions.resetGame());
  // }

  function permuteIndices(n) {
    const indices = [...Array(n).keys()];
    let randomIndices = [];
    for(let i = 0; i < n; i++) {
      randomIndices.push(indices.splice(Math.floor(Math.random() * indices.length), 1));
    }
    return randomIndices;
  }
  
  // console.log(permuteIndices(10));


  
  useEffect(() => {
    let timeoutIncrement = 0;
    // for(let i = 0; i < fieldsGrid.length; i++) {
    //   for(let j = 0; j < fieldsGrid[0].length; j++) {
    //     // if game is over and bomb was not flagged or digged
    //     if(gameIsOver && fieldsGrid[i][j].isBomb && !fieldsGrid[i][j].isDigged && !fieldsGrid[i][j].isFlaggedAsBomb ) {
    //       setTimeout(() => {
    //         dispatch(fieldsGridActions.digSingleField({x: i, y: j}));
    //       }, 500+timeoutIncrement);
    //       timeoutIncrement+=1000;
    //     }
    //   }
    // }    
    console.log(fieldsGrid.length);

    for(const i of permuteIndices(fieldsGrid.length)) {
      for(const j of permuteIndices(fieldsGrid[0].length)) {
        // if game is over and bomb was not flagged or digged
        if(gameIsOver && fieldsGrid[i][j].isBomb && !fieldsGrid[i][j].isDigged && !fieldsGrid[i][j].isFlaggedAsBomb ) {
          setTimeout(() => {
            dispatch(fieldsGridActions.digSingleField({x: i, y: j}));
          }, 500+timeoutIncrement);
          timeoutIncrement+=1000;
        }
      }
    }   
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

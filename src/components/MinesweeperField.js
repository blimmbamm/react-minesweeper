import { useEffect, useRef, useState } from "react";
import './MinesweeperField.css';
import { useSelector, useDispatch } from "react-redux";
import { fieldsGridActions } from "../store";
// import shovel from "../images/shovel.png";
import flag from "../images/flag.png";
// import close from "../images/close.png";
import bomb from "../images/bomb.png";

const MinesweeperField = ({ x, y, onOpenActionsMenu }) => {
  const fieldRef = useRef();

  const dispatch = useDispatch();

  const {numberOfBombsInNeighborhood, isBomb, isDigged, isFlaggedAsBomb, isHighlighted} = useSelector(state => state.fieldsGrid.fieldsGrid[x][y]);

  // const fieldsGrid = useSelector((state) => state.fieldsGrid.fieldsGrid);

  // const numberOfBombsInNeighborhood =
  //   fieldsGrid[x][y].numberOfBombsInNeighborhood;
  // const isBomb = fieldsGrid[x][y].isBomb;
  // const isDigged = fieldsGrid[x][y].isDigged;
  // const isFlaggedAsBomb = fieldsGrid[x][y].isFlaggedAsBomb;
  const {isOver: gameIsOver} = useSelector((state) => state.fieldsGrid.gameStatus);
  
  let classNames;
  if (isHighlighted) {
    classNames = "field highlight";
  } else if (!isDigged) {
    classNames = `field ${(x + y) % 2 === 0 ? "dark-hidden" : "light-hidden"}`;
  } else {
    classNames = `field ${
      (x + y) % 2 === 0 ? "dark-cleared" : "light-cleared"
    }`;
  }

  const [falselyFlagged, setFalselyFlagged] = useState(false);

  if(falselyFlagged) {
    classNames = "field error";
  }


  // remove effect...
  // only trigger this effect if game is over and if field was falsely flagged or if field is bomb and is not flagged and was not digged by user
  useEffect(() => {
    // console.log("falsely flagged effect running...");
    if(gameIsOver && ((isFlaggedAsBomb && !isBomb) )) {
      setFalselyFlagged(true);      
      
      setTimeout(() => {
        // setFalselyFlagged(false);       
        if(((isFlaggedAsBomb && !isBomb) )){
        } 
        dispatch(fieldsGridActions.digSingleField({x, y}));
        dispatch(fieldsGridActions.setFlaggedAsbomb({x, y, isFlaggedAsBomb: false}));
      }, 1000);
    }


  }, [gameIsOver, isFlaggedAsBomb, isBomb, isDigged, dispatch, x, y]);

  



  const toggleFieldActionsHandler = (event) => {
    
    if(!isDigged && !gameIsOver ) {
      let fieldBoundingRect;
      if (event.target !== fieldRef.current) {
        fieldBoundingRect = event.target.parentElement.getBoundingClientRect();
      } else {
        fieldBoundingRect = event.target.getBoundingClientRect();
      }  
      
      onOpenActionsMenu(
        x, 
        y,
        fieldBoundingRect.top + 25,
        fieldBoundingRect.left - 11,
      );
    }
  };


  return (
    <>
      <div
        ref={fieldRef}
        className={classNames}
        onClick={toggleFieldActionsHandler}
        style={{
          userSelect: "none",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          fontWeight: "bold",
        }}
      >
        {isDigged && !isBomb && !isFlaggedAsBomb && (
          <div
            className={
              numberOfBombsInNeighborhood
                ? `text-color-${numberOfBombsInNeighborhood}`
                : ""
            }
          >
            {numberOfBombsInNeighborhood}
          </div>
        )}
        {isDigged && isBomb && !isFlaggedAsBomb && (
          <img src={bomb} alt="bomb" width="20px" height="20px" />
        )}
        {isFlaggedAsBomb && (
          <img src={flag} width="20px" height="20px" alt="flag" />
        )}
      </div>      
    </>
  );
};

export default MinesweeperField;

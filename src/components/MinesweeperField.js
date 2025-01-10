import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { gameActions } from "../store";
import flag from "../images/flag.png";
import bomb from "../images/bomb.png";
import { numberImages } from "../images/numbers";

const MinesweeperField = ({ x, y, onOpenActionsMenu }) => {
  const fieldRef = useRef();

  const dispatch = useDispatch();

  const {
    numberOfBombsInNeighborhood,
    isBomb,
    isDigged,
    isFlaggedAsBomb,
    isHighlighted,
    isFalselyFlagged,
  } = useSelector((state) => state.game.fieldsGrid[x][y]);

  const { isOver: gameIsOver } = useSelector((state) => state.game.gameStatus);

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

  if (isFalselyFlagged) {
    classNames = "field error";
  }

  // Two effects:
  useEffect(() => {
    // First effect: falsely as bomb flagged fields are hightlighted:
    if (gameIsOver && isFlaggedAsBomb && !isBomb) {
      dispatch(gameActions.setFalselyFlagged({ x, y }));

      setTimeout(() => {
        dispatch(gameActions.digSingleField({ x, y }));
        dispatch(
          gameActions.setFlaggedAsbomb({ x, y, isFlaggedAsBomb: false })
        );
      }, 1000);
    }

    // Second effect: Dig bomb if it was not flagged and game is over:
    if (gameIsOver && isBomb && !isDigged && !isFlaggedAsBomb) {
      const randomTimeout = 500 + Math.round(Math.random() * 4500);
      setTimeout(() => {
        dispatch(gameActions.digSingleField({ x, y }));
      }, randomTimeout);
    }
  }, [gameIsOver, isFlaggedAsBomb, isBomb, isDigged, dispatch, x, y]);

  const toggleFieldActionsHandler = (event) => {
    if (!isDigged && !gameIsOver) {
      let fieldBoundingRect;
      if (event.target !== fieldRef.current) {
        fieldBoundingRect = event.target.parentElement.getBoundingClientRect();
      } else {
        fieldBoundingRect = event.target.getBoundingClientRect();
      }

      onOpenActionsMenu(
        x,
        y,
        fieldBoundingRect.top + fieldBoundingRect.height * 0.75,
        fieldBoundingRect.left - 1.5 * fieldBoundingRect.width,
        fieldBoundingRect.width * 4
      );
    }
  };

  return (
    <>
      <div
        ref={fieldRef}
        className={classNames}
        onClick={toggleFieldActionsHandler}
      >
        {isDigged &&
          !isBomb &&
          !isFlaggedAsBomb &&
          numberOfBombsInNeighborhood && (
            <img
              src={numberImages[`number${numberOfBombsInNeighborhood}`]}
              alt="number of bombs"
            />
          )}
        {isDigged && isBomb && !isFlaggedAsBomb && (
          <img src={bomb} alt="bomb" />
        )}
        {isFlaggedAsBomb && <img src={flag} alt="flag" />}
      </div>
    </>
  );
};

export default MinesweeperField;

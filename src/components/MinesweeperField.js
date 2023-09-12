import { useEffect, useRef, useState } from "react";
import './MinesweeperField.css';
import { useSelector, useDispatch } from "react-redux";
import { fieldsGridActions } from "../store";
import shovel from "../images/shovel.png";
import flag from "../images/flag.png";
import close from "../images/close.png";
import bomb from "../images/bomb.png";

const MinesweeperField = ({ x, y }) => {
  const fieldRef = useRef();

  const dispatch = useDispatch();

  const fieldsGrid = useSelector((state) => state.fieldsGrid.fieldsGrid);

  const numberOfBombsInNeighborhood =
    fieldsGrid[x][y].numberOfBombsInNeighborhood;
  const isBomb = fieldsGrid[x][y].isBomb;
  const isDigged = fieldsGrid[x][y].isDigged;
  const isFlaggedAsBomb = fieldsGrid[x][y].isFlaggedAsBomb;
  const gameOver = useSelector((state) => state.fieldsGrid.gameOver);

  const actionsModalVisible = useSelector(
    (state) => state.fieldsGrid.fieldsGrid[x][y].actionsOverlayVisible
  );

  const [actionsModalPosition, setActionisModalPosition] = useState(null);

  let classNames;
  if (actionsModalVisible) {
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

  useEffect(() => {
    if(gameOver && isFlaggedAsBomb && !isBomb) {
      setFalselyFlagged(true);
      setTimeout(() => {
        setFalselyFlagged(false);
        dispatch(fieldsGridActions.digField({x, y}));
        dispatch(fieldsGridActions.toggleflaggedAsBomb({x, y}));
      }, 2000);
    }
    
  }, [gameOver, isFlaggedAsBomb, isBomb, dispatch, x, y]);

  const toggleFieldActionsHandler = (event) => {
    dispatch(fieldsGridActions.hideAllActionOverlays());
    dispatch(fieldsGridActions.showActionsOverlay({ x, y }));

    let fieldBoundingRect;
    if (event.target !== fieldRef.current) {
      fieldBoundingRect = event.target.parentElement.getBoundingClientRect();
    } else {
      fieldBoundingRect = event.target.getBoundingClientRect();
    }

    setActionisModalPosition({
      left: fieldBoundingRect.left - 11,
      top: fieldBoundingRect.top + 25,
    });
  };

  function closeActionsModal() {
    dispatch(fieldsGridActions.hideActionsOverlay({ x, y }));
  }

  function setFlaggedHandler() {
    dispatch(fieldsGridActions.toggleflaggedAsBomb({ x, y }));

    dispatch(fieldsGridActions.hideActionsOverlay({ x, y }));
  }

  function digFieldHandler() {
    if(isFlaggedAsBomb) {
      dispatch(fieldsGridActions.toggleflaggedAsBomb({x, y}));
    }
    dispatch(fieldsGridActions.digField({ x, y }));
    if (isBomb) {
      console.log("Game over");
      dispatch(fieldsGridActions.gameOver());
      dispatch(fieldsGridActions.digAllBombFields());
    }
    dispatch(fieldsGridActions.hideActionsOverlay({ x, y }));
  }

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

      {actionsModalVisible && (
        <>
          <div
            style={{
              position: "fixed",
              zIndex: 3,
              left: actionsModalPosition.left,
              top: actionsModalPosition.top,
              display: "flex",
              backgroundColor: "whitesmoke",
              borderRadius: "5px",
              padding: "2px",
              userSelect: "none",
            }}
          >
            <img
              src={shovel}
              onClick={digFieldHandler}
              width="16px"
              height="16px"
              alt="shovel"
            />
            <img
              src={flag}
              onClick={setFlaggedHandler}
              width="16px"
              height="16px"
              alt="flag"
            />
            <img
              src={close}
              onClick={closeActionsModal}
              width="16px"
              height="16px"
              alt="close"
            />
          </div>
        </>
      )}
    </>
  );
};

export default MinesweeperField;

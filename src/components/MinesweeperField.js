import { useEffect, useRef, useState } from "react";
import classes from "./MinesweeperField.module.css";
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

  const numberOfBombsInNeighborhood = fieldsGrid[x][y].numberOfBombsInNeighborhood;
  const isBomb = fieldsGrid[x][y].isBomb;
  const isDigged = fieldsGrid[x][y].isDigged;
  // const isCorrectlyDigged = fieldsGrid[x][y].isCorrectlyDigged;
  // const isWronglyDigged = fieldsGrid[x][y].isWronglyDigged;

  const actionsModalVisible = useSelector(
    (state) => state.fieldsGrid.fieldsGrid[x][y].actionsOverlayVisible
  );

  //   const [actionsModalVisible, setActionsModalVisible] = useState(false);
  const [actionsModalPosition, setActionisModalPosition] = useState(null);

  const [markedAsBomb, setMarkedAsBomb] = useState(false);

  // const [isWronglyDigged, setIsWronglyDigged] = useState(false);

  let classNames;
  if (actionsModalVisible) {
    classNames = classes.field + " " + classes.highlight;
  } else if (!isDigged) {
    classNames = `${classes.field} ${
      (x + y) % 2 === 0 ? classes["dark-hidden"] : classes["light-hidden"]
    }`;
  } else {
    classNames = `${classes.field} ${
      (x + y) % 2 === 0 ? classes["dark-cleared"] : classes["light-cleared"]
    }`;
  }

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
    setMarkedAsBomb((prevMarkedAsBomb) => !prevMarkedAsBomb);
    dispatch(fieldsGridActions.hideActionsOverlay({ x, y }));
  }

  function digFieldHandler() {
    dispatch(fieldsGridActions.digField({ x, y }));
    // if (isBomb) {
    //   console.log("start game over logic here");
    //   dispatch(fieldsGridActions.setFieldWronlgyDigged({x, y}));      
    // } else {
      
    //   dispatch(fieldsGridActions.digField({ x, y }));
    // }
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
        {(isDigged & !isBomb) && (
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
        {(isDigged & isBomb) && (
          <img
            src={bomb}
            alt="bomb"
            width="20px"
            height="20px"
          />
        )}
        {markedAsBomb && (
          <img
            src={flag}
            width="20px"
            height="20px"
            alt="flag"  
          />
        )}
        
      </div>




        {/* Actions menu */}

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

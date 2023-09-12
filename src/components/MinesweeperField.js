import { useEffect, useRef, useState } from "react";
import classes from "./MinesweeperField.module.css";
import { useSelector, useDispatch } from "react-redux";
import { fieldsGridActions } from "../store";
import shovel from "../images/shovel.png";
import flag from "../images/flag.png";
import close from "../images/close.png";

const MinesweeperField = ({
  x,
  y,
  isBomb,
  numberOfBombsInNeighborhood,
  onReveal,
}) => {
  const fieldRef = useRef();

  const dispatch = useDispatch();

  const fieldsGrid = useSelector((state) => state.fieldsGrid.fieldsGrid);

  const isRevealed = fieldsGrid[x][y].isRevealed;

  const actionsModalVisible = useSelector(
    (state) => state.fieldsGrid.fieldsGrid[x][y].actionsOverlayVisible
  );

  //   const [actionsModalVisible, setActionsModalVisible] = useState(false);
  const [actionsModalPosition, setActionisModalPosition] = useState(null);
  
  const [markedAsBomb, setMarkedAsBomb] = useState(false);

  let classNames;
  if (actionsModalVisible) {
    classNames = classes.field + " " + classes.highlight;
  } else if (!isRevealed) {
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
    if (isBomb) {
      console.log("start game over logic here");
    } else {
      dispatch(fieldsGridActions.revealField({ x, y }));
    }
    dispatch(fieldsGridActions.hideActionsOverlay({ x, y }));
  }

  return (
    <>
      <div
        ref={fieldRef}
        className={classNames}
        onClick={toggleFieldActionsHandler}
      >
        {isRevealed && numberOfBombsInNeighborhood}
        {markedAsBomb && (
          <img
            src={flag}
            width="20px"
            height="20px"
            style={{ marginLeft: "5px", marginTop: "5px" }}
          />
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
            ></img>
            <img
              src={flag}
              onClick={setFlaggedHandler}
              width="16px"
              height="16px"
            ></img>
            <img
              src={close}
              onClick={closeActionsModal}
              width="16px"
              height="16px"
            ></img>
          </div>
        </>
      )}
    </>
  );
};

export default MinesweeperField;

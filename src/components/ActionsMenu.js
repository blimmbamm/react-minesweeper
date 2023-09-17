import { useDispatch } from "react-redux";

import shovel from "../images/shovel.png";
import flag from "../images/flag.png";
import close from "../images/close.png";
import { fieldsGridActions } from "../store";

const ActionsMenu = ({fieldPosition, position, onCloseActionsMenu, onResizeWindow}) => {
  const dispatch = useDispatch();

  // // function digFieldAndNeighbors(fieldPosition){
  //   dispatch(fieldsGridActions.digField(fieldPosition));
  //   dispatch(fieldsGridActions.setFlaggedAsbomb({...fieldPosition, isFlaggedAsBomb: false}));
  // }

  function digFieldHandler(){
    dispatch(fieldsGridActions.setGameRunning());
    dispatch(fieldsGridActions.digFieldAndRemoveFlags(fieldPosition));
    dispatch(fieldsGridActions.updateNumberOfFlagsUsed());
    dispatch(fieldsGridActions.updateGameStatus());
    dispatch(fieldsGridActions.setHighlighted({...fieldPosition, isHighlighted: false}));
    onCloseActionsMenu();
  }

  function setFlaggedHandler(){
    dispatch(fieldsGridActions.setGameRunning());
    dispatch(fieldsGridActions.toggleFlaggedAsBomb(fieldPosition));
    dispatch(fieldsGridActions.updateNumberOfFlagsUsed());
    dispatch(fieldsGridActions.updateGameStatus());
    dispatch(fieldsGridActions.setHighlighted({...fieldPosition, isHighlighted: false}));
    onCloseActionsMenu();
  }

  function closeActionsMenuHandler(){
    dispatch(fieldsGridActions.setHighlighted({...fieldPosition, isHighlighted: false}));
    onCloseActionsMenu();
  }

  function resizeHandler(){
    onResizeWindow(fieldPosition);
    dispatch(fieldsGridActions.setHighlighted({...fieldPosition, isHighlighted: false}));
  }

  window.addEventListener("resize", resizeHandler);

    return <>
    <div
      style={{
        position: "fixed",
        zIndex: 3,
        left: position.left,
        top: position.top,
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
        onClick={closeActionsMenuHandler}
        width="16px"
        height="16px"
        alt="close"
      />
    </div>
  </>
};

export default ActionsMenu;
import { useDispatch } from "react-redux";

import shovel from "../images/shovel.png";
import flag from "../images/flag.png";
import close from "../images/close.png";
import { gameActions } from "../store";

const ActionsMenu = ({fieldPosition, position, onCloseActionsMenu, onResizeWindow}) => {

  const dispatch = useDispatch();

  function digFieldHandler(){
    dispatch(gameActions.setGameRunning());
    dispatch(gameActions.digFieldAndRemoveFlags(fieldPosition));
    dispatch(gameActions.updateNumberOfFlagsUsed());
    dispatch(gameActions.updateGameStatus());
    dispatch(gameActions.setHighlighted({...fieldPosition, isHighlighted: false}));
    onCloseActionsMenu();
  }

  function setFlaggedHandler(){
    dispatch(gameActions.setGameRunning());
    dispatch(gameActions.toggleFlaggedAsBomb(fieldPosition));
    dispatch(gameActions.updateNumberOfFlagsUsed());
    dispatch(gameActions.updateGameStatus());
    dispatch(gameActions.setHighlighted({...fieldPosition, isHighlighted: false}));
    onCloseActionsMenu();
  }

  function closeActionsMenuHandler(){
    dispatch(gameActions.setHighlighted({...fieldPosition, isHighlighted: false}));
    onCloseActionsMenu();
  }

  function resizeHandler(){
    onResizeWindow(fieldPosition);
    dispatch(gameActions.setHighlighted({...fieldPosition, isHighlighted: false}));
  }

  window.addEventListener("resize", resizeHandler);

  const imageSize = (position.width - 0.2 * position.width / 3)/3;

    return <>
    <div className="actions-menu" 
      style={{
        left: position.left,
        top: position.top,
        padding: 0.1 * position.width / 3,
        width: position.width,
      }}
    >
      <img
        src={shovel}
        onClick={digFieldHandler}
        width={imageSize}
        height={imageSize}
        alt="shovel"
      />
      <img
        src={flag}
        onClick={setFlaggedHandler}
        width={imageSize}
        height={imageSize}
        alt="flag"
      />
      <img
        src={close}
        onClick={closeActionsMenuHandler}
        width={imageSize}
        height={imageSize}
        alt="close"
      />
    </div>
  </>
};

export default ActionsMenu;
import MinesweeperField from "./MinesweeperField";
import { flattenGrid } from "../util/grid-helpers";

import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { gameActions, uiActions } from "../store";
import ActionsMenu from "./ActionsMenu";


const MinesweeperGrid = () => {
  const dispatch = useDispatch();
  const fieldsGrid = useSelector((state) => state.game.fieldsGrid);
  
  const flattenedFieldsGrid = flattenGrid(fieldsGrid);
  
  const actionsMenuVisible = useSelector(state => state.ui.actionsMenuVisible);
  const [actionsMenuPosition, setActionsMenuPosition] = useState(null);
  const [actionsMenuFieldPosition, setActionsMenuFieldPosition] =
    useState(null);

  function openActionsMenuHandler(x, y, top, left, width) {
    dispatch(uiActions.setActionsMenuVisible(true));
    setActionsMenuPosition({ top, left, width });
    setActionsMenuFieldPosition({ x, y });
    dispatch(gameActions.setHighlighted({ x, y, isHighlighted: true }));
  }
  
  function resizeWindowHandler(){
    dispatch(uiActions.setActionsMenuVisible(false));
  }

  function closeActionsMenuHandler() {
    dispatch(uiActions.setActionsMenuVisible(false));
  }
  
  return (
    <div className="minesweeper-grid"
      style={{
        gridTemplateColumns: `repeat(${fieldsGrid.length}, 1fr)`,
        
      }}
    >
      {flattenedFieldsGrid.map(({ x, y }, index) => (
        <MinesweeperField
          key={index}
          x={x}
          y={y}
          onOpenActionsMenu={openActionsMenuHandler}
          width={100 / fieldsGrid.length}
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
    </div>
  );
};

export default MinesweeperGrid;

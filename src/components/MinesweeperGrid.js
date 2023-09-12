import MinesweeperField from "./MinesweeperField";
import {generateGrid, flattenGrid, clearField}  from "../util/grid-helpers";

import { useSelector } from "react-redux";

const MinesweeperGrid = () => { 

    const fieldsGrid = useSelector((state) => state.fieldsGrid.fieldsGrid)
  
    // const fieldsGrid = generateGrid(5, 10);
    const flattenedFieldsGrid = flattenGrid(fieldsGrid);

    function clearFieldHandler(x, y) {
        clearField(fieldsGrid, x, y);
    }

  return (
    <div
      style={{
        // position: "relative",
        display: "grid",
        gridTemplateColumns: `repeat(${fieldsGrid.length}, 1fr)`,
        width: "fit-content",
        margin: "auto",
      }}
    >
      {/* {coordinates.map(({x, y}) => <p>x={x} y={y}</p>)} */}
      {flattenedFieldsGrid.map(({ x, y, isBomb, numberOfBombsInNeighborhood }, index) => (
        <MinesweeperField key={index} x={x} y={y} isBomb={isBomb} numberOfBombsInNeighborhood={numberOfBombsInNeighborhood} onReveal={clearFieldHandler}/>
      ))}


    </div>
  );
};

export default MinesweeperGrid;

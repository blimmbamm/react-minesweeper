import MinesweeperField from "./MinesweeperField";
import {flattenGrid}  from "../util/grid-helpers";

import { useSelector } from "react-redux";

const MinesweeperGrid = () => { 

    const fieldsGrid = useSelector((state) => state.fieldsGrid.fieldsGrid)
  
    // const fieldsGrid = generateGrid(5, 10);
    const flattenedFieldsGrid = flattenGrid(fieldsGrid);

    // function clearFieldHandler(x, y) {
    //     clearField(fieldsGrid, x, y);
    // }

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
      {flattenedFieldsGrid.map(({ x, y}, index) => (
        <MinesweeperField key={index} x={x} y={y}/>
      ))}


    </div>
  );
};

export default MinesweeperGrid;

function generateGrid(sizeX, sizeY) {
  // Create 2d array:
  let fieldsGrid = [];
  for (let i = 0; i < sizeX; i++) {
    fieldsGrid.push([]);
    for (let j = 0; j < sizeY; j++) {
      fieldsGrid[i].push({ x: i, y: j });
    }
  }

  // Sample bombs:
  const numberOfBombs = 7;
  const bombIndices = [];
  while (bombIndices.length < numberOfBombs) {
    const sampledX = Math.floor(Math.random() * sizeX);
    const sampledY = Math.floor(Math.random() * sizeY);

    // check if (x,y) already is bomb:
    if (!bombIndices.find(({ x, y }) => (x === sampledX) & (y === sampledY))) {
      bombIndices.push({ x: sampledX, y: sampledY });
    }
  }

  // Set isBomb property for each field
  for (let i = 0; i < bombIndices.length; i++) {
    fieldsGrid[bombIndices[i].x][bombIndices[i].y] = {
      ...fieldsGrid[bombIndices[i].x][bombIndices[i].y],
      isBomb: true,
    };
  }

  for (let i = 0; i < sizeX; i++) {
    for (let j = 0; j < sizeY; j++) {
      //   setFieldValue(i, j);
      fieldsGrid[i][j] = {
        ...fieldsGrid[i][j],
        numberOfBombsInNeighborhood: computeNumberOfBombsInNeighborhood(
          fieldsGrid,
          i,
          j
        ),
        isDigged: false,
        actionsOverlayVisible: false,
      };
    }
  }

  return fieldsGrid;
}

function computeNumberOfBombsInNeighborhood(fieldsGrid, x, y) {
  if (fieldsGrid[x][y].isBomb) {
    return null;
  }

  let numberOfBombsInNeighborhood = 0;
  for (const xCoordinate of [x - 1, x, x + 1]) {
    for (const yCoordinate of [y - 1, y, y + 1]) {
      if (
        !((xCoordinate === x) & (yCoordinate === y)) &
        (xCoordinate >= 0) &
        (xCoordinate < fieldsGrid.length) &
        (yCoordinate >= 0) &
        (yCoordinate < fieldsGrid[0].length)
      ) {
        // console.log("index pair " + String(xCoordinate) + ", " + String(yCoordinate) + " exists!");
        if (fieldsGrid[xCoordinate][yCoordinate].isBomb) {
          numberOfBombsInNeighborhood++;
        }
      }
    }
  }

  if (numberOfBombsInNeighborhood === 0) {
    return null;
  }
  return numberOfBombsInNeighborhood;
}

function flattenGrid(fieldsGrid) {
  let fieldsGridFlattened = [];
  for (let j = 0; j < fieldsGrid[0].length; j++) {
    for (let i = 0; i < fieldsGrid.length; i++) {
      fieldsGridFlattened.push(fieldsGrid[i][j]);
    }
  }
  return fieldsGridFlattened;
}

// function getNeighbors(fieldsGrid, x, y) {
//   let neighbors = [];
//   for (const xCoordinate of [x - 1, x, x + 1]) {
//     for (const yCoordinate of [y - 1, y, y + 1]) {
//       if (
//         !((xCoordinate === x) & (yCoordinate === y)) &
//         (xCoordinate >= 0) &
//         (xCoordinate < fieldsGrid.length) &
//         (yCoordinate >= 0) &
//         (yCoordinate < fieldsGrid[0].length)
//       ) {
//         neighbors.push({x: xCoordinate, y: yCoordinate});
//       }
//     }
//     return neighbors;
//   }
// }

function areNeighbors({ x, y }, { i, j }) {
  if ((Math.abs(x - i) <= 1) & (Math.abs(y - j) <= 1)) {
    return true;
  } else {
    return false;
  }
}

// function clearField(fieldsGrid, x, y) {
//   fieldsGrid[x][y].isRevealed = true;
//   console.log("x: " + String(x) + ", y: " + String(y) + " cleared");

//   if (fieldsGrid[x][y].isBomb) {
//     return console.log("game over");
//   } 
  
//   // Also clear neighbors if no bomb in neighborhood:
//   if (!fieldsGrid[x][y].numberOfBombsInNeighborhood) {
//     for (let i = 0; i < fieldsGrid.length; i++) {
//       for (let j = 0; j < fieldsGrid[0].length; j++) {
//         if (areNeighbors({ x, y }, { i, j }) & !fieldsGrid[i][j].isRevealed) {
//           clearField(fieldsGrid, i, j);
//         }
//       }
//     }    
//   }
// }

function digField(fieldsGrid, x, y) {
  fieldsGrid[x][y].isDigged = true;
  console.log("x: " + String(x) + ", y: " + String(y) + " cleared");

  // if (fieldsGrid[x][y].isBomb) {
  //   return console.log("game over");
  // } 
  
  // Also clear neighbors if no bomb in neighborhood:
  if (!fieldsGrid[x][y].numberOfBombsInNeighborhood) {
    for (let i = 0; i < fieldsGrid.length; i++) {
      for (let j = 0; j < fieldsGrid[0].length; j++) {
        if (areNeighbors({ x, y }, { i, j }) & !fieldsGrid[i][j].isDigged) {
          digField(fieldsGrid, i, j);
        }
      }
    }    
  }
}

export { generateGrid, flattenGrid, areNeighbors, digField };

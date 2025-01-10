function generateGrid(sizeX, sizeY) {
  // Create 2d array:
  let fieldsGrid = [];
  for (let i = 0; i < sizeX; i++) {
    fieldsGrid.push([]);
    for (let j = 0; j < sizeY; j++) {
      fieldsGrid[i].push({ x: i, y: j });
    }
  }

  return fieldsGrid;
}

function generateBombs(fieldsGrid, fieldPosition, sizeX, sizeY, numberOfBombs) {
  // mutate fieldsGrid, set all the properties etc.
  // Sample bombs randomly:
  const bombIndices = [];
  while (bombIndices.length < numberOfBombs) {
    const sampledX = Math.floor(Math.random() * sizeX);
    const sampledY = Math.floor(Math.random() * sizeY);

    // check if (x,y) already is bomb OR the digged field:
    const isAlreadyBomb = bombIndices.find(
      ({ x, y }) => (x === sampledX) & (y === sampledY)
    );
    const isSelectedInitialField =
      sampledX === fieldPosition.x && sampledY === fieldPosition.y;
    if (!isAlreadyBomb && !isSelectedInitialField) {
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
      fieldsGrid[i][j] = {
        ...fieldsGrid[i][j],
        numberOfBombsInNeighborhood: computeNumberOfBombsInNeighborhood(
          fieldsGrid,
          i,
          j
        ),
        isDigged: false,
        actionsOverlayVisible: false,
        isFlaggedAsBomb: false,
        isHighlighted: false,
        isFalselyFlagged: false,
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

function areNeighbors({ x, y }, { i, j }) {
  if ((Math.abs(x - i) <= 1) & (Math.abs(y - j) <= 1)) {
    return true;
  } else {
    return false;
  }
}

function digFieldAndRemoveFlagsRecursive(fieldsGrid, x, y) {
  fieldsGrid[x][y].isDigged = true;
  fieldsGrid[x][y].isFlaggedAsBomb = false;

  if (
    !fieldsGrid[x][y].numberOfBombsInNeighborhood & !fieldsGrid[x][y].isBomb
  ) {
    for (let i = 0; i < fieldsGrid.length; i++) {
      for (let j = 0; j < fieldsGrid[0].length; j++) {
        if (areNeighbors({ x, y }, { i, j }) & !fieldsGrid[i][j].isDigged) {
          digFieldAndRemoveFlagsRecursive(fieldsGrid, i, j);
        }
      }
    }
  }
}

function allBombsFlagged(fieldsGrid) {
  for (let i = 0; i < fieldsGrid.length; i++) {
    for (let j = 0; j < fieldsGrid[0].length; j++) {
      if (!fieldsGrid[i][j].isFlaggedAsBomb && fieldsGrid[i][j].isBomb) {
        return false;
      }
    }
  }
  return true;
}

function anyBombDigged(fieldsGrid) {
  for (let i = 0; i < fieldsGrid.length; i++) {
    for (let j = 0; j < fieldsGrid[0].length; j++) {
      if (fieldsGrid[i][j].isDigged && fieldsGrid[i][j].isBomb) {
        return true;
      }
    }
  }
  return false;
}

export {
  generateGrid,
  generateBombs,
  flattenGrid,
  areNeighbors,
  digFieldAndRemoveFlagsRecursive,
  allBombsFlagged,
  anyBombDigged,
};

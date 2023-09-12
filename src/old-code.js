//   let coordinatesArray = [];
//   for (let i = 0; i < gridSize; i++) {
//     for (let j = 0; j < gridSize; j++) {
//         coordinatesArray.push({ x: i, y: j, isBomb: false });
//     }
//   }

//   const numberOfBombs = 7;
//   const bombIndices = [];

//   let coordinatesIndices = coordinatesArray.map((_, index) => index);

//   for(let i = 0; i < numberOfBombs; i++) {
//     const randomIndex = Math.floor(Math.random() * coordinatesIndices.length);
//     bombIndices.push(coordinatesIndices.splice(randomIndex, 1)[0]);
//   }

//   for(let i = 0; i < bombIndices.length; i++) {
//     // const {x, y} = coordinatesArray[bombIndices[i]];
//     coordinatesArray[bombIndices[i]] = {...coordinatesArray[bombIndices[i]], isBomb: true};
//     // console.log(coordinatesArray[bombIndices[i]]);

//   }

// //   console.log(coordinatesArray[bombIndices[0]]);

// for each field: determine its actual value: either empty (no bomb and no bomb in neighborhood), bomb, or amount of bombs in neighborhood
//   function checkNeighborhood({x, y}) {
//     let numberOfBombsInNeighborhood = 0;
//     for(xCoordinate of [x-1, x, x+1]) {
//         for(yCoordinate of [y-1, y, y+1]) {
//             if(coordinatesArray)
//         }
//     }
//   }

// if field not itself, xCoord and yCoord not out of bounds

// either nested:
// if(!(xCoordinate === x & yCoordinate === y)) {
//   if (fields[xCoordinate]) {
//     if (fields[xCoordinate][yCoordinate]) {
//       console.log("index pair " + String(xCoordinate) + ", " + String(yCoordinate) + " exists!");

//     }
//   }
// }

// or in one expression:

import { createSlice, configureStore } from "@reduxjs/toolkit";

import {
  generateGrid,
  digFieldAndRemoveFlagsRecursive,
  anyBombDigged,
  allBombsFlagged
} from "../util/grid-helpers";


// const defaultGameConfig = {
//   sizeX: 10, 
//   sizeY: 10,
//   numberOfBombs: 10,
//   numberOfFlagsAllowed: 5,
// };

import gameConfigurations from "../config/gameConfig"

const initialFieldsGridState = {
  // fieldsGrid: generateGrid(gameConfigurations.default.sizeX, gameConfigurations.default.sizeY),
  level: "default",
  fieldsGrid: generateGrid(gameConfigurations.default.sizeX, gameConfigurations.default.sizeY, gameConfigurations.default.numberOfBombs, true),
  numberOfBombs: gameConfigurations.default.numberOfBombs,
  numberOfFlags: 0,
  gameStatus: { isOver: false, isWon: false },
  // gameOver: false,
  // gameWon: false,
};


const fieldsGridSlice = createSlice({
  initialState: initialFieldsGridState,
  name: "fieldsGrid",
  reducers: {
    initializeGrid(state, action) {
      state.level = action.payload.level;
      state.fieldsGrid = generateGrid(action.payload.sizeX, action.payload.sizeY, action.payload.numberOfBombs,true);
      state.numberOfBombs = action.payload.numberOfBombs;
      state.numberOfFlags = initialFieldsGridState.numberOfFlags;
      state.gameStatus = initialFieldsGridState.gameStatus;
    },
    restart(state){
      // state.level = state.level;
      state.fieldsGrid = generateGrid(gameConfigurations[state.level].sizeX, gameConfigurations[state.level].sizeY, gameConfigurations[state.level].numberOfBombs, true);
      state.numberOfBombs = gameConfigurations[state.level].numberOfBombs;
      state.numberOfFlags = initialFieldsGridState.numberOfFlags;
      state.gameStatus = initialFieldsGridState.gameStatus;
    },
    digSingleField(state, action) {
      state.fieldsGrid[action.payload.x][action.payload.y].isDigged = true;
    },
    digFieldAndRemoveFlags(state, action) {
      console.log("field digging triggered");
      digFieldAndRemoveFlagsRecursive(
        state.fieldsGrid,
        action.payload.x,
        action.payload.y
      );
    },
    digAllBombFields(state) {
      for (let i = 0; i < state.fieldsGrid.length; i++) {
        for (let j = 0; j < state.fieldsGrid[0].length; j++) {
          if (state.fieldsGrid[i][j].isBomb) {
            state.fieldsGrid[i][j].isDigged = true;
          }
        }
      }
    },
    toggleFlaggedAsBomb(state, action) {
      if (
        (!state.fieldsGrid[action.payload.x][action.payload.y]
          .isFlaggedAsBomb &&
          state.numberOfFlags < state.numberOfBombs) ||
        state.fieldsGrid[action.payload.x][action.payload.y].isFlaggedAsBomb
      ) {
        state.fieldsGrid[action.payload.x][action.payload.y].isFlaggedAsBomb =
          !state.fieldsGrid[action.payload.x][action.payload.y].isFlaggedAsBomb;
      }
    },
    updateNumberOfFlagsUsed(state) {
      let numberOfFlagsUsed = 0;
      for (let i = 0; i < state.fieldsGrid.length; i++) {
        for (let j = 0; j < state.fieldsGrid[0].length; j++) {
          if (state.fieldsGrid[i][j].isFlaggedAsBomb) {
            numberOfFlagsUsed++;
          }
        }
      }
      state.numberOfFlags = numberOfFlagsUsed;
    },
    setFlaggedAsbomb(state, action) {
      state.fieldsGrid[action.payload.x][action.payload.y].isFlaggedAsBomb =
        action.payload.isFlaggedAsBomb;
    },
    setHighlighted(state, action) {
      for (let i = 0; i < state.fieldsGrid.length; i++) {
        for (let j = 0; j < state.fieldsGrid[0].length; j++) {
          if (i === action.payload.x && j === action.payload.y) {
            state.fieldsGrid[i][j].isHighlighted = action.payload.isHighlighted;
          } else {
            state.fieldsGrid[i][j].isHighlighted = false;
          }
        }
      }
    },

    // game status reducuers:
    updateGameStatus(state) {
      const gameWon = allBombsFlagged(state.fieldsGrid);
      state.gameStatus = {
        isOver:
          anyBombDigged(state.fieldsGrid) || gameWon,
        isWon: gameWon,
      };
    },

  },
});

const store = configureStore({
  reducer: { fieldsGrid: fieldsGridSlice.reducer},
});

export default store;

export const fieldsGridActions = fieldsGridSlice.actions;


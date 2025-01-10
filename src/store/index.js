import { createSlice, configureStore } from "@reduxjs/toolkit";

import {
  generateGrid,
  generateBombs,
  digFieldAndRemoveFlagsRecursive,
  anyBombDigged,
  allBombsFlagged,
} from "../util/grid-helpers";

import gameConfigurations from "../config/gameConfig";

const initialGameState = {
  level: "default",
  fieldsGrid: generateGrid(
    gameConfigurations.default.sizeX,
    gameConfigurations.default.sizeY,
    // gameConfigurations.default.numberOfBombs
    // true // this was for disabling randomly generated bombs
  ),
  numberOfBombs: gameConfigurations.default.numberOfBombs,
  numberOfFlags: 0,
  gameStatus: { isRunning: false, isOver: false, isWon: false },
};

const gameSlice = createSlice({
  initialState: initialGameState,
  name: "game",
  reducers: {
    setGameRunning(state) {
      state.gameStatus.isRunning = true;
    },
    initializeGrid(state, action) {
      state.level = action.payload.level;
      state.fieldsGrid = generateGrid(
        action.payload.sizeX,
        action.payload.sizeY,
        // action.payload.numberOfBombs
        // true // this is some debugging artifact
      );
      state.numberOfBombs = action.payload.numberOfBombs;
      state.numberOfFlags = initialGameState.numberOfFlags;
      state.gameStatus = initialGameState.gameStatus;
    },
    initializeBombs(state, action) {
      state.fieldsGrid = generateBombs(
        state.fieldsGrid,
        action.payload,
        gameConfigurations[state.level].sizeX,
        gameConfigurations[state.level].sizeY,
        gameConfigurations[state.level].numberOfBombs
      );
    },
    restart(state) {
      state.fieldsGrid = generateGrid(
        gameConfigurations[state.level].sizeX,
        gameConfigurations[state.level].sizeY,
        // gameConfigurations[state.level].numberOfBombs
        // true
      );
      state.numberOfBombs = gameConfigurations[state.level].numberOfBombs;
      state.numberOfFlags = initialGameState.numberOfFlags;
      state.gameStatus = initialGameState.gameStatus;
    },
    digSingleField(state, action) {
      state.fieldsGrid[action.payload.x][action.payload.y].isDigged = true;
    },
    digFieldAndRemoveFlags(state, action) {
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
    setFalselyFlagged(state, action) {
      state.fieldsGrid[action.payload.x][
        action.payload.y
      ].isFalselyFlagged = true;
    },

    // game status reducuers:
    updateGameStatus(state) {
      const bombDigged = anyBombDigged(state.fieldsGrid);
      const gameWon = allBombsFlagged(state.fieldsGrid);
      state.gameStatus = {
        isOver: bombDigged || gameWon,
        isWon: gameWon,
        isRunning: !bombDigged && !gameWon,
      };
    },
  },
});

const uiSlice = createSlice({
  initialState: { actionsMenuVisible: false },
  name: "ui",
  reducers: {
    setActionsMenuVisible(state, action) {
      state.actionsMenuVisible = action.payload;
    },
  },
});

const store = configureStore({
  reducer: { game: gameSlice.reducer, ui: uiSlice.reducer },
});

export default store;

export const gameActions = gameSlice.actions;
export const uiActions = uiSlice.actions;

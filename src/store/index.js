import { createSlice, configureStore } from "@reduxjs/toolkit";

import {
  generateGrid,
  digFieldAndRemoveFlagsRecursive,
  anyBombDigged,
  allBombsFlagged
} from "../util/grid-helpers";


const config = {
  numberOfFlagsAllowed: 5,
};

const initialFieldsGridState = {
  fieldsGrid: generateGrid(5, 5, false),
  numberOfFlags: 0,
  gameStatus: { isOver: false, isWon: false },
  // gameOver: false,
  // gameWon: false,
};

const fieldsGridSlice = createSlice({
  initialState: initialFieldsGridState,
  name: "fieldsGrid",
  reducers: {
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
          state.numberOfFlags < config.numberOfFlagsAllowed) ||
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

    // gameOver(state) {
    //   state.gameOver = true;
    // },
    // setGameWon(state) {
    //   for (let i = 0; i < state.fieldsGrid.length; i++) {
    //     for (let j = 0; j < state.fieldsGrid[0].length; j++) {
    //       if (
    //         state.fieldsGrid[i][j].isBomb &&
    //         !state.fieldsGrid[i][j].isFlaggedAsBomb
    //       ) {
    //         state.gameWon = false;
    //       }
    //     }
    //   }
    //   state.gameWon = true;
    // },
    // resetGame(state) {
    //   console.log("reset triggered");
    //   state.fieldsGrid = generateGrid(5, 5);
    //   state.gameOver = false;
    //   state.gameWon = false;
    // },

    // // Actions menu reducers:
    // showActionsOverlay(state, action) {
    //   if (
    //     !state.fieldsGrid[action.payload.x][action.payload.y].isDigged &
    //     !state.gameOver
    //   ) {
    //     state.fieldsGrid[action.payload.x][
    //       action.payload.y
    //     ].actionsOverlayVisible = true;
    //   }
    // },
    // hideActionsOverlay(state, action) {
    //   state.fieldsGrid[action.payload.x][
    //     action.payload.y
    //   ].actionsOverlayVisible = false;
    // },
    // hideAllActionOverlays(state) {
    //   for (let i = 0; i < state.fieldsGrid.length; i++) {
    //     for (let j = 0; j < state.fieldsGrid[0].length; j++) {
    //       state.fieldsGrid[i][j].actionsOverlayVisible = false;
    //     }
    //   }
    // },
  },
});

const store = configureStore({
  reducer: { fieldsGrid: fieldsGridSlice.reducer },
});

export default store;

export const fieldsGridActions = fieldsGridSlice.actions;

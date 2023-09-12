import { createSlice, configureStore } from "@reduxjs/toolkit";

import { generateGrid, digField } from "../util/grid-helpers";

const initialFieldsGridState = {
  fieldsGrid: generateGrid(5, 5),
  gameOver: false,
  gameWon: false,
};

const fieldsGridSlice = createSlice({
  initialState: initialFieldsGridState,
  name: "fieldsGrid",
  reducers: {
    digField(state, action) {
      // Set field to digged:
      digField(state.fieldsGrid, action.payload.x, action.payload.y);
    },
    gameOver(state) {
      state.gameOver = true;
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
    toggleflaggedAsBomb(state, action) {
      state.fieldsGrid[action.payload.x][action.payload.y].isFlaggedAsBomb =
        !state.fieldsGrid[action.payload.x][action.payload.y].isFlaggedAsBomb;
    },
    showActionsOverlay(state, action) {
      if (
        !state.fieldsGrid[action.payload.x][action.payload.y].isDigged &
        !state.gameOver
      ) {
        state.fieldsGrid[action.payload.x][
          action.payload.y
        ].actionsOverlayVisible = true;
      }
    },
    hideActionsOverlay(state, action) {
      state.fieldsGrid[action.payload.x][
        action.payload.y
      ].actionsOverlayVisible = false;
    },
    hideAllActionOverlays(state) {
      for (let i = 0; i < state.fieldsGrid.length; i++) {
        for (let j = 0; j < state.fieldsGrid[0].length; j++) {
          state.fieldsGrid[i][j].actionsOverlayVisible = false;
        }
      }
    },
    setGameWon(state) {
      for (let i = 0; i < state.fieldsGrid.length; i++) {
        for (let j = 0; j < state.fieldsGrid[0].length; j++) {
          if (
            state.fieldsGrid[i][j].isBomb &&
            !state.fieldsGrid[i][j].isFlaggedAsBomb
          ) {
            state.gameWon = false;
          }
        }
      }
      state.gameWon = true;
    },
    resetGame(state) {
      console.log("reset triggered");
      state.fieldsGrid = generateGrid(5, 5);
      state.gameOver = false;
      state.gameWon = false;
    },
  },
});

const store = configureStore({
  reducer: { fieldsGrid: fieldsGridSlice.reducer },
});

export default store;

export const fieldsGridActions = fieldsGridSlice.actions;

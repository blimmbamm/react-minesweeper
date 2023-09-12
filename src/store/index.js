import { createSlice, configureStore } from "@reduxjs/toolkit";

import { generateGrid, areNeighbors, digField } from "../util/grid-helpers";

const initialFieldsGridState = { fieldsGrid: generateGrid(10, 10) };

const fieldsGridSlice = createSlice({
  initialState: initialFieldsGridState,
  name: "fieldsGrid",
  reducers: {
    // revealField(state, action) {
    //   clearField(state.fieldsGrid, action.payload.x, action.payload.y);
    //   // put clear field logic (= setting isRevealed = true) here
    //   // probably clearField must return updated fieldsGrid..
    // },
    digField(state, action) {
      // Set field to digged:
      digField(state.fieldsGrid, action.payload.x, action.payload.y);
      // console.log("digged field (x:" + action.payload.x + ", y:" + action.payload.y + ")" );
      // state.fieldsGrid[action.payload.x][action.payload.y].isDigged = true;

      // // If no bomb in neighborhood, then also dig all neighbors:
      // if (!state.fieldsGrid[action.payload.x][action.payload.y].numberOfBombsInNeighborhood) {
      //   for (let i = 0; i < state.fieldsGrid.length; i++) {
      //     for (let j = 0; j < state.fieldsGrid[0].length; j++) {
      //       if (areNeighbors({ x: action.payload.x, y: action.payload.y }, { i, j }) & !state.fieldsGrid[i][j].isDigged) {
      //         state.fieldsGrid[i][j].isDigged = true;
      //         // clearField(fieldsGrid, i, j);
      //       }
      //     }
      //   }    
      // }
    },
    showActionsOverlay(state, action) {
      if (!state.fieldsGrid[action.payload.x][action.payload.y].isDigged) {
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
  },
});

const store = configureStore({
  reducer: { fieldsGrid: fieldsGridSlice.reducer },
});

export default store;

export const fieldsGridActions = fieldsGridSlice.actions;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CheckersState, MemorizedChecker } from "../../types";

const initialState: CheckersState = {
  whiteCheckers: ["A1", "B1", "C1", "D1", "A2", "B2", "C2", "D2", "A3", "B3", "C3", "D3"],
  blackCheckers: ["H8", "G8", "F8", "E8", "H7", "G7", "F7", "E7", "H6", "G6", "F6", "E6"],
  memorizedChecker: null,
}

const generalSlice = createSlice({
  name: "checkers",
  initialState,
  reducers: {
    memorizeChecker(state, action: PayloadAction<MemorizedChecker | null>) {
      state.memorizedChecker = action.payload;
    },
    makeWhiteStep(state, action: PayloadAction<string[]>) {
      state.whiteCheckers = action.payload;
    },
    makeBlackStep(state, action: PayloadAction<string[]>) {
      state.blackCheckers = action.payload;
    }
  }
});

export const generalReducer = generalSlice.reducer;
export const generalActions = generalSlice.actions;
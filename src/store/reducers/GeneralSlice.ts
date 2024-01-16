import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  whiteCheckers: ["A1", "B1", "C1", "D1", "A2", "B2", "C2", "D2", "A3", "B3", "C3", "D3",],
  blackCheckers: ["H8", "G8", "F8", "E8", "H7", "G7", "F7", "E7", "H6", "G6", "F6", "E6",],
}

const generalSlice = createSlice({
  name: "checkers",
  initialState,
  reducers: {}
});

export const generalReducer = generalSlice.reducer;
export const generalActions = generalSlice.actions;
import { createSlice } from "@reduxjs/toolkit";

const helpToolSlice = createSlice({
  name: "helpTool",
  initialState: { page: "initial" },
  reducers: {
    checkHelpToolSlice: () => {
      alert("checking help-tool slice");
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
});

export const { checkHelpToolSlice, setPage } = helpToolSlice.actions;

export const selectHelpToolSlice = (state) => state.helpTool.page;

export default helpToolSlice.reducer;

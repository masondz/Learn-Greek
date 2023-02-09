import { createSlice } from "@reduxjs/toolkit";

const countSlice = createSlice({
  name: "count",
  initialState: { articles: 0 },
  reducers: {
    setArticleCount: (state, action) => {
      state.articles = action.payload;
    },
  },
});

export const { setArticleCount } = countSlice.actions;

export const selectArticleCount = (state) => state.count.articles;

export default countSlice.reducer;

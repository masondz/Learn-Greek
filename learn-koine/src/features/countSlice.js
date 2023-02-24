import { createSlice } from "@reduxjs/toolkit";

const countSlice = createSlice({
  name: "count",
  initialState: { targetWords: 0 , allTargetsFound: false, foundTargetWord: 0},
  reducers: {
    clearArticleCount: (state, action) => {
      state.targetWords = 0;
      state.foundTargetWord = 0;
      state.allTargetsFound = false;
    },
    setArticleCount: (state, action) => {
      state.targetWords = action.payload;
    },
    setAllArticlesFound: (state, action) => {
      state.allTargetsFound = action.payload
    },
    incrementFoundArticles: (state, action) => {
      state.foundTargetWord += 1;
      if(state.targetWords === state.foundTargetWord) {
        state.allTargetsFound = true;
      }
    },
  },
});

export const { clearArticleCount, setArticleCount, setAllArticlesFound, incrementFoundArticles } = countSlice.actions;

export const selectArticleCount = (state) => state.count.targetWords;

export const selectFoundArticles = state => state.count.foundTargetWord;

export const selectAllArticlesFound = state => state.count.allTargetsFound;

export default countSlice.reducer;

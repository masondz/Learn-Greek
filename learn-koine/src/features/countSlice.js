import { createSlice } from "@reduxjs/toolkit";

const countSlice = createSlice({
  name: "count",
  initialState: { articles: 0 , allArticlesFound: false, foundArticles: 0},
  reducers: {
    clearArticleCount: (state, action) => {
      state.articles = 0;
      state.foundArticles = 0;
      state.allArticlesFound = false;
    },
    setArticleCount: (state, action) => {
      state.articles = action.payload;
    },
    setAllArticlesFound: (state, action) => {
      state.allArticlesFound = action.payload
    },
    incrementFoundArticles: (state, action) => {
      state.foundArticles += 1;
      if(state.articles === state.foundArticles) {
        state.allArticlesFound = true;
      }
    },
  },
});

export const { clearArticleCount, setArticleCount, setAllArticlesFound, incrementFoundArticles } = countSlice.actions;

export const selectArticleCount = (state) => state.count.articles;

export const selectFoundArticles = state => state.count.foundArticles;

export const selectAllArticlesFound = state => state.count.allArticlesFound;

export default countSlice.reducer;

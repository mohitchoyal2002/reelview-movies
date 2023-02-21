import { configureStore } from "@reduxjs/toolkit";
import searchResultSlice from '../features/searchResultSlice'
import selectedMovie from "../features/selectedMovie";

export const store = configureStore({
  reducer: {
    searchResultSlice,
    selectedMovie
  },
});

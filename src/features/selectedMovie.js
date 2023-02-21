import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  movie: null
}

const selectedMovie = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    setMovie: (state, action)=>{
      state.movie = action.payload
    }
  }
});

export const {setMovie} = selectedMovie.actions

export const movieDetail = state=>state.selectedMovie.movie


export default selectedMovie.reducer
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  result: null
}

const searchResultSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setResult: (state, action)=>{
      state.result = action.payload
    }
  }
});

export const {setResult} = searchResultSlice.actions
export const result = (state)=>state.searchResultSlice.result

export default searchResultSlice.reducer
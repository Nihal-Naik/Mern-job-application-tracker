import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: false,
}

export const changeSlice = createSlice({
  name: 'change',
  initialState,
  reducers: {
    Changechange: (state) => {
      state.value = !state.value
    },
    
  },
})

// Action creators are generated for each case reducer function
export const { Changechange } = changeSlice.actions

export default changeSlice.reducer
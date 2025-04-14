import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: false,
}

export const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    Changesignup: (state) => {
      state.value = !state.value
    },
    
  },
})

// Action creators are generated for each case reducer function
export const { Changesignup } = signupSlice.actions

export default signupSlice.reducer
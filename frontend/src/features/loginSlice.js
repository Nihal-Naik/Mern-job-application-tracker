import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: false,
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    Changelogin: (state) => {
      state.value = !state.value
    },
    
  },
})

// Action creators are generated for each case reducer function
export const { Changelogin } = loginSlice.actions

export default loginSlice.reducer
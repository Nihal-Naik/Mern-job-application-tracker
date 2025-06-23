import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: false,
}

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    Changesidebar: (state) => {
      state.value = !state.value
    },
    
  },
})

// Action creators are generated for each case reducer function
export const { Changesidebar } = sidebarSlice.actions

export default sidebarSlice.reducer
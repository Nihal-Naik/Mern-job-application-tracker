import { configureStore } from '@reduxjs/toolkit'
import signupReducer from '../features/signupSlice'
import loginReducer from '../features/loginSlice'
import changeReducer from '../features/changeSlice'
import sidebarReducer from '../features/sidebarSlice'


export const store = configureStore({
  reducer: {
    signup:signupReducer,
    login:loginReducer,
    change:changeReducer,
    sidebar:sidebarReducer,
  },
})
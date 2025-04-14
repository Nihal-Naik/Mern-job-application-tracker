import { StrictMode } from 'react'
import ReactDom from 'react-dom/client'
import './index.css'
import { createBrowserRouter,redirect,RouterProvider} from 'react-router-dom'
import Home from './pages/home'
import Applied from './pages/applied'
import { store } from './app/store.js'
import { Provider } from 'react-redux'
import toast, { Toaster } from 'react-hot-toast'


const router=createBrowserRouter([
  {
    path:'/',
    element: <Home />
  },
  {
    path:'/applied',
    element: <Applied />,
  }
])

ReactDom.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      < RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)

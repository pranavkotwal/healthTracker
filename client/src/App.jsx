import { useState } from 'react'
import {Navigate, RouterProvider,createBrowserRouter} from 'react-router-dom'
import './App.css'
import Register from './pages/Register'
import Home from './pages/Home'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import { useCookies } from 'react-cookie'
import {checkAuthLoader} from '../util/auth'


const router = createBrowserRouter([
  {
    path:'/',
    element:<Home/>,
    // loader:checkAuthLoader
    

  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/signup',
    element:<Register/>
  },
  {
    path:'/dashboard',
    element:<Dashboard/>,
    loader:checkAuthLoader
  }
])

function App() {
  


  return (
    <>
      <div className="App">
        <RouterProvider router={router}/>
      </div>

    </>
  )
}

export default App

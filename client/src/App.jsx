import { useState } from 'react'
import {Navigate, RouterProvider,createBrowserRouter} from 'react-router-dom'
import './App.css'
import Register from './pages/Register'
import Home from './pages/Home'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import {checkAuthLoader} from '../util/auth'

import { ReportsContext } from './store/report-details'




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



  const [reports, setReports] = useState([]);

  const ReportProvider = ({ children }) => {
    return (
      <ReportsContext.Provider value={{ reports, setReports }}>
        {children}
      </ReportsContext.Provider>
    )
    }

  return (
    <>
    <ReportProvider>
      <div className="App">
        <RouterProvider router={router}/>
      </div>
      </ReportProvider>

    </>
  )
}

export default App;

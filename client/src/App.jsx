import { useState } from 'react'
import {Navigate, RouterProvider,createBrowserRouter} from 'react-router-dom'
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
      <div className='relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gray-50 py-6 sm:py-12'>
        <RouterProvider router={router}/>
      </div>
      </ReportProvider>

    </>
  )
}

export default App;

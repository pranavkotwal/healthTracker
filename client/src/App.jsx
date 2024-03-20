import { useState } from 'react'
import {Navigate, RouterProvider,createBrowserRouter} from 'react-router-dom'
import Register from './pages/Register'
import Home from './pages/Home'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import {checkAuthLoader} from '../util/auth'

import { ReportsContext } from './store/report-details'
import Root from './pages/Root'
import ErrorPage from './pages/ErrorPage'




const router = createBrowserRouter([
  {
    path:'/',
    element:<Root/>,
    errorElement:<ErrorPage/>,
    children:[
      {
        path:'/dashboard',
        element:<Dashboard/>,
        loader:checkAuthLoader
      },
      {
        path:'/',
        element:<Home/>,
        loader:checkAuthLoader 
      }

    ]
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/signup',
    element:<Register/>
  },
  
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
      <div className='w-screen h-screen flex justify-center items-center bg-slate-500' >
        <RouterProvider router={router}/>
      </div>
      </ReportProvider>

    </>
  )
}

export default App;

import React, { useContext, useState } from 'react';
import axios from 'axios';
import { ToastContainer,toast } from 'react-toastify';
import { ReportsContext } from '../store/report-details';


const ReportForm = () => {

    const {setReports} = useContext(ReportsContext)
    const [date,setDate] = useState(Date.now())
    const [reportData,setReportData] = useState({
        name:'',
        value:'',
        unit:''
    })

     const handleDate = (e) =>{
      setDate(e.target.value)
      
    }

    const handleChange = (e) => {
        const {name,value} = e.target
        setReportData({
            ...reportData,
            [name]:value
        })
    }
    const handleError = (err) =>{
        toast.error(err,{
            position:'bottom-left'
        })
    }
    const handleSuccess = (msg) =>{
        toast.success(msg,{
            position:"top-right"
        })
    }
     
    const cancelhandler = (e) =>{
       setReportData({
                name:'',
                value:'',
                unit:''
            })

    }


    const handleSubmit = async (e) =>{
        try {
            e.preventDefault();
            const response = await axios.post('http://localhost:3000/v1/user/new-report',{reports:reportData,date},{withCredentials:true})

            const {success,message} = response.data
            setReportData({
                name:'',
                value:'',
                unit:''
            })

            if(success){
                handleSuccess(message)

                // update report context after successful submission

                setReports(prevReports => [...prevReports,reportData])
            }
        } catch (error) {
                handleError(error)
            
        }
    }
   

    return (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
  <form className="relative py-3 sm:max-w-xl sm:mx-auto" onSubmit={handleSubmit}>
    <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
      <div className="max-w-md mx-auto">
        <div className="flex items-center space-x-5">
          <div className="h-14 w-14 bg-yellow-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono">i</div>
          <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
            <h2 className="leading-relaxed">Submit a Report</h2>
            <p className="text-sm text-gray-500 font-normal leading-relaxed">Track your reports</p>
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
            <div className="flex flex-col">
              <label className="leading-loose">Report Name</label>
              <input type="text" name="name" value ={reportData.name} onChange={handleChange} className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Cholestrol ,Blood Sugar etc..." />
            </div>
            <div className="flex flex-col">
              <label className="leading-loose">Report Value</label>
              <input type="text" name="value" value ={reportData.value} onChange={handleChange}  className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="value" />
            </div>
            <div className="flex flex-col">
              <label className="leading-loose">Report Unit</label>
              <input type="text" name="unit" value ={reportData.unit} onChange={handleChange}  className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="unit" />
            </div>
            <div className="flex items-center w-[400px]">
              <div className="flex flex-col">
                <label className="leading-loose">Date</label>
                <div className="relative focus-within:text-gray-600 text-gray-400">
                  <input type="date" value={date} onChange={handleDate} name="date" className="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="25/02/2020" />
                  <div class="absolute left-3 top-2">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  </div>
                </div>
              </div>
              
            </div>
        
          </div>
          <div className="pt-4 flex items-center space-x-4">
              <button onClick={cancelhandler} className="flex justify-center items-center w-full text-gray-900 px-4 py-3 rounded-md focus:outline-none">
                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg> Cancel
              </button>
              <button type="submit" className="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none">Create</button>
          </div>
        </div>
      </div>
    </div>
  </form>
  <ToastContainer/>
</div>
       
    );
}

export default ReportForm;



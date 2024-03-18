import React, { useContext, useState } from 'react';
import axios from 'axios';
import { ToastContainer,toast } from 'react-toastify';
import { ReportsContext } from '../store/report-details';


const ReportForm = () => {

    const {setReports} = useContext(ReportsContext)
    const [reportData,setReportData] = useState({
        name:'',
        value:'',
        unit:''
    })

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

    const handleSubmit = async (e) =>{
        try {
            e.preventDefault();
            const response = await axios.post('http://localhost:3000/v1/user/new-report',{reports:reportData},{withCredentials:true})

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
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name='name' placeholder='test name' value={reportData.name} onChange={handleChange}/>
                <input type="text" name='value' placeholder='value' value={reportData.value} onChange={handleChange}/>
                <input type="text" name='unit' placeholder='unit' value={reportData.unit} onChange={handleChange}/>
                <button type="submit">Submit report</button>
            </form>
            <ToastContainer/>
            
        </div>
    );
}

export default ReportForm;

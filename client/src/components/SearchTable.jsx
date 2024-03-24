import React,{useState,useContext} from 'react';
import axios from 'axios';
import plus from '../assets/plus-solid.svg'
import { ReportsContext } from '../store/report-details';
import ReportsList from './ReportsList';


const SearchTable = () => {
    const currentDate = new Date().toISOString().split('T')[0];
    
    const {setReports} = useContext(ReportsContext)
    const [date,setDate] = useState(currentDate)
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

    // handle submission of date

    const handleSubmit = async (e) =>{
        try{
            e.preventDefault();
            const response = await axios.post('http://localhost:3000/v1/user/new-report',{reports:reportData,date},{withCredentials:true})
            


            setReportData({
                name:'',
                value:'',
                unit:''
            })

            setReports(prevReports => [...prevReports,reportData])

        }catch(err){
            console.log(err)

        }
    }



    return (
            <>

            <div className="overflow-x-auto bg-slate-200">
        <table className="w-full border-collapse border border-gray-300">
            <thead>
                <tr className="bg-gray-200">
                    <th className="border-y border-gray-100 bg-gray-50/50 p-2">Date</th>
                    <th className="border-y border-gray-100 bg-gray-50/50 p-2">Test Name</th>
                    <th className="border-y border-gray-100 bg-gray-50/50 p-2">Value</th>
                    <th className="border-y border-gray-100 bg-gray-50/50 p-2">Unit</th>
                    <th className="border-y border-gray-100 bg-gray-50/50 p-2">Add Report</th>
                </tr>
            </thead>
            <tbody id="attendees-list">

                <tr >
                    <td className="border border-gray-300 px-4 py-2 text-center">
                        <input type="date" value={date} onChange={handleDate} className='p-2 rounded border'/>
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                        <input onChange={handleChange} type="text" value={reportData.name} name='name' className='p-2 rounded border'/>
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                        <input onChange={handleChange} type="text" value={reportData.value} name='value' className='p-2 rounded border'/>
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                        <input onChange={handleChange} type="text" value={reportData.unit} name='unit' className='p-2 rounded border'/>
                    </td>
                    <td onClick={handleSubmit} className="border border-gray-300 px-4 py-2 flex justify-center ">
                        <img src={plus} className='h-[40px]' alt="" />
                    </td>
                </tr>
                    <ReportsList/>

            </tbody>
        </table>
        </div>

            
            </>
    );
}

export default SearchTable;

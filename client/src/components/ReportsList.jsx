import React, { useEffect, useState,useContext } from 'react';
import axios from 'axios';
import { ReportsContext } from '../store/report-details';
import trash from '../assets/trash-solid.svg'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const ReportsList = () => {
    const [reportsByDate, setReportsByDate] = useState([]);
    const {reports} = useContext(ReportsContext)
    const navigate = useNavigate()

    useEffect(()=>{
        const getReports = async ()=>{

                try{
                    const response = await axios.get('http://localhost:3000/v1/user/get-reports',{withCredentials:true})
                
                    const reportsData = response.data;
                    const reportsByDateMap = {}

                    // organize reports by date

                    reportsData.forEach(report=>{
                        const date = new Date(report.date).toLocaleDateString();

                        if(!reportsByDateMap[date]){
                            reportsByDateMap[date]=[]
                        }
                        reportsByDateMap[date].push(report)

                    })
                     // Convert map to array
                    const reportsByDateArray = Object.entries(reportsByDateMap).map(([date, reports]) => ({
                        date,
                        reports,
                    }))

                    setReportsByDate(reportsByDateArray)


                }catch{
                     console.error('Error fetching reports:', error);

                }
            
        }
        getReports(reportsByDate)
       

    },[reports])
    
    const handleRowClick=(row)=>{
      navigate(`${row}`)

    }

    


    console.log('reportsByDate',reportsByDate)
    console.log('reports',reports)
    return (
    <>
      {reportsByDate.map(({ date, reports }) => (
              reports.map(report => (
                report.reports.map(({ _id, name, value, unit }) => (

                  <tr key={_id} onClick={()=>handleRowClick(name)} className='hover:bg-red-400 hover:scale-102 cursor-pointer'  >
                    
                    <td className="border border-gray-300 px-4 py-2 text-center">{date}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">{name}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">{value}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">{unit}</td>
                    <td className="border border-gray-300 px-4 py-2 flex justify-center ">
                      <img src={trash} className='h-[30px]' alt="" />
                    </td>
                  </tr>


                ))
              ))
            
      ))}
    </>
  );

}

export default ReportsList;

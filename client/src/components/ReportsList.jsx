import React, { useEffect, useState,useContext } from 'react';
import axios from 'axios';
import { ReportsContext } from '../store/report-details';

const ReportsList = () => {
    const [reportsByDate, setReportsByDate] = useState([]);
    const {reports} = useContext(ReportsContext)

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

    console.log('reportsByDate',reportsByDate)
    console.log('reports',reports)
    return (
    <div>
      {reportsByDate.map(({ date, reports }) => (
        <div key={date} className="relative overflow-x-auto shadow-md sm:rounded-lg">
          {/* <h2>{date}</h2> */}
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Date</th>
                <th scope="col" className="px-6 py-3">Report Name</th>
                <th scope="col" className="px-6 py-3">Value</th>
                <th scope="col" className="px-6 py-3">Unit</th>
              </tr>
            </thead>
            <tbody>
              {reports.map(report => (
                report.reports.map(({ _id, name, value, unit }) => (
                  <tr key={_id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">

                    <td className='py-3 px-6 text-slate-400'>{date}</td>
                    <td className='py-3 px-6 text-stone-400'>{name}</td>
                    <td className='py-3 px-6 text-stone-400'>{value}</td>
                    <td className='py-3 px-6 text-stone-400'>{unit}</td>
                  </tr>
                ))
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );

}

export default ReportsList;

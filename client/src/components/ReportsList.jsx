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
        <div key={date}>
          <h2>{date}</h2>
          <table>
            <thead>
              <tr>
                <th>Report Name</th>
                <th>Value</th>
                <th>Unit</th>
              </tr>
            </thead>
            <tbody>
              {reports.map(report => (
                report.reports.map(({ _id, name, value, unit }) => (
                  <tr key={_id}>

                    <td>{name}</td>
                    <td>{value}</td>
                    <td>{unit}</td>
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

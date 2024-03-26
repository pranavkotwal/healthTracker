import React, { useEffect, useState,useContext } from 'react';
import axios from 'axios';
import { ReportsContext } from '../store/report-details';
import trash from '../assets/trash-solid.svg'
import right from '../assets/right-long-solid.svg'
import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';
const ReportsList = () => {
    const [reportsData, setReportsData] = useState([]);
    const {reports} = useContext(ReportsContext)
    const navigate = useNavigate()


    function mergeOuterId(reportsByDateArray, reportsByDateMap) {
        for (let i = 0; i < reportsByDateArray.length; i++) {
            const reportsArray = reportsByDateArray[i].reports;
            const reportsMap = reportsByDateMap[reportsByDateArray[i].date];
            for (let j = 0; j < reportsArray.length; j++) {
                reportsArray[j]._id = reportsMap[j]._id;
            }
        }
    }

    useEffect(()=>{
        const getReports = async ()=>{

                try{
                    const response = await axios.get('http://localhost:3000/v1/user/get-reports',{withCredentials:true})
                
                    const reportsData = response.data;
                    console.log("initial response,",reportsData)
                  

                

                    setReportsData(reportsData)

                }catch{
                     console.error('Error fetching reports:', error);

                }
            
        }
        getReports()
       

    },[reports])


    
    
    const handleRowClick=(row)=>{
      navigate(`${row}`)

    }
    const handleDeleteRow = async (_id) => {

      console.log(_id)
    try {
    
      const response = await axios.delete(`http://localhost:3000/v1/user/delete/${_id}`,{withCredentials:true});
      
      
       if (response.status === 200) {
      console.log('deleted');

      // Update state based on the previous state
      setReportsData(prevReportsData => {
       
      
        const updatedReportsData = prevReportsData.filter((el) => el._id !==_id)
         

        return updatedReportsData;
      });
    } else {
      console.error('Failed to delete row');
    }

         
    } catch (error) {
      console.error('Error deleting row:', error);
    }
  };




    


   
    return (
    <>
    {/* onClick={()=>handleRowClick(name)}  */}
      {reportsData.map(({_id, date, reports }) => (
              reports.map(report => (
                
                  <tr key={report._id} className='hover:bg-slate-400 hover:scale-102 cursor-pointer'  >
                    
                    <td className="border border-gray-300 px-4 py-2 text-center">{new Date(date).toISOString().split('T')[0]}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">{report.name}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">{report.value}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">{report.unit}</td>
                    <td className=" px-4 py-2 flex justify-center ">
                      <img src={trash} className='h-[30px]' alt="" onClick={() => handleDeleteRow(_id)}/>
                    </td>
                    <td className="border border-gray-300 px-4 py-2 ">
                      <Link  to={`${report.name}`} className='flex gap-4'>View Chart <img  src={right} className='h-[25px]'/>   </Link>
                    </td>
                    
                  </tr>
                  


              
              ))
            
      ))}
    </>
  );

}

export default ReportsList;

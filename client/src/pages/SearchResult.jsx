import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Chart from '../components/Chart';



const SearchResult = () => {
    
    const paramss = useParams()
    const [data,setData] = useState([])
    
    useEffect(()=>{

        async function dataFetcher(){
            const response = await axios.get('http://localhost:3000/v1/user/search',{
                params:{
                    reportType: paramss.reportType
                },
                 withCredentials: true
            })

            console.log('fetched with params:',response.data)

            setData(response.data)
        }
        dataFetcher()
    },[])

    return (

        <div className='flex  justify-center mt-4 gap-10'>
            <div class="overflow-x-auto sm:mx-0.5 lg:mx-0.5 border-solid border-4 pb-4" >
                <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                    <div class="overflow-hidden">
                    <table className='min-w-full'>
                        <thead class="bg-white border-b">
                            <tr>
                                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                    Date
                                </th>
                                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                    name
                                </th>
                                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                    value
                                </th>   
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((result,index)=>(
                            <tr key={index} className="bg-white border-b">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {new Date(result.date).toISOString().split("T")[0]}
                                </td>
                                {result.reports.map((report)=>(
                                    <>
                                    <td  className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    {report.name}
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    {report.value}
                                    </td>
                                    </>
                                
                                ))}
                                </tr>
                    ))}
                        </tbody>         
                    </table>
                    </div>
                </div>
            </div>

            <div className='border-solid border-4 p-6'>
                <Chart data={data}/> 
            </div>
        </div>
        
    );
}

export default SearchResult;


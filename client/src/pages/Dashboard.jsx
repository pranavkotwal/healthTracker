import React, { useEffect } from 'react';
import ReportForm from '../components/ReportForm';
import { Cookies,useCookies } from 'react-cookie';


const Dashboard = () => {
    const [cookies] = useCookies(["token"])
    useEffect(()=>{

    })

    return (
        <div>
            
            <ReportForm/>
        </div>
    );
}

export default Dashboard;

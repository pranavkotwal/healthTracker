import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../layout/Navbar';

const Root = () => {
    return (
       <>
       <Navbar/>
       <main className=' h-screen'>
            <Outlet/>
        </main>
       </>
    );
}

export default Root;

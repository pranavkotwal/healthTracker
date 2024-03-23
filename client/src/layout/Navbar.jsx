import React, { useState } from 'react';
import { Form, NavLink } from 'react-router-dom';

const Navbar = () => {
    const [isNavOpen,setIsNavOpen] = useState(false)
    return (
        <header className='bg-slate-500'>
            <nav className='bg-slate-500 flex justify-between w-[92%] mx-auto py-2'>
                <div>
                    <img className='w-16' src="https://wallpapers.com/images/hd/red-heartbeat-lineon-black-background-nk6myikan2rfb5wy.png" alt=".." />
                </div>
                <div className='md:static md:min-h-fit absolute bg-slate-500 md:w-auto min-h-[60vh] left-0 top-[-100%] w-full flex items-center px-5'>
                    <ul className='flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8'>
                        <li className='hover:text-white'>
                            <NavLink to="/" className={({isActive})=> (isActive?'text-white':'bg-inherit')}>Home</NavLink>
                        </li>
                        <li className='hover:text-white hover:underline'>
                            <NavLink to="/dashboard" className={({isActive})=> (isActive?'text-white':'bg-inherit')}>Dashboard</NavLink>
                        </li>
                    </ul>
                </div>
                <div>
                    <Form action='/logout' method='post' >
                            <button className='bg-[#a6c1ee] text-white px-5 py-2 rounded-full hover:bg-[#87acec]' >Logout</button>
                    </Form>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;

{/* <ul className='flex flex-row gap-10 '>
                <li className='hover:bg-green-400 hover:uppercase active:bg-black basis-1/2'>Logo</li>
                <li className='hover:bg-green-400 hover:uppercase basis-1/4'> <NavLink to="/"
                className={({isActive})=> (isActive?'text-white':'bg-inherit')}
                >Home</NavLink></li>
                <li className='hover:bg-green-400 hover:uppercase basis-1/4'><NavLink to="/dashboard"
                className={({isActive})=> (isActive?'text-white':'bg-inherit')}
                >Dashboard</NavLink></li>
                <li className='basis-1/8 hover:bg-red-400'>
                    <Form action='/logout' method='post' >
                        <button className='hover:uppercase' >Logout</button>
                    </Form>
                </li>
</ul> */}
import React, { useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer,toast } from 'react-toastify';
import Cookies from 'js-cookie';
const Register = () => {
    const navigate = useNavigate()

    // redirect if already logged in
    useEffect(()=>{
        const token = Cookies.get('token')

        if(token){
            navigate('/')
        }
    },[navigate])

    const [formData,setFormData] = useState({
        name:'',
        email:'',
        password:''
    })

  

    const handleChange = (e) =>{
        const {name,value} = e.target
        setFormData({
            ...formData,
            [name]:value
        })
    }

     const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });

    const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-right",
    });

    const handleSubmit = async (e) =>{
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/v1/auth/register',formData,{withCredentials:true})

            setFormData({ 
            name: '',
            email: '',
            password: ''

        })     
       

        const { success, message } = response.data;

        if(success){
            handleSuccess(message);
            setTimeout(()=>{
                navigate("/login")
            },1000)
        }else{
            handleError(message)
        }
            

        } catch (error) {
            
            console.error(error)
            
        }
    }





    return (

    <section className='grid place-content-center h-[100vh]'>
        <div className="w-[370px] h-[500px] md:w-[400px] md:h-[503px]  lg:w-[500px] lg:h-[540px] lg:pt-10  xl:p-6 p-6 xl:pt-10   bg-white border border-gray-200 rounded-lg shadow  md:p-8 dark:bg-gray-800  dark:border-gray-700">
            <form onSubmit={handleSubmit} className="space-y-6">
                <h5 className="text-xl font-medium text-gray-900 dark:text-white">Sign up</h5>
                <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                    <input type="name" name="name" value={formData.name} onChange={handleChange} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name" required />
                </div>
                <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                    <input type="email" name="email" value={formData.password} onChange={handleChange} id="password" placeholder="you@email.com" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                </div>
                <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                </div>
                
                <button type="submit"  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none  focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</button>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                    Already registered? <Link to="/login" className="text-blue-700 hover:underline dark:text-blue-500">Login</Link>
                </div>
            </form>
        <ToastContainer/>


        </div>
        </section>
    );
}

export default Register;

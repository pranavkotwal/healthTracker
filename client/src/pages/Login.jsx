import React, { useEffect, useState } from 'react';
import { Link , redirect, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'
import Cookies from 'js-cookie';

const Login = () => {


   

    const navigate = useNavigate()

    useEffect(()=>{
        const token = Cookies.get('token')

        if(token){
            navigate('/')
        }
    },[navigate])

    const [formData,setFormData] = useState({
        email:"",
        password:""
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
            position: "bottom-left",
    });

    const handleSubmit = async (e) =>{
       try {
            e.preventDefault();
            const response = await axios.post('http://localhost:3000/v1/auth/login',formData,{withCredentials:true})
            const {success, message} = response.data
            setFormData({ 
            name: '',
            email: '',
            password: ''
            })
            
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                navigate("/");
                    }, 1000);
            } else{
                 handleError(response.message)
            }

       } catch (error) {
            // setMessage('Login Failed')
           
            console.error(error)
        
       }
    }





    return (
        <section className='grid place-content-center h-[100vh]'>
        <div className="w-[300px] h-[400px] md:w-[400px] md:h-[503px]  lg:w-[500px] lg:h-[540px] lg:pt-14  xl:p-6 p-6 xl:pt-20   bg-white border border-gray-200 rounded-lg shadow  md:p-8 dark:bg-gray-800  dark:border-gray-700">
            <form onSubmit={handleSubmit} className="space-y-6">
                <h5 className="text-xl font-medium text-gray-900 dark:text-white">Sign in</h5>
                <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@email.com" required />
                </div>
                <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                </div>
                
                <button type="submit"  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none  focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</button>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                    Not registered? <Link to="/signup" className="text-blue-700 hover:underline dark:text-blue-500">Create account</Link>
                </div>
            </form>
            <ToastContainer/>

        </div>
        </section>
    );
}

export default Login;

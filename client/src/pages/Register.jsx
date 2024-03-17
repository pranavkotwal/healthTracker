import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer,toast } from 'react-toastify';
const Register = () => {
    const navigate = useNavigate()

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


        <div>
           
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                <button type="submit">Register</button>
                <span>
                Already have an account? <Link to={"/login"}>Login</Link>
                </span>
            </form>
            <ToastContainer/>
            
            

           
             
        </div>
    );
}

export default Register;

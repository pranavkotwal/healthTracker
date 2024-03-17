import React, { useState } from 'react';
import { Link , useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'

const Login = () => {
    const navigate = useNavigate()

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
      } else {
        handleError(message);
      }

       } catch (error) {
            setMessage('Login Failed')
            console.error(error)
        
       }
    }





    return (
        <div>
            
                
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder="email" name="email" value={formData.email} onChange={handleChange} required/>
                    <input type="password" placeholder="password" name="password" value={formData.password} onChange={handleChange} required/>
                    <button type="submit">Login</button>
                    <span>
                        Dont have an account? <Link to={"/signup"}>Signup</Link>
                    </span>
                </form>
                <ToastContainer />
        </div>
    );
}

export default Login;

import React, { useState } from 'react'
import Backgroundimage from '../assets/BackgroundImage.jpg'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Loginpage() {
  const navigation = useNavigate();

  const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const email = formData.get('email');
      const password = formData.get('password');
    
      const data = {
          email: email,
          password: password
      };

      try {
        const response = await axios.post('http://localhost:3000/api/Login', data);
        console.log(response.data); // Log response data for debugging
    
        if (response.data.found) {
            navigation('/homepage'); // Navigate to homepage if user is found
        } else {
            console.log("User not found");
            // Optionally show an error message or redirect to a signup page
        }
    } catch (error) {
        console.error("Error Logging In:", error);
        // Handle error state if needed
    }
  };


    return (
        <>
          <div className='min-h-screen flex bg-cover bg-center-left' style={{ backgroundImage: `url(${Backgroundimage})` }}>
            <div className='bg-slate-200 w-full md:w-8/12 lg:w-6/12 xl:w-5/12 rounded-none md:rounded-r-2xl flex flex-col min-h-screen'>
              <span className='py-6 md:py-10 flex px-4 md:px-6 justify-start text-3xl md:text-4xl font-semibold'>FireX</span>
              <div className='flex flex-col items-center justify-center mt-20 px-4 md:px-0'>
                <div className='text-center'>
                  <span className='text-4xl md:text-5xl py-1 font-semibold text-orange-500 block mb-2'>Welcome Back</span>
                  <span className='text-lg md:text-xl font-thin block mb-6'>Please enter your details</span>
                </div>

                <form onSubmit={handleSubmit} className='flex flex-col w-full md:w-8/12 lg:w-6/12 xl:w-4/12 m-6'>
                  <span className='flex items-start justify-start w-full text-sm md:text-md py-2'>Email</span>
                  <input 
                    type='email'  
                    name='email'
                    placeholder='Enter your email' 
                    autoComplete='false'
                    className='w-full rounded-lg border-slate-400/70 border h-10 p-2 
                            text-sm md:text-base 
                            placeholder:text-slate-400 placeholder:text-sm placeholder:md:text-base
                            focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500'
                    required
                  />
                  <span className='flex items-start justify-start w-full text-sm md:text-md py-2 mt-3'>Password</span>
                  <input 
                    type='password' 
                    name='password'
                    placeholder='• • • • • • • ' 
                    autoComplete='current-password'  
                    className='w-full rounded-lg border-slate-400/70 border h-10 p-2 
                            text-sm md:text-base 
                            placeholder:text-slate-400 placeholder:text-sm placeholder:md:text-base
                            focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500'
                    required 
                  />
                  <div className='flex justify-end py-3'>
                    <a href='#' className='text-sm md:text-base'>Forgot password</a>
                  </div>
                  <button 
                    type="submit" 
                    className="bg-orange-500 hover:bg-orange-600 rounded-lg h-10 px-4 md:px-6 text-white font-semibold text-sm tracking-wide uppercase transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50 shadow-md"
                  >
                    Sign in
                  </button>
                </form>

                <span className='text-sm md:text-md'>
                     Don't have an account?{' '}
                    <Link to="/Signup" className="text-orange-500 hover:text-orange-600 transition duration-300 ease-in-out">
                        Sign Up
                    </Link>
                </span>
            
              </div>
            </div>
          </div>
        </>
      )
}

export default Loginpage
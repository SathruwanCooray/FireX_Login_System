import React from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Backgroundimage from '../assets/BackgroundImage.jpg';

function Signuppage() {
    const navigation = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const name = formData.get('name');
        const email = formData.get('email');
        const password = formData.get('password');

        const number = Math.floor(Math.random() * 100) + 1;

        const data = {
            name: name,
            email: email,
            password: password
        };
        

        try {
            const response = await axios.post('http://localhost:3000/api/Signup', data);
            console.log(response.data); // Handle response if needed
            navigation(`/verification?email=${encodeURIComponent(email)}`);
        } catch (error) {
            console.error("Error Posting User information", error);
        }
    };

    return (
        <>
            <div className='min-h-screen flex bg-cover bg-center-left' style={{ backgroundImage: `url(${Backgroundimage})` }}>
                <div className='bg-slate-200 w-full md:w-8/12 lg:w-6/12 xl:w-5/12 rounded-none md:rounded-r-2xl flex flex-col min-h-screen shadow-inner'>
                    <span className='py-6 md:py-10 flex px-4 md:px-6 justify-start text-3xl md:text-4xl font-semibold'>FireX</span>
                    <div className='flex flex-col items-center justify-center mt-20 px-4 md:px-0'>
                        <div className='text-center'>
                            <span className='text-4xl md:text-5xl py-1 font-semibold text-orange-500 block mb-2'>Create an account</span>
                            <span className='text-lg md:text-xl font-thin block mb-6'>Please enter your details</span>
                        </div>

                        <form onSubmit={handleSubmit} className='flex flex-col w-full md:w-8/12 lg:w-6/12 xl:w-4/12 m-6'>
                            <span className='flex items-start justify-start w-full text-sm md:text-md py-2'>Name</span>
                            <input
                                type='text'
                                name='name'
                                placeholder='Enter your name'
                                autoComplete='false'
                                className='w-full rounded-lg border-slate-400/70 border h-10 p-2
                                     text-sm md:text-base
                                     placeholder:text-slate-400 placeholder:text-sm placeholder:md:text-base
                                     focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500'
                                required
                            />
                            <span className='flex items-start justify-start w-full text-sm md:text-md py-2 mt-3'>Email</span>
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
                                placeholder='• • • • • • •'
                                autoComplete='current-password'
                                className='w-full rounded-lg border-slate-400/70 border h-10 p-2
                                     text-sm md:text-base
                                     placeholder:text-slate-400 placeholder:text-sm placeholder:md:text-base
                                     focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500'
                                required
                            />
                            <button
                                type="submit"
                                className="bg-orange-500 hover:bg-orange-600 rounded-lg h-10 px-4 md:px-6 text-white font-semibold text-sm tracking-wide uppercase transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50 shadow-md mt-5"
                            >
                                Sign up
                            </button>
                        </form>

                        <span className='text-sm md:text-md'>
                            Have an account?{' '}
                            <Link to="/" className="text-orange-500 hover:text-orange-600 transition duration-300 ease-in-out">
                                Login
                            </Link>
                        </span>
                    </div>

                </div>
            </div>
        </>
    );
}

export default Signuppage;

import React, { useState, useEffect } from 'react';
import BackgroundImage from '../assets/BackgroundImage.jpg';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';

function Verificationpage() {
  let verificationSent = false;
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');

  const navigation = useNavigate();
  const [timer, setTimer] = useState(100);
  const [message, setMessage] = useState('');
  const [verificationCode, setVerificationCode] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer(prevTimer => prevTimer - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (timer === 0) navigation('/');
  }, [navigation, timer]);

  const requestCode = async () => {
    console.log('Requesting code...');
    try {
      const response = await axios.post('http://localhost:3000/api/Verification', { email });
      setVerificationCode(response.data.code);
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Failed to send code');
    }
  };

  useEffect(() => {
    console.log('useEffect called with email:', email);
    if (verificationSent == false) {
      requestCode();
      verificationSent = true;
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const enteredCode = [...Array(6)].map((_, i) => formData.get(`Digit_${i + 1}`));

    if (enteredCode.every((digit, i) => digit === verificationCode[i].toString())) {
      console.log('Verification successful');
      navigation('/homepage');
    } else {
      console.log('Verification failed');
      setMessage('Invalid code. Please try again.');
    }
  };

  return (
    <div className='min-h-screen flex bg-cover bg-center-left' style={{ backgroundImage: `url(${BackgroundImage})` }}>
      <div className='bg-slate-200 w-full md:w-8/12 lg:w-6/12 xl:w-5/12 rounded-none md:rounded-r-2xl flex flex-col min-h-screen'>
        <span className='py-6 md:py-10 flex px-4 md:px-6 justify-start text-3xl md:text-4xl font-semibold'>FireX</span>
        <div className='flex flex-col items-center justify-center mt-20 px-4 md:px-0'>
          <div className='text-center'>
            <span className='text-4xl md:text-5xl py-1 font-semibold text-orange-500 block mb-2'>Verification</span>
            <span className='text-base md:text-lg text-slate-600 block mb-6'>Please enter the 6-digit verification code</span>
          </div>

          <form onSubmit={handleSubmit} className='flex flex-col items-center w-full md:w-10/12 lg:w-8/12 xl:w-6/12 m-6'>
            <div className='flex flex-row justify-center w-full'>
              {[...Array(6)].map((_, index) => (
                <input
                  key={index}
                  type='text'
                  name={`Digit_${index + 1}`}
                  maxLength="1"
                  autoComplete='off'
                  className='w-10 mx-2 h-12 md:w-12 md:h-16 text-center text-xl md:text-2xl font-bold
                            rounded-lg border-slate-400/70 border
                            placeholder:text-slate-400
                            focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500'
                  required
                />
              ))}
            </div>

            <button
              type="submit"
              className="mt-4 bg-orange-500 w-60 hover:bg-orange-600 rounded-lg h-10 px-4 md:px-6 text-white font-semibold text-sm tracking-wide uppercase transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50 shadow-md"
            >
              Verify {timer}
            </button>
            {message && <p className="mt-4 text-center text-slate-700">{message}</p>}
          </form>

          <div className="mt-6 text-center">
            <span className="text-slate-600 md:text-lg">Didn't receive the code? </span>
            <Link to="#" onClick={() => window.location.reload()} className="text-orange-500 hover:underline md:text-lg">Resend</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Verificationpage;
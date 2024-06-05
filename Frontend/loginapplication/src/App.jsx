import React from 'react'
import Loginpage from './Pages/Loginpage';
import { Routes, Route } from 'react-router-dom';
import './index.css';
import Signuppage from './Pages/Signuppage';
import Verficiationpage from './Pages/Verficiationpage';
import Homepage from './Pages/Homepage';


function App() {
  return (
    <>
    <div className='text-3xl font-bold font-roboto'>
      <Routes>
        <Route path='/' element={<Loginpage/>} />
        <Route path='/Login' element={<Loginpage/>} />
        <Route path='/Signup' element={<Signuppage/>} />
        <Route path='/verification' element={<Verficiationpage/>} />
        <Route path='/homepage' element={<Homepage/>} />
      </Routes>

    </div>
    </>
  )
}

export default App
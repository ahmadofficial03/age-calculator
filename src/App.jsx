import React from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Components
import AgeCalculator from './components/AgeCalculator/AgeCalculator'

// React Toastify
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AgeCalculator />} index />
      </Routes>
      <ToastContainer position="top-center" autoClose={3000} />
    </BrowserRouter>
  )
}

export default App

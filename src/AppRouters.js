import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import CoinPage from './Pages/CoinPage'

const AppRouters = () => {
  return (
    <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/coin/:id' element={<CoinPage/>} />
    </Routes>
  )
}

export default AppRouters
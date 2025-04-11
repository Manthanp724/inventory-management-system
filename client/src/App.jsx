import React from 'react'
import "./index.css"
import Signup from './components/Layouts/Signup'
import Login from './components/Layouts/Login'
import {Routes , Route} from "react-router-dom"
// import Order from "./Pages/Order"
import Order from './components/Order/Order'
import ProductManagement from './Pages/ProductManagement.'
import Dashboard from './Pages/Dashboard'
import Customers from './Pages/Customer'
import Category from './Pages/Category'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/signup' element ={<Signup/>} />
        <Route path='/order' element = {<Order/>}/>
        <Route path='/product' element = {<ProductManagement/>} />
        <Route path='/dashboard' element = {<Dashboard/>} />
        <Route path='/customers' element={<Customers/>} />
        <Route path= '/category' element= {<Category/>} />
      </Routes>
    </div>
  )
}

export default App

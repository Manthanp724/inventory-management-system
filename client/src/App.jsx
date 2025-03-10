import React from 'react'
import "./index.css"
import Signup from './components/Signup'
import Login from './components/Login'
import {Routes , Route} from "react-router-dom"
import Order from "./components/Order"
import ProductManagement from './Pages/ProductManagement.'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/signup' element ={<Signup/>} />
        <Route path='/order' element = {<Order/>}/>
        <Route path='/product' element = {<ProductManagement/>} />
      </Routes>
      {/* <Sidebar/> */}
    </div>
  )
}

export default App

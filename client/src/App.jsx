import React from 'react'
import "./index.css"
import Signup from './components/Signup'
import Login from './components/Login'
import {Routes , Route} from "react-router-dom"
import Header from './utils/Header'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/signup' element ={<Signup/>} />
        <Route path='/header' element = {<Header/>} />
      </Routes>
    </div>
  )
}

export default App

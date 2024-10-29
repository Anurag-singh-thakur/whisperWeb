import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Chat from './components/Chat/Chat';
import Profile from './components/Profile/Profile'
const App = () => {
  return (
   
    <Router>
      <div className='app'>
        <Navbar />
       <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='chat' element={<Chat/>} />
          <Route path='profile' element={<Profile/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<Signup/>} />
          
          </Routes>
      </div>
      </Router>


  )
}

export default App
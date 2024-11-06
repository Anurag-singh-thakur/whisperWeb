import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast notifications
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Chat from './components/Chat/Chat';
import Profile from './components/Profile/Profile';
import Notifications from './components/Notifications/Notifications';
// import UserList from './components/Userlist/Userlist';
import UsersPage from './components/Users/Users';

const App = () => {
  return (
    <Router>
      <div className='app'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='chat' element={<Chat />} />
          <Route path='profile' element={<Profile />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/users' element={<UsersPage />} />
          <Route path='/notify' element={<Notifications />} />
        </Routes>
        <ToastContainer /> 
      </div>
    </Router>
  );
};

export default App;
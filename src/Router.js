import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';

import './css/style.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

function ProjectRouter() {

  const navigate = useNavigate();

  const [nickName, setNickName] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {    
    const user = global.auth.getUserInfo();
    if(user == null ||  user == undefined) {      
      navigate('/Login')
    } else {
      setNickName(JSON.parse(user).nickname)
      setRole(JSON.parse(user).role)
      navigate('/')
    }
  }, [navigate]);

  const clearUserInfo = () => {
    global.auth.logout();
    navigate('/Login'); 
  }

  return (
    <Routes>
      <Route path="/Login" element={<Login />} />
      <Route path="/" element={<Home nickName={nickName} role={role} clearUserInfo={clearUserInfo} />} />
    </Routes>
  );
}

export default ProjectRouter;

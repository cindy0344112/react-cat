import React, { useState, useEffect } from 'react';

function Header({onBranchChange, nickName, clearUserInfo}) {

  const handleSelectChange = (event) => {    
    onBranchChange(event.target.value.toLowerCase())
    console.log(nickName)
  }

  const logout = () => {
    clearUserInfo()
  }  

  return (
    <div className='header'>
      <div className='d-flex'>
        <div className='me-auto p-2 d-flex align-items-center'>
          <img
            alt=""
            src="/img/dudu.png"
            width="30"
            height="30"
            className="d-inline-block"
          />
          <span className='ms-2'>Cats Resource Management System</span>
        </div>

        {(nickName) ? (
          <div className='p-2'>
            <div>{nickName}</div>          
          </div>
        ) : null}
        

        <div className='p-2'>
          <select name="choice" onChange={handleSelectChange}>
            <option value="Linko" defaultValue>林口</option>
            <option value="Taoyuan">桃園</option>
          </select>
        </div>        
        <div className='p-2'>
          <button type='button' className='btn btn-outline-light btn-sm' onClick={logout}>登出</button>         
        </div>        
      </div>
    </div>
  );
}

export default Header;

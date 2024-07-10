import React, { useState, useEffect }  from 'react';
import axios from "../common/axios";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Login() {

    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState({
        email: "",
        password: ""
    });
    
    const handleChange = e => {
        const { name, value } = e.target;

        setUserInfo((preUserInfo) => ({
            ...preUserInfo,
            [name]: value
        }))
    }

    const onSubmit = async data => {                
        try {            
            const res = await axios.post('/auth/login', userInfo)
            const jwToken = res.data;

            global.auth.setUserInfo(res.data)
            navigate("/");
            // toast.success("登入成功！");                                                 
        } catch (error) {
            const message = error.response.data.message
            toast.error(message)
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            onSubmit();
        }
      }

    return (        
        <div className="login-wrapper">            
            <div className="card login-box p-3">
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input
                        className={`input form-control`} 
                        id="exampleInputEmail1"
                        name="email"
                        autoComplete="off"
                        value={userInfo.email}
                        onChange={handleChange}
                    />        
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input 
                        type="password" 
                        className={`input form-control`}                         
                        id="exampleInputPassword1" 
                        name="password" 
                        value={userInfo.password}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                    />
                </div>
                
                <button type="button" className='btn btn-dark' onClick={onSubmit}>Login</button>
            </div>
        </div>        
    );
}

export default Login;

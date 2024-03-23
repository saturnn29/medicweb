import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LSstyle from './LoginSignUp.module.css'

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const navigate = useNavigate();

  const login = () => {
    axios.post("http://localhost:8080/login", {
      username: username,
      password: password,
    })
    .then((response) => {
      if (response.data.message) {
        setLoginStatus(response.data.message);
      } else {
        const userType = response.data.userType;
        const userId = response.data.userId;
        sessionStorage.setItem('userType', userType);
        sessionStorage.setItem('userId', userId);

        if (userType === 'patient') {
          navigate('/patient/home');
        } else if (userType === 'doctor') {
          navigate('/doctor/home');
        } else {
          setLoginStatus("Unknown user type");
        }
      }
    })
    .catch((error) => {
      console.error("Error during login:", error);
    });
  }

  return (
    <div class={LSstyle.loginpage}>
      <div class={LSstyle.wrapper}>
        <div class={LSstyle.loginbox}>
          <div class={LSstyle.loginheader}>
            <span>Login</span>
          </div>

          <div class={LSstyle.inputbox}>
            <input type="text" placeholder="Username..." onChange={(e) => setUsername(e.target.value)} />
            <i class="bx bx-user icon"></i>
          </div>
          <div class={LSstyle.inputbox}>
            <input type="password" placeholder="Password..." onChange={(e) => setPassword(e.target.value)} />
            <i class="bx bx-lock-alt icon"></i>
          </div>
          <button class={LSstyle.loginbtn} onClick={login}>Login</button>
          {loginStatus ?<div className="error">{loginStatus}</div>: null }
        </div>
      </div>
    </div>
  );
};

export default Login;

import React, { useState } from 'react';
import LSstyle from './LoginSignUp.module.css';
import { Link } from 'react-router-dom';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('Patient');
    const [password, setPassword] = useState('');

    const handleRoleChange = (event) => {
        setRole(event.target.value);
    };

    const handleUsernameChange = (event) => {
        // Regular expression to check if the username contains any special symbols
        const regex = /^[a-zA-Z0-9]+$/;
        const newUsername = event.target.value;

        if (regex.test(newUsername) || newUsername === '') {
            setUsername(newUsername);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Perform signup logic here
        console.log('Submitted values:', { username, email, role, password });
    };

    const options =[
        {label: "Doctor", value: 1},
        {label: "Patient", value: 2}
    ]

  return (
    <div class={LSstyle.loginpage}>
        <div class={LSstyle.wrapper}>
            <div class={LSstyle.loginbox}>
                <div class={LSstyle.loginheader}>
                    <span>Sign Up</span>
                </div>
                <form onSubmit={handleSubmit}>
                    <div class={LSstyle.inputbox}>
                        <input type="text" placeholder="Username (No Special Character)" value={username} onChange={handleUsernameChange} required />
                        <i class="bx bx-user icon"></i>
                    </div>
                    <div class={LSstyle.inputbox}>
                        <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <i class="bx bx-user icon"></i>
                    </div>
                    <div className={LSstyle.inputbox}>
                        <div className={LSstyle.selectionContainer}>
                            <select className={LSstyle.selection} value={role} onChange={handleRoleChange}>
                                {options.map(option => (
                                    <option key={option.value} value={option.label}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div class={LSstyle.inputbox}>
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <i class="bx bx-lock-alt icon"></i>
                    </div>
                    <button type="submit" class={LSstyle.loginbtn}>Sign Up</button>
                </form>
                <div  class={LSstyle.register}>
                    <span>Already have an account? <Link to="/login">Login</Link></span>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Signup;
import React from 'react';
import { Link } from 'react-router-dom';
import '../style.css';

const Login = () => {
  return (
    <main className="login-main">
      <h1>Login</h1>
      <div className="login_input">
        <label htmlFor="username">Username</label>
        <input type="text" placeholder="Email or Phone" id="username" className="login" />

        <label htmlFor="password">Password</label>
        <input type="password" placeholder="Password" id="password" className="login" />

        <button className="login-btn" type="submit">Log In</button>

        <Link to="/signup">Sign Up</Link>
      </div>
    </main>
  );
};

export default Login;



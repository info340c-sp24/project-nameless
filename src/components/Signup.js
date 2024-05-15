import React from 'react';
import { Link } from 'react-router-dom';
import '../style.css';

const SignUp = () => {
  return (
    <main className="signup-main">
      <h1>Sign Up</h1>
      <div className="login_input">
        <label htmlFor="username">Username</label>
        <input type="text" placeholder="Email or Phone" id="username" className="login" />

        <label htmlFor="password">Password</label>
        <input type="password" placeholder="Password" id="password" className="login" />

        <button className="login-btn" type="submit">Sign Up</button>

        <Link to="/login">Login</Link>
      </div>
    </main>
  );
};

export default SignUp;

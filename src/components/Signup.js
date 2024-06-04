import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { ref, set } from 'firebase/database';
import '../style/login&signup.css';

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let timer;
    if (errorMessage) {
      timer = setTimeout(() => {
        setErrorMessage('');
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [errorMessage]);

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      console.log('Passwords do not match');
      setErrorMessage('Passwords do not match');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      return;
    }

    if (password.length < 6 | confirmPassword.length < 6) {
      console.log('Password too short');
      setErrorMessage('Password too short');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/login');
    } catch (error) {
      console.error('Error during sign up:', error);
      setErrorMessage('Signup failed: account existed');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    }
  };

  return (
    <main className="signup-main">
      <h1>Sign Up</h1>
      <div className="login_input">
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleSignUp} className='login-form'>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Email (@uw.edu)"
            id="email"
            className="login"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password (at least 6 digits)"
            id="password"
            className="login"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm Password"
            id="confirmPassword"
            className="login"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button className="login-btn" type="submit">
            Sign Up
          </button>
        </form>

        <Link to="/login">Login</Link>
      </div>
    </main>
  );
};

export default SignUp;

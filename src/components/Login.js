import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import '../style/login&signup.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigate('/');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    let timer;
    if (errorMessage) {
      timer = setTimeout(() => {
        setErrorMessage('');
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [errorMessage]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('Invalid email or password.');
      setEmail('');
      setPassword('');
    }
  };

  return (
    <main className="login-main">
      <h1>Login</h1>
      <div className="login_input">
      {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleLoginSubmit} className='login-form'>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Email"
            id="email"
            className="login"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            id="password"
            className="login"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="login-btn" type="submit">
            Log In
          </button>
        </form>

        <Link to="/signup">Sign Up</Link>
      </div>
    </main>
  );
};

export default Login;
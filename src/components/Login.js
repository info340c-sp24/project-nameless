import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import '../style/login&signup.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigate('/');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <main className="login-main">
      <h1>Login</h1>
      <div className="login_input">
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
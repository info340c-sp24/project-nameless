import React from 'react';
import { Link } from 'react-router-dom';
import '../style/header.css'

const Header = () => {
  return (
    <header>
      <div className="logo">
        <Link to="/">
          <img src="/img/star.png" alt="site logo" />
          <span>UW Course Evaluation</span>
        </Link>
      </div>
      <div className="search-container">
        <input type="search" placeholder="Search" className="search_bar" />
        <img src="/img/search.png" alt="Search Icon" />
      </div>
      <div className="login">
        <Link to="/login">
          <img src="/img/login.png" alt="Login Icon" />
          <span>Login</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;



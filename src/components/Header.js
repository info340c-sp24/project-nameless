import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../style/general.css';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchQuery.toLowerCase() === 'info340') {
      navigate('/detail');
    }
  };

  return (
    <header>
      <div className="logo">
        <Link to="/">
          <img src="/img/star.png" alt="site logo" />
          <span>UW Course Evaluation</span>
        </Link>
      </div>
      <div className="search-container">
        <form onSubmit={handleSearchSubmit} className="search-form">
          <input
            type="search"
            placeholder="Search"
            className="search_bar"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button type="submit" className="search-button">
            <img src="/img/search.png" alt="Search Icon" />
          </button>
        </form>
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



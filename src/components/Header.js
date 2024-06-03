import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../style/general.css';
import logout from '../img/out.png';

const Header = ({ setSearchQuery, isLoggedIn, handleLogout }) => {
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const query = searchInput.toLowerCase();
    setSearchQuery(query);
    navigate('/', { state: { searchQuery: query } });
  };

  const handleLogoutClick = () => {
    handleLogout();
    navigate('/');
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
            value={searchInput}
            onChange={handleSearchChange}
          />
          <button type="submit" className="search-button">
            <img src="/img/search.png" alt="Search Icon" />
          </button>
        </form>
      </div>
      <div className="login">
        {isLoggedIn ? (
          <div onClick={handleLogoutClick}>
            <img src={logout} alt="Logout Icon" />
          </div>
        ) : (
          <Link to="/login">
            <img src="/img/login.png" alt="Login Icon" />
            <span>Login</span>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;



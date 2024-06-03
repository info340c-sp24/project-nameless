import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../style/general.css';

const Header = ({ setSearchQuery, isLoggedIn, handleLogout }) => {
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setSearchQuery(searchInput.toLowerCase());
    navigate('/', { state: { searchQuery: searchInput.toLowerCase() } }); // Navigate to homepage with search query
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
            <img src="../img/logout.png" alt="Logout Icon" />
            <span>Logout</span>
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



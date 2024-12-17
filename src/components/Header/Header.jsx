import { Link, useNavigate } from "react-router-dom";
import "./Header.scss";
import { useAuthentication } from "../AuthenticationContext/AuthenticationContext";
import { useState, useEffect, useRef } from "react";

function Header() {
  const navigate = useNavigate();
  const dropdownRef = useRef(null)
  const menuButtonRef = useRef(null)
  const { user, logout } = useAuthentication();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);  

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  function handleLogout() {
    if (user) {
      logout();
      setIsDropdownOpen(false);
      navigate("/");
    }
  }

  function handleCreateBooktale() {
    setIsDropdownOpen(false);
    navigate("/create-booktale");
  }

  function handleGoHome() {
    setIsDropdownOpen(false);
    navigate("/home");
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target) && !menuButtonRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
 

  if (!user) {
    return (
      <header className="header">
        <div className="nav">
          <div className="nav__logo">
            <Link to="/" className="nav__logo-link">
              <h1 className="nav__logo-title">Booktale</h1>
            </Link>
          </div>
          <div className="nav__right-side">
            <button
              onClick={() => navigate("/login")}
              className="nav__login-button"
            >
              Log In
            </button>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="header">
      <div className="nav">
        {isDropdownOpen && (
          <div className="nav__dropdown-menu" ref={dropdownRef}>
            <span className="nav__dropdown-menu-welcome-message">
              Welcome, {user.username}
            </span>
            <ul className="nav__dropdown-menu-list">
              <li>
                <button
                  className="nav__dropdown-menu-item"
                  onClick={handleCreateBooktale}
                >
                  Create Booktale
                </button>
              </li>
              <li>
                <button
                  className="nav__dropdown-menu-item"
                  onClick={handleGoHome}
                >
                  My Library
                </button>
              </li>
              <li>
                <button className="nav__dropdown-menu-item">Settings</button>
              </li>
              <li>
                <button className="nav__dropdown-menu-item" onClick={handleLogout}>
                  Log Out
                </button>
              </li>
            </ul>
          </div>
        )}
        <div className="nav__logo">
          <Link to="/home" className="nav__logo-link">
            <h1 className="nav__logo-title">Booktale</h1>
          </Link>
        </div>
        <div className="nav__right-side">
            <button className="nav__menu-button" ref={menuButtonRef} onClick={toggleDropdown}>
              <span className="nav__menu-title">Menu</span>
            </button>
          </div>
      </div>
    </header>
  );
}

export default Header;

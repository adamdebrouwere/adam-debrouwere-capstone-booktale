import { Link, useNavigate } from "react-router-dom";
import "./Header.scss";
import { useAuthentication } from "../AuthenticationContext/AuthenticationContext";

function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuthentication();
  
  function handleLogout () {
    if(user) {
      logout()
      navigate('/');
    }
  }

  if (!user) {
    return (
      <header className="header">
        <div className="nav">
          <div className="nav__logo">
            <Link to="/" className="nav__logo-link">
              <h1>Booktale</h1>
            </Link>
          </div>
          <div className="nav__right-side">
            <button onClick={() => navigate('/login')} className="nav__login-button">
              Login
            </button>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="header">
      <div className="nav">
        <div className="nav__logo">
          <Link to="/home" className="nav__logo-link">
            <h1>Booktale</h1>
          </Link>
        </div>
        <div className="nav__right-side">
          <h2 className="nav__welcome-message">Welcome, {user.username}</h2>
          <button className="nav__logout-button" onClick={handleLogout}>
            <span className="nav__logout-text">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;

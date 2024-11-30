// import { useState } from "react";
// import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
// import Cookies from "js-cookie";
import { useAuthentication } from "../../components/AuthenticationContext/AuthenticationContext";

function LogInPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loading, error } = useAuthentication();

  const from = location.state?.from || "/home";

  const handleLogin = async (event) => {
    event.preventDefault();

    const username = event.target.username.value;
    const password = event.target.password.value;

    if (!username || !password) {
      alert("Username and password are required.");
      return;
    }
    try {
      await login(username, password);
   
      if (!error) {
        navigate(from);
      }
    } catch (error) {
      console.error("Login error:", error)
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="LogInPage">
      <div>
        <h3>Login</h3>
        <form className="form" onSubmit={handleLogin}>
          <input
            className="form__input"
            type="text"
            name="username"
            placeholder="username"
            autoComplete="username"
          />
          <input
            className="form__input"
            type="password"
            name="password"
            placeholder="password"
            autoComplete="current-password"
          />
          <button className="form__btn" type="submit">
            Login
          </button>
          <button
            className="form__btn"
            type="submit"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </button>
          {error && <p>{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default LogInPage;

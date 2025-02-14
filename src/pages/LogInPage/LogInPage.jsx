import { useEffect } from "react";
import "./LogInPage.scss";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthenticationContext } from "../../context/AuthenticationContext";

function LogInPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, error, setError, user, } =
    useAuthenticationContext();

  useEffect(() => {
    setError("");
  }, [setError]);

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
      login(username, password);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  useEffect(() => {
    if (user) {
      navigate(from);
    }
  },);

  return (
    <div className="log-in-page">
      <form className="form" onSubmit={handleLogin}>
        <h3 className="form__title">Log In</h3>
        <input
          className="form__input"
          type="text"
          name="username"
          placeholder="Username"
          autoComplete="username"
        />
        <input
          className="form__input"
          type="password"
          name="password"
          placeholder="Password"
          autoComplete="current-password"
        />
        {error && <p>{error}</p>}
        <button className="form__button" type="submit">
          Log In
        </button>
        <button className="form__button" onClick={() => navigate("/signup")}>
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default LogInPage;

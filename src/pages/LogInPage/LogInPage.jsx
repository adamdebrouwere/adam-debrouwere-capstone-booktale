import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

function LogInPage({ BASE_URL }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const handleLogin = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    const username = event.target.username.value;
    const password = event.target.password.value;

    if (!username || !password) {
      setError("Username and password are required.");
      setIsLoading(false);
      return;
    }
    console.log("rigger1");

    try {
      const response = await axios.post(`${BASE_URL}/login`, {
        username: username,
        password: password,
      });
      console.log("rigger2");

      Cookies.set("token", response.data.token, {
        expires: 7,
        secure: true,
        sameSite: "Strict",
      });

      console.log("rigger3");

      if (response.data.token) {
        const userResponse = await axios.get(`${BASE_URL}/user`, {
          headers: {
            Authorization: `Bearer ${response.data.token}`,
          },
        });

        console.log("rigger3");

        setLoggedIn(true);
        setUser(userResponse.data.user);
        setError("");
        setIsLoading(false);

        const from = location.state?.from || "/home";
        navigate(from);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Error Logging in";
      console.error(errorMessage);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="LogInPage">
      {!loggedIn && (
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
      )}
    </div>
  );
}

export default LogInPage;

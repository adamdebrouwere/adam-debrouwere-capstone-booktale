import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from 'js-cookie' 

function SignUpPage({ BASE_URL }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    const userData = { username, email, password };

    if (!username || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords must match.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/signup`, userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        alert("User created successfully!");

        const loginResponse = await axios.post(`${BASE_URL}/login`, {
          username: userData.username,
          password: userData.password,
        });

        if (loginResponse.data.token) {
          Cookies.set("token", response.data.token, { expires: 7, secure: true, sameSite: "Strict"});

          const from  = location.state?.from || "/home"
          navigate(from);
        }
      }

      
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error || "An error occurred.");
      } else {
        setError("Network error. Please try again later.");
      }
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {message && <div style={{ color: "green" }}>{message}</div>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="confirmPassword">Confirm Password: </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpPage;

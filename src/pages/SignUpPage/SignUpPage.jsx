import './SignUpPage.scss';
import{ useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthentication } from "../../components/AuthenticationContext/AuthenticationContext";

function SignUpPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const { BASE_URL, login, error, setError } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const userData = { username, email, password };
   
    if (!username || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords must match.");
      return;
    }
 console.log(userData)

    // const emailRegex = /^(?![_.])[A-Za-z0-9._%+-]+(?:[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,})$/;
    // if (!emailRegex.test(email)) {
    //   setError("Please enter a valid email address.");
    //   return;
    // }

    // if (!/[a-z]/.test(password)) {
    //   setError("Password must contain at least one lowercase letter.");
    //   return;
    // }
    // if (!/[A-Z]/.test(password)) {
    //   setError("Password must contain at least one uppercase letter.");
    //   return;
    // }

    // if (!/\d/.test(password)) {
    //   setError("Password must contain at least one number.");
    //   return;
    // }

    // if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    //   setError("Password must contain at least one special character.");
    //   return;
    // }

    try {
      const response = await axios.post(`${BASE_URL}/signup`, userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response)

      if (response.status === 201) {
        alert("User created successfully!");

        try {
          await login(username, password);

          if (!error) {
            const from = location.state?.from || "/home";
            navigate(from, { replace: true });
          }
        } catch (error) {
          console.error("Login error:", error);
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
    <div className="sign-up">

      <form className="sign-up__form"onSubmit={handleSubmit}>      <h1 className="sign-up__title">Sign Up</h1>
        <div className="sign-up__form-field">
          <label className="sign-up__form-field-label" htmlFor="username">Username: </label>
          <input
          className="sign-up__form-field-input"
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div
        className="sign-up__form-field">
          <label 
          className="sign-up__form-field-label" htmlFor="email">Email: </label>
          <input
          className="sign-up__form-field-input"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="sign-up__form-field">
          <label className="sign-up__form-field-label" htmlFor="password">Password: </label>
          <input
          className="sign-up__form-field-input"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="sign-up__form-field">
          <label className="ssign-up__form-field-label" htmlFor="confirmPassword">Confirm Password: </label>
          <input
          className="sign-up__form-field-input"
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button className="sign-up__form-button"
        type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpPage;

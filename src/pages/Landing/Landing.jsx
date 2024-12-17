import { useAuthentication } from "../../components/AuthenticationContext/AuthenticationContext";
import Footer from "../../components/Footer/Footer";
import "./Landing.scss";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();
  const { setUser, user } = useAuthentication();

  if (user) {
    navigate('/home')
  }

  useEffect(() => {
    setUser(null);
  }, []);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <div className="landing">
      <h1 className="landing__title">Welcome to Booktale</h1>
      <p className="landing__tag-line">
        The online platform that allows you to connect with the past and future
        readers of used books.
      </p>
      <div>
        <div className="landing__button-container">
          <button className="landing__button-login" onClick={handleLogin}>
            Log In
          </button>
          <button className="landing__button-sign-up" onClick={handleSignUp}>
            Sign Up
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Landing;

import Footer from "../../components/Footer/Footer";
import { useAuthenticationContext } from "../../context/AuthenticationContext";
import "./Landing.scss";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();
  const { setUser, user } = useAuthenticationContext();
  useEffect(() => {
    if (user) {
    navigate('/home')
  }
  },[navigate, user])
  

  useEffect(() => {
    setUser(null);
  }, [setUser]);

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
        {/* The online platform that allows you to connect with the past and future
        readers of used books. */}
        The stories of our favorite tales.
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

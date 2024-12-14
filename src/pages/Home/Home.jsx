import "./Home.scss";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthentication } from "../../components/AuthenticationContext/AuthenticationContext";
import PastTalesDisplay from "../../components/PastTalesDisplay/PastTalesDisplay.jsx";
import Footer from "../../components/Footer/Footer.jsx";
function Home() {
  const { loading, error, pastTales, user } = useAuthentication();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading === false && user === null) {
    navigate("/");
  }
  },[])

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="home">
      {pastTales.length <= 0 && (
        <p className="home__how-to">
          Create your very first Booktale right here.
        </p>
      )}
      <button
        className="home__create-button"
        onClick={() => navigate("/create-booktale")}
      >
        CREATE A Booktale
      </button>
      {pastTales && (
        <>
          <h1 className="home__library-title">Your Booktale Library</h1>
          <PastTalesDisplay />
        </>
      )}
      <Footer />
    </div>
  );
}

export default Home;

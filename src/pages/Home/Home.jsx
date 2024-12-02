import "./Home.scss";
import { useNavigate } from "react-router-dom";
import { useAuthentication } from "../../components/AuthenticationContext/AuthenticationContext";
import PastTalesDisplay from "../../components/PastTalesDisplay/PastTalesDisplay.jsx";

function Home() {
  const { loading, error, pastTales } = useAuthentication();
  const navigate = useNavigate();
  
  
  if (loading) {
      return <div>Loading...</div>;
    }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="home">
      <button
        className="home__create-button"
        onClick={() => navigate("/create-booktale")}
      >
        CREATE A Booktale
      </button>
      {pastTales && <PastTalesDisplay />}
      
    </div>
  );
}

export default Home;

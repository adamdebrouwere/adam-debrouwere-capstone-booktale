import "./Home.scss";
import { useNavigate } from "react-router-dom";
import { useAuthenticationContext } from "../../context/AuthenticationContext.jsx";
import PastTalesDisplay from "../../components/PastTalesDisplay/PastTalesDisplay.jsx";
import Footer from "../../components/Footer/Footer.jsx";

function Home() {
  const { loading, error, user } = useAuthenticationContext();
  const navigate = useNavigate();

  if (!loading && !user) {
    navigate("/");
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="home">
      <h1 className="home__library-title">Your Booktale Library</h1>
      <PastTalesDisplay />
      <Footer />
    </div>
  );
}

export default Home;

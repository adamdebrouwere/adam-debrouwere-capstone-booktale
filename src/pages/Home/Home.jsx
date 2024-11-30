import { useNavigate } from "react-router-dom";
import { useAuthentication } from "../../components/AuthenticationContext/AuthenticationContext";
import PastTalesDisplay from '../../components/PastTalesDisplay/PastTalesDisplay.jsx'

function Home() {
  const { loading, error, user } = useAuthentication()
  const navigate = useNavigate();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="home">
      <p>{`Welcome to booktale  ${user.username}!`}</p>
      <PastTalesDisplay />
      <button onClick={() => navigate('/create-booktale')}>CREATE A Booktale</button>
    </div>
  );
}

export default Home;

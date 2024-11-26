import React from 'react';
import { useNavigate } from 'react-router-dom';

function Landing() {
  const navigate = useNavigate(); 
  
  const handleLogin = () => {
    navigate('/login');  
  };


  const handleSignUp = () => {
    navigate('/signup');  
  }
  return (
    <div>
      <h1>Welcome to Reader Tales</h1>
      <p>the online platform that allows you to connect with the past and future readers of this.</p>
      <div>
        <button onClick={handleLogin}>Log In</button>
        <button onClick={handleSignUp}>Sign Up</button>
      </div>
    </div>
  );

}

export default Landing;
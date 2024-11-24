import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LogInPage() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false); 
    const navigate = useNavigate();
  
    // useEffect(() => {
    //   const token = localStorage.getItem("token");
    //     console.log(token)
    //   if (token) {
    //     const getUserData = async () => {
    //       try {
    //         const response = await axios.get("http://localhost:8080/user", {
    //           headers: {
    //             Authorization: `Bearer ${token}`, // send token as auth header
    //           },
    //         }); 
    //         console.log(response.data)
    //         setLoggedIn(true);
    //         setUser(response.data.user);c
    //         setIsLoading(false); // stop loading once data is fetched
    //       } catch (error) {
    //         const errorMessage =
    //           error.response?.data?.message || "Error getting user data";
    //         console.error(errorMessage);
    //         setError(errorMessage);
    //         setIsLoading(false); // stop loading on error
    //       }
    //     };
    //     getUserData();
    //   } else {
    //     setIsLoading(false); // stop loading if no token is found
    //   }
    // }, []);

    const handleLogin = async (event) => {
      event.preventDefault();
  
      setIsLoading(true); 
  
      const username = event.target.username.value;
      const password = event.target.password.value;
        
      try {
        const response = await axios.post("http://localhost:8080/login", {
          username: username,
          password: password,
        });
        console.log(response.data.token, "trigger1")
  
        localStorage.setItem("token", response.data.token); 
        
  
        if (response.data.token) {
          const userResponse = await axios.get("http://localhost:8080/user", {
            headers: {
              Authorization: `Bearer ${response.data.token}`,
            },
          });
          console.log(userResponse, "trigger2");
  
          setLoggedIn(true);
          setUser(userResponse.data.user);
          setError(""); 
          setIsLoading(false);
          navigate("/"); 
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
  

    if (loggedIn) {
        navigate('/');
      return <div>Taking you Home</div>; 
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
            {error && <p>{error}</p>}
          </form>
        </div>
      )}
    </div>
  );
}

export default LogInPage;

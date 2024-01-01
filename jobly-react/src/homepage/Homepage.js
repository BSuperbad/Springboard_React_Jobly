import React from "react";
import { Link } from "react-router-dom";
import AuthContext from "../general/AuthContext";

const Homepage = () => {
  const { currentUser } = React.useContext(AuthContext)

  return (
    <div className="Homepage">
      <h1>Jobly</h1>
      <h2>All the jobs in one, convenient place.</h2>
      {currentUser ? (
        <p>Welcome back, {currentUser.username}!</p>
        
      ) : (
        <p>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign up</Link>
        </p>
      )}
    </div>
  );
};

export default Homepage;

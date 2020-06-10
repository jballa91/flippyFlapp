import React from "react";
import { useAuth0 } from "../flippy-flapp-spa";

import { Link } from "react-router-dom";

const NavBar = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <div>
      {!isAuthenticated && (
        <button onClick={() => loginWithRedirect({})}>Log in</button>
      )}

      {isAuthenticated && <button onClick={() => logout()}>Log Out</button>}

      {isAuthenticated && (
        <span>
          <Link to="/">Home</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/external-api">External API</Link>
          <Link to='/dashboard'>Dashboard</Link>
        </span>
      )}
    </div>
  );
};

export default NavBar;

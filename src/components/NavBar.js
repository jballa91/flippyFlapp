import React from "react";
import { useAuth0 } from "../flippy-flapp-spa";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Breadcrumbs,
} from "@material-ui/core";
import { Link } from "react-router-dom";

// Import styles

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const NavBar = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Link to="/">
          <h1>flippyFlapp</h1>
        </Link>
        <div>
          {isAuthenticated && (
            <span>
              <Link to="/">Home</Link>
              <Link to="/profile">Profile</Link>
              <Link to="/external-api">External API</Link>
              <Link to="/dashboard">Dashboard</Link>
            </span>
          )}
          <div>
            {!isAuthenticated && (
              <button onClick={() => loginWithRedirect({})}>Log in</button>
            )}
            {isAuthenticated && (
              <button onClick={() => logout()}>Log Out</button>
            )}
          </div>
        </div>
      </AppBar>
    </div>
  );
};

export default NavBar;

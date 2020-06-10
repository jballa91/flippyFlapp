import React from "react";
import { useAuth0 } from "../flippy-flapp-spa";
import { makeStyles } from "@material-ui/core/styles";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Button,
//   Breadcrumbs,
// } from "@material-ui/core";
import { Link } from "react-router-dom";

// Import styles
import styles from "../styles/navbar/Navbar.module.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    marginRight: theme.spacing(2),
  },
}));

const NavBar = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const classes = useStyles();

  return (
    <div className={styles.navbar}>
      <Link to="/" className={styles.navbar__left}>
        <h1 className={styles.navbar__title}>flippyFlapp</h1>
      </Link>
      <div className={styles.navbar__right}>
        {isAuthenticated && (
          <span className={styles.navbar__navlist}>
            <Link className={styles.navbar__navlink} to="/">
              Home
            </Link>
            <Link className={styles.navbar__navlink} to="/profile">
              Profile
            </Link>
            <Link className={styles.navbar__navlink} to="/external-api">
              External API
            </Link>
            <Link className={styles.navbar__navlink} to="/dashboard">
              Dashboard
            </Link>
          </span>
        )}
        <div>
          {!isAuthenticated && (
            <button
              className={styles.navbar__log_button}
              onClick={() => loginWithRedirect({})}
            >
              Log in
            </button>
          )}
          {isAuthenticated && (
            <button
              className={styles.navbar__log_button}
              onClick={() => logout()}
            >
              Log Out
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;

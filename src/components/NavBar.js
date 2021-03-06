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
import MapRoundedIcon from "@material-ui/icons/MapRounded";
import { Link } from "react-router-dom";

// Import styles

const useStyles = makeStyles((theme) => ({
  header: {},
  root: {
    flexGrow: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: theme.palette.primary.main,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    color: "#000",
    textDecorationColor: "white",
    marginLeft: theme.spacing(2),
  },
  navlink: {
    display: "flex",
    alignItems: "center",
    color: "#fff",
    textDecoration: "none",
    "&&:hover": {
      color: "#000",
    },
  },
  navicon: {
    marginRight: theme.spacing(1),
  },
  navtext: {},
  bread: {
    color: "white",
    marginRight: theme.spacing(2),
  },
  logBtn: {
    width: "100px",
    backgroundColor: theme.palette.secondary.main,
    borderRadius: "10px",
    color: "white",
    "&&:hover": {
      backgroundColor: theme.palette.secondary.light,
      color: "black",
    },
  },
}));

const NavBar = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const classes = useStyles();

  return (
    <div className={classes.header}>
      <AppBar className={classes.root} position="static">
        <Link to="/" className={classes.title}>
          <Typography variant="h4">flippyFlapp</Typography>
        </Link>
        <Toolbar>
          {isAuthenticated && (
            <Breadcrumbs className={classes.bread}>
              <Link className={classes.navlink} to="/" exact='true'>
                <MapRoundedIcon className={classes.navicon} fontSize="small" />
                <Typography variation="h6" className={classes.navtext}>
                  Dashboard
                </Typography>
              </Link>
            </Breadcrumbs>
          )}
          {!isAuthenticated && (
            <Button
              className={classes.logBtn}
              onClick={() => loginWithRedirect({})}
            >
              Log in
            </Button>
          )}
          {isAuthenticated && (
            <Button className={classes.logBtn} onClick={() => logout()}>
              Log Out
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;

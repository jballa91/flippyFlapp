import React from "react";
import { Router, Route, Switch } from "react-router-dom";

// Auth0 Imports
import { useAuth0 } from "./flippy-flapp-spa";
import PrivateRoute from "./components/PrivateRoute";

// Import History
import history from "./utils/history";

// Import Components
import NavBar from "./components/NavBar";
import Profile from "./components/Profile";
import ExternalAPI from "./views/ExternalApi";
import SplashPage from "./components/SplashPage";
import Dashboard from "./components/dashboard/Dashboard.js";
import { Backdrop, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

function App() {
  const { loading, isAuthenticated } = useAuth0();

  const classes = useStyles();

  if (loading) {
    return (
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return (
    <div className="App">
      <Router history={history}>
        <header>
          <NavBar />
        </header>
        <Switch>
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute path="/external-api" component={ExternalAPI} />
          {isAuthenticated && <PrivateRoute path="/" component={Dashboard} />}
          {!isAuthenticated && <Route path="/" exact component={SplashPage} />}
        </Switch>
      </Router>
    </div>
  );
}

export default App;

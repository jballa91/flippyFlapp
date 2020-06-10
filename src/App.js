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

import GoogleMaps from "./components/dashboard/customMap";

function App() {
  const { loading } = useAuth0();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <Router history={history}>
        <header>
          <NavBar />
        </header>
        <Switch>
          <Route path="/" exact />
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute path="/external-api" component={ExternalAPI} />
          <PrivateRoute path="/dashboard" component={GoogleMaps} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

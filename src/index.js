import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

// Auth0 imports
import { Auth0Provider } from "./flippy-flapp-spa";
import config from "./auth_config.json";
import history from "./utils/history";

//redux improts
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";

// Material UI Import
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import theme from "./theme/muiTheme";

const store = configureStore();

// Redirect user to correct place after login
const onRedirectCallback = (appState) => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

ReactDOM.render(
  <Auth0Provider
    domain={config.domain}
    client_id={config.clientId}
    redirect_uri={window.location.origin}
    audience={config.audience}
    onRedirectCallback={onRedirectCallback}
  >
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </Provider>
  </Auth0Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

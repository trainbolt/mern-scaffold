import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { MuiThemeProvider } from "@material-ui/core/styles";

// Theme
import theme from "./theme";

import App from "./App";
import history from "./history";
import { store, persistor } from "./store";

import "./assets/styles/index.scss";

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <MuiThemeProvider theme={theme}>
        <Router history={history}>
          <App />
        </Router>
      </MuiThemeProvider>
    </PersistGate>
  </Provider>,
  document.querySelector("#root")
);

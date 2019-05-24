import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import history from "./history";
import PropTypes from "prop-types";

// LayoutRoutes
import LoginLayoutRoute from "./routes/LoginLayoutRoute";
import DashboardLayoutRoute from "./routes/DashboardLayoutRoute";

// Actions
import AuthActions from "./actions/auth";

// Routes
import MainApp from "./routes";

// Views
import Login from "./views/login";
import Register from "./views/register";
import Dashboard from "./views/dashboard";

class App extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentDidMount() {
    this.props.checkLoginStatus(localStorage.getItem("JWT"));
  }

  render() {
    const { auth } = this.props;

    return (
      <Switch>
        <Route path="/" exact>
          <Redirect to="/login" />
        </Route>
        <LoginLayoutRoute path="/login" exact auth={auth} component={Login} />
        <LoginLayoutRoute
          path="/register"
          exact
          auth={auth}
          component={Register}
        />
        <DashboardLayoutRoute
          path="/app/dashboard"
          exact
          auth={auth}
          component={Dashboard}
        />
      </Switch>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
};

const mapDispatchToProps = dispatch => {
  return {
    checkLoginStatus: token => dispatch(AuthActions.checkLoginStatus(token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

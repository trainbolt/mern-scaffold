import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import history from "./history";
import PropTypes from "prop-types";

// LayoutRoutes
import LoginLayoutRoute from "./routes/LoginLayoutRoute";
import DashboardLayoutRoute from "./routes/DashboardLayoutRoute";

// Actions
import UserActions from "./actions/user";

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
    this.props.checkLoginStatus(this.props.user.token);
  }

  render() {
    const { user } = this.props;

    return (
      <Switch>
        <Route path="/" exact>
          <Redirect to="/login" />
        </Route>
        <LoginLayoutRoute path="/login" exact user={user} component={Login} />
        <LoginLayoutRoute
          path="/register"
          exact
          user={user}
          component={Register}
        />
        <DashboardLayoutRoute
          path="/app/dashboard"
          exact
          user={user}
          component={Dashboard}
        />
      </Switch>
    );
  }
}

const mapStateToProps = ({ user }) => {
  return { user };
};

const mapDispatchToProps = dispatch => {
  return {
    checkLoginStatus: token => dispatch(UserActions.checkLoginStatus(token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

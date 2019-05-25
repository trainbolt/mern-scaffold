import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, user, ...rest }) => {
  console.log("user", user);

  return (
    <Route
      {...rest}
      // eslint-disable-next-line
      render={props => {
        return user.requesting ? (
          <div>Loading...</div>
        ) : user.loggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        );
      }}
    />
  );
};

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(PrivateRoute);

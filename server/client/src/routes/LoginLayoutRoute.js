import React from "react";
import { Redirect, Route } from "react-router-dom";
import LoginLayout from "../layouts/login";

const LoginLayoutRoute = ({ component: Component, user, ...rest }) => {
  return user.requesting ? (
    <div>Loading...</div>
  ) : user.loggedIn ? (
    <Redirect to="/app/dashboard" />
  ) : (
    <Route
      {...rest}
      render={matchProps => (
        <LoginLayout>
          <Component {...matchProps} />
        </LoginLayout>
      )}
    />
  );
};

export default LoginLayoutRoute;

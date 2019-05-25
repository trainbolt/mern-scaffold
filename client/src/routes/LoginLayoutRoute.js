import React from "react";
import { Redirect, Route } from "react-router-dom";
import LoginLayout from "../layouts/login";

const LoginLayoutRoute = ({ component: Component, auth, ...rest }) => {
  return auth.requesting ? (
    <div>Loading...</div>
  ) : auth.loggedIn ? (
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

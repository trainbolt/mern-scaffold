import React from "react";
import { Route, Redirect } from "react-router-dom";
import DashboardLayout from "../layouts/dashboard";

const DashboardLayoutRoute = ({ component: Component, user, ...rest }) => {
  return user.requesting ? (
    <div>Loading...</div>
  ) : !user.loggedIn ? (
    <Redirect to="/login" />
  ) : (
    <Route
      {...rest}
      render={matchProps => (
        <DashboardLayout>
          <Component {...matchProps} />
        </DashboardLayout>
      )}
    />
  );
};

export default DashboardLayoutRoute;

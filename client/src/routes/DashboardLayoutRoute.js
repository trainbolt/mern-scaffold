import React from "react";
import { Route, Redirect } from "react-router-dom";
import DashboardLayout from "../layouts/dashboard";

const DashboardLayoutRoute = ({ component: Component, auth, ...rest }) => {
  return auth.requesting ? (
    <div>Loading...</div>
  ) : !auth.loggedIn ? (
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

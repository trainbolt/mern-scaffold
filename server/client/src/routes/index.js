import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

// Layout
import DashboardLayout from "../layouts/dashboard";

// Auth Check
import PrivateRoute from "../routes/PrivateRoute";

// Views
import Dashboard from "../views/dashboard";
// ... other views ...

class MainApp extends Component {
  render() {
    return (
      <DashboardLayout>
        <Switch>
          <Route path="/app/dashboard" exact component={Dashboard} />
          /* OTHER ROUTES HERE */
        </Switch>
      </DashboardLayout>
    );
  }
}

export default MainApp;

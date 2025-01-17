import React from "react";
import { Switch, Redirect } from "react-router-dom";

import Resume from "../resume/Resume";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import Logout from "../auth/Logout";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Dashboard from "../dashboard/Dashboard";

import ResumeBubbleProvider from "../resume/Resume.bubble";

function Routes() {
  return (
    <Switch>
      <PrivateRoute path="/resume/:id">
        <ResumeBubbleProvider>
          <Resume />
        </ResumeBubbleProvider>
      </PrivateRoute>
      <PrivateRoute path="/dashboard">
        <Dashboard />
      </PrivateRoute>
      <PrivateRoute path="/logout">
        <Logout />
      </PrivateRoute>
      <PublicRoute path={"/register"}>
        <Register />
      </PublicRoute>
      <PublicRoute path={"/login"}>
        <Login />
      </PublicRoute>
      <Redirect to="/dashboard" />
    </Switch>
  );
}

export default Routes;

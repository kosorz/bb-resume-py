import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Link,
  Redirect,
} from "react-router-dom";

import Resume from "../resume/Resume";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import Logout from "../auth/Logout";
import Login from "../auth/Login";

import ResumeBubbleProvider from "../resume/ResumeBubble";

function Routes() {
  return (
    <Router>
      <Switch>
        <PrivateRoute path="/resume/:id">
          <ResumeBubbleProvider>
            <Resume />
          </ResumeBubbleProvider>
        </PrivateRoute>
        <PrivateRoute path="/dashboard">
          <Link to={"/resume/1"}>Resume</Link>
        </PrivateRoute>
        <PrivateRoute path="/logout">
          <Logout />
        </PrivateRoute>
        <PublicRoute path={"/login"}>
          <Login />
        </PublicRoute>
        <Redirect to="/dashboard" />
      </Switch>
    </Router>
  );
}

export default Routes;

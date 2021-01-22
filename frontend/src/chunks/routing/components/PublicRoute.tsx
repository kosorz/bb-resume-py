import React, { ReactNode } from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "../../../util/auth";

const PublicRoute = ({
  children,
  ...rest
}: {
  children: ReactNode;
  path?: string | string[];
}) => {
  return (
    <Route
      {...rest}
      render={() =>
        isAuthenticated() ? <Redirect to="/dashboard" /> : children
      }
    />
  );
};

export default PublicRoute;

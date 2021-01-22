import React, { ReactNode } from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "../../../util/auth";

const PrivateRoute = ({
  children,
  ...rest
}: {
  children?: ReactNode;
  path?: string | string[];
}) => {
  return (
    <Route
      {...rest}
      render={() => (isAuthenticated() ? children : <Redirect to="/login" />)}
    />
  );
};

export default PrivateRoute;

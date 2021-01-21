import React, { FC, ReactNode } from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "../../../util/auth";

type PrivateRouteType = {
  children: ReactNode;
  path?: string | string[];
};

const PublicRoute: FC<PrivateRouteType> = ({ children, ...rest }: any) => {
  return (
    <Route
      {...rest}
      render={() =>
        isAuthenticated() === true ? <Redirect to="/dashboard" /> : children
      }
    />
  );
};

export default PublicRoute;

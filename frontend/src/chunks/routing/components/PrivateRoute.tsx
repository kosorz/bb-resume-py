import React, { FC, ReactNode } from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "../../../util/auth";

type PrivateRouteType = {
  children?: ReactNode;
  path?: string | string[];
  forcedRender?: any;
};

const PrivateRoute: FC<PrivateRouteType> = ({
  children,
  forcedRender,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={() =>
        isAuthenticated() === true ? children : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;

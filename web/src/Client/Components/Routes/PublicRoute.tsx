import React from "react";
import { Route, RouteProps } from "react-router-dom";

const PublicRoute = ({ component: Component, ...rest }: RouteProps) => {
  return <Route {...rest} render={props => <Component {...props} />} />;
};

export default PublicRoute;


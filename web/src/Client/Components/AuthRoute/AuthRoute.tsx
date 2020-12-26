import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { AppState } from "../../../Common/Redux/store";

const AuthRoute = ({ component: Component, ...rest }: RouteProps) => {
  const userid = useSelector((state: AppState) => state.auth.userid);

  return <Route {...rest} render={props => !userid ? <Component {...props} /> : <Redirect to="/" />} />;
};

export default AuthRoute;


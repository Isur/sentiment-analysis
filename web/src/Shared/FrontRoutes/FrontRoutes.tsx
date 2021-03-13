import React from "react";
import { Switch } from "react-router-dom";
import { AuthRoute, PrivateRoute, PublicRoute } from "../../Client/Components/Routes";
import { ErrorPage, Homepage, LoginPage, RegisterPage } from "../../Client/Pages";
import { RouteConfig } from "./Routes.interface";
import { PATHS } from "@shared/Constants";

const routesConfig: RouteConfig[] = [
  { path: PATHS.HOMEPAGE, exact: true, type: "PRIVATE", component: () => <Homepage /> },
  { path: PATHS.LOGIN, exact: true, type: "AUTH", component: () => <LoginPage /> },
  { path: PATHS.REGISTER, exact: true, type: "AUTH", component: () => <RegisterPage /> },
  { path: "*",  exact: false, type: "PUBLIC", component: () => <ErrorPage /> },
];

export const FrontRoutes = () => {
  const langPath = (path: string) => `/${_lang}/${path}`;
  return (
    <Switch>
      {routesConfig.map(route => {
          if(route.type === "AUTH") return <AuthRoute key={route.path} component={route.component} path={langPath(route.path)} exact={route.exact} />;
          if(route.type === "PUBLIC") return <PublicRoute key={route.path} component={route.component} path={langPath(route.path)} exact={route.exact} />;
          if(route.type === "PRIVATE") return <PrivateRoute key={route.path} component={route.component} path={langPath(route.path)} exact={route.exact} />;
          return null;
        })}
    </Switch>
  );
};

import React from "react";
import { Route, Switch } from "react-router-dom";
import { hot } from "react-hot-loader";
import PrivateRoute from "../Client/Components/PrivateRoute";
import Homepage from "../Client/Pages/Homepage";
import ErrorPage from "../Client/Pages/Error";
import LoginPage from "../Client/Pages/Auth/LoginPage";
import RegisterPage from "../Client/Pages/Auth/RegisterPage";
import AuthRoute from "../Client/Components/AuthRoute";
import "../Client/Styles/global.scss";

const App = () => {
  return (
    <div className="App">
      <>
        <Switch>
          <PrivateRoute path="/" exact component={Homepage} />
          <AuthRoute path="/login" exact component={LoginPage} />
          <AuthRoute path="/register" exact component={RegisterPage} />
          <PrivateRoute path="/private" exact component={Homepage} />
          <Route path="*" component={ErrorPage} />
        </Switch>
      </>
    </div>
  );
};

export default hot(module)(App);

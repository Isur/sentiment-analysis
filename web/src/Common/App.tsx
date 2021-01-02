import React from "react";
import { Route, Switch } from "react-router-dom";
import { hot } from "react-hot-loader";
import PrivateRoute from "../Client/Components/PrivateRoute";
import Homepage from "../Client/Pages/Homepage";
import Sentiment from "../Client/Pages/Sentiment";
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
          <Route path="/" exact component={Sentiment} />
          <AuthRoute path="/login" exact component={LoginPage} />
          <AuthRoute path="/register" exact component={RegisterPage} />
          <Route path="*" component={ErrorPage} />
        </Switch>
      </>
    </div>
  );
};

export default hot(module)(App);

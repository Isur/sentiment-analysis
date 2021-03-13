import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { LoginForm, validationSchemas } from "./LoginForm";
import { useRedirect } from "@client/Hooks";
import { Button, Input, Form } from "@client/Components";
import { login as Login } from "@shared/Redux/Auth";
import { AppState } from "@shared/Redux/store";
import { PATHS } from "@shared/Constants";
import "../Auth.scss";

const LoginContainer = () => {
  const dispatch = useDispatch();
  const redirect = useRedirect();
  const authError = useSelector((state: AppState) => state.auth.error);
  const { t } = useTranslation(["loginPage", "common"]);

  const handleLogin = async (data: LoginForm) => {
    dispatch(Login(data.login, data.password));
  };

  const handleRegister = () => {
    redirect(PATHS.REGISTER);
  };

  return (
    <div className="Auth">
      <h1> {t("login")} - {t("common:help")} </h1>
      <Form<LoginForm> onSubmit={handleLogin} validation={validationSchemas()} translation="loginPage">
        <Input name="login" />
        <Input name="password" type="password" />
        <p> {authError && t("loginFailed")} </p>
        <Button type="submit" content="Login" />
        <Button onClick={handleRegister} content="Register" />
      </Form>
    </div>
  );
};

export default LoginContainer;

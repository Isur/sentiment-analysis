import { push } from "connected-react-router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input } from "../../../Components";
import { login as Login } from "../../../../Common/Redux/Auth";
import { AppState } from "../../../../Common/Redux/store";

const LoginContainer = () => {
  const dispatch = useDispatch();
  const userid = useSelector((state: AppState) => state.auth.userid);
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    if(userid) {
      dispatch(push("/"));
    }
  }, [userid]);

  const handleLogin = async () => {
    dispatch(Login(login, password));
  };

  const handleChangeLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(event.target.value);
  };

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleRegister = () => {
    dispatch(push("/register"));
  };

  return (
    <div>
      <h1> LOGIN </h1>
      <Input name="login" value={login} onChange={handleChangeLogin} label="Email" placeholder="Enter your email" />
      <Input name="password" value={password} onChange={handleChangePassword} type="password" label="Password" placeholder="Enter your password" />
      <Button onClick={handleLogin} content="Login" />
      <Button onClick={handleRegister} content="Register" />
    </div>
  );
};

export default LoginContainer;

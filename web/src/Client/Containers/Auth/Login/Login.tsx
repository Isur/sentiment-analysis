import { push } from "connected-react-router";
import React, { useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { login as Login } from "../../../../Common/Redux/Auth";
import { AppState } from "../../../../Common/Redux/store";
import "./Login.scss";

interface LoginForm {
  login: string,
  password: string,
}

const LoginContainer = () => {
  const dispatch = useDispatch();
  const userid = useSelector((state: AppState) => state.auth.userid);

  useEffect(() => {
    if(userid) {
      dispatch(push("/"));
    }
  }, [userid]);

  const handleLogin = async (values: LoginForm) => {
    dispatch(Login(values.login, values.password));
  };

  const handleRegister = () => {
    dispatch(push("/register"));
  };

  return (
    <div className="Login">
      <Form name="login"
            className="login-form"
            onFinish={handleLogin}>
        <Form.Item name="login"
                   rules={[
                      {
                        required: true,
                        message: "Please input your Username!",
                      },
        ]}>
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item name="password"
                   rules={[
                      {
                        required: true,
                        message: "Please input your Password!",
                      },
        ]}>
          <Input prefix={<LockOutlined className="site-form-item-icon" />}
                 type="password"
                 placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="loginButton">
            Log in
          </Button>
          Or <a onClick={handleRegister}>register now!</a>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginContainer;

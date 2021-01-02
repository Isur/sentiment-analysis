import { push } from "connected-react-router";
import React from "react";
import { useDispatch } from "react-redux";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { AuthService } from "../../../Services";
import {  RegisterForm } from "./Register.interface";
import "./Register.scss";

const RegisterContainer = () => {
  const dispatcher = useDispatch();

  const handleRegister = async (values: RegisterForm) => {
    const resp = await AuthService.register(values);
    if(resp) dispatcher(push("/login"));
  };

  const handleLogin = () => {
    dispatcher(push("/login"));
  };

  return (
    <div className="Register">
      <Form name="register" className="register-form" onFinish={handleRegister}>
        <Form.Item name="username" rules={[{ required: true, message: "Please input your Username!" }]}>
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item name="email" rules={[{ required: true, message: "Please input your Email!" }]}>
          <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" type="email" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: "Please input your Password!" }]}>
          <Input prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" type="password" />
        </Form.Item>
        <Form.Item name="confirmPassword" rules={[{ required: true, message: "Please confirm your Password!" }]}>
          <Input prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Confirm Password" type="password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="register-button">
            Log in
          </Button>
          Or <a onClick={handleLogin}>register now!</a>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterContainer;

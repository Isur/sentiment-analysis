import { push } from "connected-react-router";
import React, { useReducer } from "react";
import { useDispatch } from "react-redux";
import { Button, Input } from "../../../Components";
import { AuthService } from "../../../Services";
import { RegisterActionPayload, RegisterState } from "./Register.interface";

const initState: RegisterState = {
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
};

const reducer = (state: RegisterState = initState, { field, value }: RegisterActionPayload) => ({
  ...state,
  [field]: value,
});

const RegisterContainer = () => {
  const [state, dispatch] = useReducer(reducer, initState);
  const dispatcher = useDispatch();

  const handleChange =  (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ field: event.target.name, value: event.target.value });
  };

  const handleSubmit = async () => {
    // TODO:  validate input data.
    const resp = await AuthService.register(state);
  };

  const handleLogin = () => {
    dispatcher(push("/login"));
  };

  return (
    <div className="Auth">
      <h1> REGISTER </h1>
      <Input name="email" value={state.email} onChange={handleChange} type="email" label="Email" placeholder="Enter your email address" error="error" />
      <Input name="username" value={state.username} onChange={handleChange} label="Username" placeholder="Enter your username" error="error" />
      <Input name="password" value={state.password} onChange={handleChange} type="password" label="Password" placeholder="Enter your password" error="error" />
      <Input name="confirmPassword" value={state.confirmPassword} onChange={handleChange} type="password" label="Confirm Password" placeholder="Confirm your password" />
      <Button content="Register" onClick={handleSubmit} />
      <Button content="Login" onClick={handleLogin} />
    </div>
  );
};

export default RegisterContainer;

import React from "react";
import { InputProps } from "./Input.interface";
import "./Input.scss";

const Input = (props: InputProps) => {
  const { label, error, ...rest } = props;
  return (
    <div className="Input">
      { label && <label> {label} </label> }
      <input {...rest} />
      <div className={`error ${error ? "" : "hidden"}`}> {error} </div>
    </div>
  );
};

export default Input;

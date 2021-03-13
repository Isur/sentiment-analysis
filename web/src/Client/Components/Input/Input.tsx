import React from "react";
import { InputProps } from "./Input.interface";
import "./Input.scss";

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { label, error, ...rest } = props;

  return (
    <div className="Input">
      { label && <label> {label} </label> }
      <input {...rest} ref={ref} />
      <div className={`error ${error ? "" : "hidden"}`}> {error} </div>
    </div>
  );
});

export default Input;

import React from "react";
import { ButtonProps } from "./Button.interface";
import "./Button.scss";

const Button = (props: ButtonProps) => {
  const { content, onClick, ...rest } = props;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if(props.onClick) props.onClick(event);
  };

  return <button className="Button" onClick={handleClick} {...rest}> {props.content} </button>;
};

export default Button;

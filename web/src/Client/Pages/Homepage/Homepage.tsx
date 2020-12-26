import React from "react";
import "./Homepage.scss";

const Homepage = () => {
  const today = new Date().toLocaleDateString();
  return (
    <div className="Homepage">
      <h1> {today} </h1>
    </div>
  );
};

export default Homepage;

import React, { Component } from "react";
import trip from "../../img/trip.jpg";

const Jumbo = () => {
  const style = {
    background: `url(${trip})`, // fondo login
    backgroundSize: "cover",
    backgroundPosition: "center center",
    width: "100%",
    height: "100vh",
  };
  return (
    <div className="jumbo" style={{trip}}>
  </div>
  );
};

export default Jumbo;
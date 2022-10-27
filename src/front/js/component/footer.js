import React, { Component } from "react";
import ImageUrl from "../../img/3.png";

const Footer = () => {
	const style = {
		background: `url(${ImageUrl})`, // fondo login
		backgroundSize: "cover",
		backgroundPosition: "center center",
		width: "100%",
		height: "25vh",
	  };
	  return(
	<footer className="footer" style={style}>
		{/* <img src={ImageUrl}/> */}
	</footer>
);}

export default Footer;
import React from "react";
import logo from "../assets/logo3.png"; // Replace with VKU logo
import "../css/hero.css";

const Hero = () => (
  <div className="hero-container">
    <div className="hero-content">
      <img className="hero-logo" src={logo} alt="VKU logo" />
      <h1 className="hero-title">Welcome to VKU</h1>
      <p className="hero-description">
        Discover a world of innovation and technology at Vietnam-Korea University
        of Information and Communication Technology. Join us in shaping the future
        with cutting-edge education and research.
      </p>
    </div>
  </div>
);

export default Hero;
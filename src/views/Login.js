import React from "react";
import vkuLogo from '../assets/logo2.png';
import imageVku from '../assets/sict2.jpg';
import { Button } from "reactstrap";
import "../App.css";
import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
    const {
        isAuthenticated,
        loginWithRedirect,
      } = useAuth0();
      return (
<div className="text-center hero my-5 ">
    <div>
    <img className="mb-3 " src={vkuLogo} alt="vku-logo" width="100%" />
    <br/>
    <img className="mb-3 " src={imageVku} alt="vku-img" width="100%" />
    </div>

    <div className="btn-login">
        <Button  className="login-btn" color="success"
        onClick={ () => loginWithRedirect({connection: 'google-oauth2'})}>
            ĐĂNG NHẬP HỆ THỐNG ĐÀO TẠO
        </Button>
    </div>
  </div>
      )
    };

export default Login;
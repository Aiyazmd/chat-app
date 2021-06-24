import React from "react";
import { GoogleOutlined, FacebookOutlined } from "@ant-design/icons";
import "firebase/app";

import { auth } from "../firebase";
import firebase from "firebase/app";

function Login() {
  return (
    <div id="login-page">
      <div className="main_heading">
        <h1>friend's App</h1>
      </div>
      <div id="login-card">
        <h2>Welcome to chat room</h2>
        <div
          className="login-button google"
          onClick={() =>
            auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
          }
        >
          <GoogleOutlined /> Sign In With Google
        </div>
        <br />
        <br />
        <div
          className="login-button facebook"
          onClick={() =>
            auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider())
          }
        >
          <FacebookOutlined /> Sign In With Facebook
        </div>
      </div>
    </div>
  );
}

export default Login;

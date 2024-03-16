import React, { useState } from "react";
import ReactDOM from "react-dom";
import FormInput from "./FormInput";
import Button from "./Button";
import "./Modal.css";
import styles from "./LoginModal.module.css";

const OverLay = (props) => {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const handleUsernameChange = (e) => setUsernameInput(e.target.value);
  const handlePasswordChange = (e) => setPasswordInput(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (usernameInput !== "" && passwordInput !== "") {
      props.handleLogin(usernameInput, passwordInput);
      setUsernameInput("");
      setPasswordInput("");
    } else {
      console.log("Please provide a valid input");
      setUsernameInput("");
      setPasswordInput("");
    }
  };

  return (
    <div className="backdrop">
      <div className={`modal ${styles["login-modal"]}`}>
        <div>
          <Button
            className="btn-close"
            onClick={() => props.setShowLoginModal(false)}
          >
            X
          </Button>
        </div>
        <p className={styles["header"]}>Login</p>
        <div>
          <label htmlFor="username">Username:</label>
          <FormInput
            id="username"
            className="login-input"
            placeholder="Username"
            onChange={handleUsernameChange}
            value={usernameInput}
          ></FormInput>
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <FormInput
            id="password"
            type="password"
            className="login-input"
            placeholder="Password"
            onChange={handlePasswordChange}
            value={passwordInput}
          ></FormInput>
        </div>
        <div>
          <Button className="btn-login" onClick={handleSubmit}>
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

const LoginModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <OverLay
          setShowLoginModal={props.setShowLoginModal}
          handleLogin={props.handleLogin}
        ></OverLay>,
        document.getElementById("modal-root")
      )}
    </>
  );
};

export default LoginModal;

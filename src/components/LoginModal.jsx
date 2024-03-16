import React from "react";
import ReactDOM from "react-dom";
import FormInput from "./FormInput";
import Button from "./Button";
import "./Modal.css";
import styles from "./LoginModal.module.css";

const OverLay = (props) => {
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
            type="text"
            className="login-input"
            placeholder="Username"
          ></FormInput>
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <FormInput
            id="password"
            type="password"
            className="login-input"
            placeholder="Password"
          ></FormInput>
        </div>
        <div>
          <Button className="btn-login" onClick={props.handleLogin}>
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

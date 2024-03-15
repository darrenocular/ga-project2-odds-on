import React from "react";
import ReactDOM from "react-dom";
import FormInput from "./FormInput";
import Button from "./Button";
import "./Modal.css";
import styles from "./LoginModal.module.css";

const OverLay = (props) => {
  return (
    <div>
      <Button />
      <h1>Login</h1>
      <FormInput />
      <FormInput />
      <Button />
    </div>
  );
};

const LoginModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <OverLay></OverLay>,
        document.getElementById("modal-root")
      )}
    </>
  );
};

export default LoginModal;

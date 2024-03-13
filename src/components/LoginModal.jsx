import { Button } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom";
import FormInput from "./FormInput";

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

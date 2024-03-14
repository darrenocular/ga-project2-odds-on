import React from "react";
import styles from "./FormInput.module.css";

const FormInput = (props) => {
  return (
    <input
      type="text"
      className={`${styles[props.className]} ${styles.input}`}
      placeholder={props.placeholder}
    ></input>
  );
};

export default FormInput;

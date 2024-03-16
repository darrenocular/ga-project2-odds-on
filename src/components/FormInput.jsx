import React from "react";
import styles from "./FormInput.module.css";

const FormInput = (props) => {
  return (
    <input
      id={props.id}
      type={props.type}
      className={`${styles[props.className]} ${styles.input}`}
      placeholder={props.placeholder}
    ></input>
  );
};

export default FormInput;

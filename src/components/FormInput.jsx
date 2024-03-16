import React from "react";
import styles from "./FormInput.module.css";

const FormInput = (props) => {
  return (
    <input
      id={props.id}
      type={props.type}
      className={`${styles[props.className]} ${styles.input}`}
      placeholder={props.placeholder}
      onChange={props.onChange}
      name={props.name}
      value={props.value}
    ></input>
  );
};

export default FormInput;

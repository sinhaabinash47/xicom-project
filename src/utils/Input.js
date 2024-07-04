import React from "react";

const Input = ({ type, customClass, ...props }) => {
  return <input type={type} className={customClass} {...props} />;
};

export default Input;

import React from "react";

const Textarea = ({ type, customClass, ...props }) => {
  return <textarea type={type} className={customClass} {...props} />;
};

export default Textarea;
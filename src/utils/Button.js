import React from 'react';

const Button = ({ type, customButton, onClick, children, ...props }) => {
  return (
    <button type={type} className={customButton} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

export default Button;

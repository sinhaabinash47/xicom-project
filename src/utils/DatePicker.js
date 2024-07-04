import React from "react";

const DatePicker = ({ value, onChange, className, min, max, ...props }) => {
  return (
    <input
      type="date"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={className}
      min={min}
      max={max}
      {...props}
    />
  );
};

export default DatePicker;

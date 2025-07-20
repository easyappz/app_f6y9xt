import React from 'react';

const Textarea = ({ placeholder, value, onChange, name, rows = 3, required = false }) => {
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
      rows={rows}
      required={required}
    />
  );
};

export default Textarea;

import React from "react";
import "./formStyle.css";

const FormComponent = ({
  placeholder,
  name,
  value,
  handleChange,
  handleSubmit,
  buttonTag,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={handleChange}
      />
      <button className="inputBotton">{buttonTag}</button>
    </form>
  );
};

export default FormComponent;

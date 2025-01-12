/* eslint-disable react/prop-types */
import React from "react";

function Input({ id, type, name, className = "", placeholder, required = false, spellCheck = false, value, onChange = () => { } }) {
  return (
    <input
      id={ id }
      type={ type }
      name={ name }
      spellCheck={ spellCheck }
      className={ `${className} bg-white placeholder-gray-500 border hover:shadow-md border-gray-300 text-black text-sm rounded-md focus:outline-none focus:ring focus:ring-blue-300 focus:border-blue-300 block w-full py-2 px-2.5 dark:bg-neutral-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-600` }
      placeholder={ placeholder }
      value={ value }
      onChange={ onChange }
      required={ required }
    />
  );
}

export default Input;
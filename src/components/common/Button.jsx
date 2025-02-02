import React from "react";

/* eslint-disable react/prop-types */
function Button({ className = "", children, outline = false, submit = false, onClick = null, disabled = false }) {
  return (
    !outline
      ? (
        <button
          type={ submit ? 'submit' : 'button' }
          disabled={ disabled } 
          onClick={ onClick }
          className={ `${className} ${disabled ? 'bg-blue-400 dark:bg-blue-900 text-neutral-300 cursor-not-allowed' : 'hover:shadow-md bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 text-white'} font-medium rounded-md text-sm px-3 py-2 focus:outline-none` }
        >
          { children }
        </button>
      )
      : (
        <button
          type={ submit ? 'submit' : 'button' }
          onClick={ onClick }
          className={ `${className} text-neutral-700 hover:shadow-md hover:text-white border border-gray-300 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-md text-sm px-3 py-2 text-center dark:border-gray-600 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800` }
        >
          { children }
        </button>
      )
  );
}

export default Button;
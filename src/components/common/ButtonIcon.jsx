import React from "react";

/* eslint-disable react/prop-types */
function ButtonIcon({ className = "", children, outline = false, onClick = null, disabled = false }) {
  return (
    !outline
      ? <button onClick={ onClick } disabled={ disabled } type="button" className={ `${className} ${disabled ? 'bg-blue-400 dark:bg-blue-500 cursor-not-allowed' : 'hover:shadow-md bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'} text-white focus:outline-none font-medium rounded-md text-sm px-3 py-2 text-center inline-flex items-center` }>
        { children }
      </button>
      : <button onClick={ onClick } disabled={ disabled } type="button" className={ `${className} hover:shadow-md text-neutral-800 hover:text-white border border-gray-300 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-md text-sm dark:border-gray-600 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800 px-3 py-2 text-center inline-flex items-center` }>
        { children }
      </button>
  );
}

export default ButtonIcon;
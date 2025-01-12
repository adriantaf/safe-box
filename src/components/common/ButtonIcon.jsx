import React from "react";

/* eslint-disable react/prop-types */
function ButtonIcon({ className = "", children, outline = false, onClick = null }) {
  return (
    !outline
      ? <button onClick={ onClick } type="button" className={ `${className} hover:shadow-md text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-3 py-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800` }>
        { children }
      </button>
      : <button onClick={ onClick } type="button" className={ `${className} hover:shadow-md text-neutral-800 hover:text-white border border-gray-300 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-md text-sm dark:border-gray-600 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800 px-3 py-2 text-center inline-flex items-center` }>
        { children }
      </button>
  );
}

export default ButtonIcon;
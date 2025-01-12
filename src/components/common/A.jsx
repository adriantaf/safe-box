/* eslint-disable react/prop-types */
function A({ className = "", href, children }) {
  function handleClick() {
    window.electronAPI.openExternal(href);
  }

  return (
    <span className={ `${className} hover:underline hover:cursor-pointer` } onClick={ handleClick }>
      { children }
    </span>
  );
}

export default A;
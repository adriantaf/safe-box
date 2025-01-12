import React from "react";

/* eslint-disable react/prop-types */
const ExternalLink = ({ href, children, className }) => {
  const handleClick = (event) => {
    event.preventDefault();
    window.electronAPI.openExternalLink(href);
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
};

export default ExternalLink;
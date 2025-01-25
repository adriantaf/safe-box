import React from "react";
import A from './components/common/A';
import Button from "./components/common/Button";

function PageInfo() {
  function handleClick() {
    window.electronAPI.closeInfoWindow();
  }

  return (
    <article className="h-screen text-neutral-900 bg-white dark:text-white dark:bg-neutral-900 flex flex-col">
      <div className="p-3">
        <p>Versión <span className="font-mono">1.1.1</span></p>
        <p>Desarrollado por <A className="text-blue-700 dark:text-blue-300" href="https://github.com/adriantaf">Adrian Tafoya</A></p>
      </div>
      <div className="p-3 mt-auto bg-blue-50 border-t border-t-slate-200 dark:border-t-neutral-600 flex justify-end dark:bg-cyan-950">
        <Button className="bg-neutral-50 dark:bg-neutral-800" outline onClick={ handleClick }>Aceptar</Button>
      </div>
    </article>
  )
}

export default PageInfo;

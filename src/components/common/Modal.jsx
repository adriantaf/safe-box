/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from "react";
import ButtonRef from "./ButtonRef";

function Modal({ title, content, onClick }) {
  const buttonRef = useRef(null);

  useEffect(() => {
    buttonRef.current.focus();
  }, [])

  return (
    <div className="h-screen w-screen absolute top-0 left-0 flex items-center justify-center z-[2000] bg-neutral-900/30">
      <article className="min-h-28 text-neutral-900 bg-white dark:text-white dark:bg-neutral-900 flex flex-col border border-slate-200 dark:border-neutral-600 rounded-lg whitespace-nowrap shadow-xl">
        <div className="p-3 bg-zinc-50 border-b border-b-slate-200 dark:border-b-neutral-600 dark:bg-zinc-950 rounded-t-lg">
          <h2 className="text-xl font-semibold">{ title }</h2>
        </div>
        <div className="p-3 pb-10 pr-24">
          { content }
        </div>
        <div className="p-3 mt-auto bg-blue-50 border-t rounded-b-lg border-t-slate-200 dark:border-t-neutral-600 flex justify-end dark:bg-cyan-950">
          <ButtonRef ref={ buttonRef } className="bg-neutral-50 dark:bg-neutral-800" outline onClick={ onClick }>Aceptar</ButtonRef>
        </div>
      </article>
    </div>
  )
}

export default Modal;
/* eslint-disable react/prop-types */
import React from "react";

function Modal({ title, children }) {
  return (
    <article className="h-screen w-screen absolute top-0 left-0 flex items-center justify-center">
      <div className="relative z-[1000] min-w-96 h-40 bg-neutral-50 rounded-lg border border-slate-300 shadow-lg">
        <div className="p-3 bg-neutral-200 rounded-t-lg border-b border-b-slate-300">
          <h2 className="font-bold text-xl">{ title }</h2>
        </div>
        <div className="p-3">
          <p>{ children }</p>
        </div>
      </div>
    </article>
  )
}

export default Modal;
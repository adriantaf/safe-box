import React from "react";
import A from "./common/A";

function Footer() {
  return (
    <footer className='bg-neutral-100 mt-auto dark:text-neutral-300 text-right border-t border-t-neutral-700 dark:bg-neutral-800 '>
      <div className='mx-auto p-4'>
        <div className='mx-auto'>
          <small>Desarrollador: <A href="https://adriantaf.github.io" className='text-teal-600 dark:text-teal-200 hover:underline'>Adrian Tafoya</A></small>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
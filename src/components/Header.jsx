import React from "react";
import ButtonIcon from "./common/ButtonIcon";
import Add from "../assets/icons/add";
import { useFormData } from "../context/FormPassDataProvider";
import Logo from '../assets/logo/safe-box.png';

function Header() {
  const { formVisibility, setFormVisibility } = useFormData();

  return (
    <header className="relative z-[1000] col-span-2 border-b border-b-gray-300 dark:border-b-neutral-700">
      <div className='mx-auto h-full w-full py-3 px-4 inline-flex items-center justify-between gap-2'>
        <div className="flex items-center gap-2">
          <img
            src={ Logo }
            className="size-10 rounded-lg border-2 border-gray-400 dark:border-gray-600"
            alt="Logotipo de SafeBox"
          />
          <span className="font-bold font-mono text-3xl">SafeBox</span>
        </div>
        <div className='flex justify-end'>
          <ButtonIcon
            disabled={ formVisibility }
            className='gap-3 mb-0 me-0'
            onClick={ () => setFormVisibility(true) }>
            <Add className="size-5" /> Agregar Contraseña
          </ButtonIcon>
        </div>
      </div>
    </header>
  );
}

export default Header;
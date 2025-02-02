import React from "react";
import ButtonIcon from "./common/ButtonIcon";
import Add from "../assets/icons/add";
import Info from "../assets/icons/info";
import A from './common/A';
import { useFormData } from "../context/FormPassDataProvider";
import Logo from '../assets/logo/safe-box.png';
import { useModal } from "../context/ModalProvider";

function Header() {
  const { formVisibility, setFormVisibility } = useFormData();
  const { showModal } = useModal();
  const APP_VERSION = "1.1.3";

  function showModalInfo() {
    const content = (
      <>
        <p>Versión: <span className="font-mono">{ APP_VERSION }</span></p>
        <p>Desarrollador: <A className="text-blue-700 dark:text-blue-300" href="https://github.com/adriantaf">Adrian Tafoya</A></p>
      </>
    )
    showModal(content, "Información");
  }

  return (
    <>
      <header className="relative z-[1000] col-span-2 border-b border-b-gray-300 dark:border-b-neutral-700">
        <div className='mx-auto h-full w-full py-3 px-4 inline-flex items-center justify-between gap-2'>
          <div className="flex items-center gap-2">
            <img
              src={ Logo }
              className="size-10 rounded-lg border-2 border-gray-400 dark:border-gray-600"
              alt="Logotipo de SafeBox"
            />
            <span className="font-bold font-mono text-3xl dark:text-neutral-100">SafeBox</span>
          </div>
          <div className='flex justify-end gap-2'>
            <ButtonIcon outline className='gap-3 mb-0 me-0' onClick={ showModalInfo }>
              <Info className="size-5" />
            </ButtonIcon>
            <ButtonIcon
              disabled={ formVisibility }
              className='gap-3 mb-0 me-0'
              onClick={ () => setFormVisibility(true) }>
              <Add className="size-5" /> Agregar Contraseña
            </ButtonIcon>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
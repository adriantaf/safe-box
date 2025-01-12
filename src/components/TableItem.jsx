/* eslint-disable react/prop-types */
import Copy from "../assets/icons/copy";
import Show from "../assets/icons/show";
import Edit from "../assets/icons/edit";
import ButtonIcon from "./common/ButtonIcon";
import React, { useRef, useState } from "react";
import Hidden from "../assets/icons/hidden";
import { useFormData } from "../context/FormPassDataProvider";

function TableItem({ id, platform, username, password, creationDate, updateDate }) {
  const { setDataForm, setFormVisibility } = useFormData();
  const inputPass = useRef(null);
  const [passVisible, setPassVisible] = useState(false);

  function handleVisibiltyPass() {
    setPassVisible((prev) => !prev);
  }

  function handleCopyPaste() {
    navigator.clipboard.writeText(inputPass.current.value)
      .then(() => {
        console.log('Texto copiado al portapapeles!');
      })
      .catch(err => {
        console.log('Error al copiar el texto. Mas detalles: ', err);
      });
  }

  function handleEdit() {
    setDataForm(() => {
      return {
        id: id,
        platform: platform,
        username: username,
        password: password,
        creationDate: creationDate, 
        updateDate: updateDate
      }
    });
    setFormVisibility(true);
    window.scrollTo(0,0);
  }

  return (
    <tr id={ id } className="dark:hover:bg-opacity-75 hover:bg-gray-50 dark:hover:bg-zinc-800 text-black dark:text-neutral-100">
      <td className="px-2 py-3 pl-3">
        { platform }
      </td>
      <td className="px-2 py-3">
        { username }
      </td>
      <td className="px-2 py-3">
        <div>
          <label htmlFor="small-input" className="block sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseñas</label>
          <input
            ref={ inputPass }
            type={ passVisible ? "text" : "password" }
            id="small-input"
            className="font-mono block w-full p-2 px-0 text-gray-900  bg-transparent text-sm focus:outline-none dark:placeholder-gray-400 dark:text-neutral-100"
            readOnly
            value={ password } />
        </div>
      </td>
      <td className="px-2 py-3 text-right">
        <div className="flex gap-2 justify-end">
          <ButtonIcon outline className="me-0 mb-0 py-2.5 px-0" onClick={ handleVisibiltyPass }>
            { !passVisible
              ? (<Show className="size-4" />)
              : (<Hidden className="size-4" />)
            }
          </ButtonIcon>
          <ButtonIcon outline className="me-0 mb-0 py-2.5 px-0" onClick={ handleCopyPaste }>
            <Copy className="size-4" />
          </ButtonIcon>
          <ButtonIcon outline className="me-0 mb-0 py-2.5 px-0" onClick={ handleEdit }>
            <Edit className="size-4" />
          </ButtonIcon>
        </div>
      </td>
    </tr>
  );
}

export default TableItem;
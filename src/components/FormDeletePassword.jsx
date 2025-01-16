import React, { useState } from "react";
import { useFormData } from "../context/FormPassDataProvider";
import { useDataFromDB } from "../context/DataFromDBProvider";
import Button from "./common/Button";
import Input from "./common/Input";

function FormDeletePassword() {
  const { setDataOfDB } = useDataFromDB();
  const { setFormVisibility, dataForm, setDataForm } = useFormData();
  const [confirmPassVisible, setConfirmPassVisible] = useState(false);
  const [confirmDeletePassValue, setConfirmDeletePassValue] = useState('');
  const [confirmDeletePassMessage, setConfirmDeletePassMessage] = useState('');

  async function handleDeletePass(e) {
    e.preventDefault();

    if (confirmDeletePassValue === "CONFIRMO") {
      await window.electronAPI.db.delete(dataForm.id);
      const updatedData = await window.electronAPI.db.selectAll();
      setDataForm(null);
      setDataOfDB(updatedData);
      setFormVisibility(false);
    } else {
      setConfirmDeletePassValue('');
      setConfirmDeletePassMessage('La palabra de confirmacion fue incorrecta');
    }
  }

  function handleDeleteConfirmation() {
    setConfirmPassVisible(true);
  }

  return (
    <form onSubmit={ handleDeletePass } className="border-t border-t-gray-300 dark:border-t-gray-600 p-4">
      <h3 className="font-medium text-xl text-red-500 dark:text-red-400 mb-2">Zona de peligro</h3>
      <div className="flex gap-3 justify-between items-center flex-wrap">
        <div>
          <p><b className="font-normal">Eliminar esta contraseña</b></p>
          <p className="text-neutral-700 dark:text-neutral-300 text-sm">Una vez que elimines una contraseña, no podrás volver atrás.</p>
        </div>
        { confirmPassVisible
          ? (
            <div className="flex flex-col gap-2 items-start mb-28">
              <p className="text-sm">Para eliminar esta contraseña escriba &quot;<b>CONFIRMO</b>&quot; en el siguiente recuadro de texto</p>
              <Input
                value={ confirmDeletePassValue }
                onChange={ (e) => setConfirmDeletePassValue(e.target.value) }
                placeholder="Confirme aqui"
                className="border-red-600 focus:ring-red-300 dark:border-red-400 dark:focus:ring-red-800 focus:border-red-500 dark:focus:border-red-500"
              />
              { confirmDeletePassMessage && (
                <p className="mb-2 text-sm text-red-500 dark:text-red-200 animate-bounce">{ confirmDeletePassMessage }</p>
              ) }
              <div className="flex gap-2 justify-end w-full">
                <Button
                  outline
                  submit
                  onClick={ handleDeletePass }
                  className="text-red-500 border-red-600 focus:ring-red-300 hover:bg-red-600 dark:border-red-400 dark:text-red-200 dark:hover:text-red-400 dark:focus:ring-red-800 dark:hover:bg-red-950"
                >
                  Eliminar
                </Button>
                <Button
                  className="me-0 mb-0"
                  outline
                  onClick={ () => {
                    setConfirmPassVisible(false);
                    setConfirmDeletePassValue('');
                  } }>
                  Cancelar
                </Button>
              </div>
            </div>
          )
          :
          (
            <Button
              outline
              onClick={ handleDeleteConfirmation }
              className="text-red-500 border-red-600 focus:ring-red-300 hover:bg-red-600 dark:border-red-400 dark:text-red-200 dark:hover:text-red-400 dark:focus:ring-red-800 dark:hover:bg-red-950"
            >
              Eliminar esta contraseña
            </Button>
          )
        }
      </div>
    </form>
  );
}

export default FormDeletePassword;
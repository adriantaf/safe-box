import Button from "./common/Button";
import A from "./common/A";
import ButtonIcon from "./common/ButtonIcon";
import Show from "../assets/icons/show";
import Hidden from "../assets/icons/hidden";
import Generate from "../assets/icons/generate";
import { useEffect, useState } from "react";
import generatePass from "../scripts/generate-passwords";
import Input from "./common/Input";
import { useFormData } from "../context/FormPassDataProvider";
import { useDataFromDB } from "../context/DataFromDBProvider";
import React from "react";

function FormPassword() {
  const { setDataOfDB } = useDataFromDB();
  const { setFormVisibility, dataForm, setDataForm } = useFormData();
  const [passVisible, setPassVisible] = useState(false);
  const [confirmPassVisible, setConfirmPassVisible] = useState(false);
  const [confirmDeletePassValue, setConfirmDeletePassValue] = useState('');
  const [confirmDeletePassMessage, setConfirmDeletePassMessage] = useState('');

  const [platformValue, setPlatformValue] = useState('');
  const [usernameValue, setUsernameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [lastUpdate, setLastUpdate] = useState('');

  useEffect(() => {
    if (dataForm) {
      setPlatformValue(dataForm.platform);
      setUsernameValue(dataForm.username);
      setPasswordValue(dataForm.password);
      setLastUpdate(dataForm.updateDate);
    }
  }, [dataForm]);

  function handleChangePlatform(e) {
    setPlatformValue(e.target.value);
  }

  function handleChangeUsername(e) {
    setUsernameValue(e.target.value);
  }

  function handleChangePassword(e) {
    setPasswordValue(e.target.value);
  }

  function handleVisibility() {
    setPassVisible(prev => !prev);
  }

  function getPassword() {
    const password = generatePass();
    setPasswordValue(password);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (dataForm) {
      if (platformValue !== dataForm.platform) {
        await window.electronAPI.db.updatePlatform(dataForm.id, platformValue);
      }
      if (usernameValue !== dataForm.username) {
        await window.electronAPI.db.updateUsername(dataForm.id, usernameValue);
      }
      if (passwordValue !== dataForm.password) {
        await window.electronAPI.db.updatePassword(dataForm.id, passwordValue);
      }
      if (platformValue !== dataForm.platform || usernameValue !== dataForm.username || passwordValue !== dataForm.password) {
        await window.electronAPI.db.updateDate(dataForm.id, Date.now());
      }
    } else {
      await window.electronAPI.db.insert(platformValue, usernameValue, passwordValue, Date.now());
    }

    const updatedData = await window.electronAPI.db.selectAll();
    setDataOfDB(updatedData);
    setPlatformValue('');
    setUsernameValue('');
    setPasswordValue('');
    setFormVisibility(false);
  }

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
    <>
      <form
        onSubmit={ handleSubmit }
        className="flex flex-col gap-3 p-4"
      >
        <div className={`${dataForm ? 'mb-1' : 'mb-4'} w-full items-center justify-between flex gap-2`}>
          <h3 className="font-medium text-xl">
            { dataForm ? 'Editor' : '' }
          </h3>
          <div className="flex gap-2">
            <Button
              className="me-0 mb-0"
              outline
              onClick={ () => {
                setFormVisibility(false);
                setDataForm(null);
              } }>
              Cancelar
            </Button>
            <Button className="me-0 mb-0" submit>
              {
                dataForm ? 'Actualizar' : 'Guardar'
              }
            </Button>
          </div>
        </div>
        { dataForm && (
          <div className="text-sm mb-3">
            { dataForm.creationDate && `${dataForm.creationDate === lastUpdate ? 'Fecha de creacion:' : 'Ultima modificación:'} ${new Date(parseInt(lastUpdate)).toLocaleDateString('es-mx', { year:"numeric", weekday:'short', month:"long", day:"numeric", hour12:true, hour:'numeric', minute:'2-digit'}) }`
            }
          </div>
        ) }
        <div>
          <label
            htmlFor="platform"
            className="block mb-2 sr-only text-sm font-medium text-gray-900 dark:text-white">
            Plataforma
          </label>
          <Input
            id="platform"
            type="text"
            name="platform"
            placeholder="Plataforma"
            value={ platformValue }
            onChange={ handleChangePlatform }
            required
          />
        </div>
        <div>
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium sr-only text-gray-900 dark:text-white">
            Nombre de usuario
          </label>
          <Input
            id="username"
            type="text"
            name="username"
            placeholder="Nombre de usuario"
            value={ usernameValue }
            onChange={ handleChangeUsername }
            required
          />
        </div>
        <div>
          <label
            htmlFor="pass"
            className="block mb-2 sr-only text-sm font-medium text-gray-900 dark:text-white">
            Contraseña
          </label>
          <div className="flex gap-1 items-center">
            <Input
              id="pass"
              type={ passVisible ? "text" : "password" }
              name="pass"
              className='font-mono'
              placeholder="Contraseña"
              value={ passwordValue }
              onChange={ handleChangePassword }
              required />
            <ButtonIcon
              outline
              className="me-0 mb-0 py-2.5 px-0"
              onClick={ handleVisibility }>
              { !passVisible
                ? (<Show className="size-4" />)
                : (<Hidden className="size-4" />)
              }
            </ButtonIcon>
            <ButtonIcon className="me-0 mb-0 py-2.5 px-0" outline onClick={ getPassword }>
              <Generate className="size-4" />
            </ButtonIcon>
          </div>
        </div>
      </form>
      { dataForm && (
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
      ) }
      <div className="mt-auto text-sm text-right p-4">
        <small>Desarrollado por <A className="text-purple-800 dark:text-purple-300" href="https://github.com/adriantaf">Adrian TM</A></small>
      </div>
    </>
  );
}

export default FormPassword;
import React, { useEffect, useState } from "react";
import ButtonIcon from "./common/ButtonIcon";
import Show from "../assets/icons/show";
import Hidden from "../assets/icons/hidden";
import Generate from "../assets/icons/generate";
import generatePass from "../scripts/generate-passwords";
import { useFormData } from "../context/FormPassDataProvider";
import { useDataFromDB } from "../context/DataFromDBProvider";
import Button from "./common/Button";
import Input from "./common/Input";

function FormPassword() {
  const { setDataOfDB } = useDataFromDB();
  const { setFormVisibility, dataForm, setDataForm } = useFormData();

  const [passVisible, setPassVisible] = useState(false);
  const [lastUpdate, setLastUpdate] = useState('');
  const [platformValue, setPlatformValue] = useState('');
  const [usernameValue, setUsernameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  function isModify() {
    return (platformValue !== dataForm.platform || usernameValue !== dataForm.username || passwordValue !== dataForm.password);
  }

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
    const dateNow = Date.now();

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
      if (isModify()) {
        await window.electronAPI.db.updateDate(dataForm.id, dateNow);
      }
    } else {
      await window.electronAPI.db.insert(platformValue, usernameValue, passwordValue, dateNow);
    }

    const updatedData = await window.electronAPI.db.selectAll();
    setDataOfDB(updatedData);
    setPlatformValue('');
    setUsernameValue('');
    setPasswordValue('');
    setFormVisibility(false);
  }

  useEffect(() => {
    if (dataForm) {
      setPlatformValue(dataForm.platform);
      setUsernameValue(dataForm.username);
      setPasswordValue(dataForm.password);
      setLastUpdate(dataForm.updateDate);
    }
  }, [dataForm]);

  return (
    <form
      onSubmit={ handleSubmit }
      className="flex flex-col gap-3 p-4"
    >
      <div className={ `${dataForm ? 'mb-1' : 'mb-4'} w-full items-center justify-between flex gap-2` }>
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
          <Button disabled={ dataForm && !isModify() } className="me-0 mb-0" submit>
            {
              dataForm ? 'Actualizar' : 'Guardar'
            }
          </Button>
        </div>
      </div>
      { dataForm && (
        <div className="text-sm mb-3">
          { dataForm.creationDate && `${dataForm.creationDate === lastUpdate ? 'Fecha de creacion:' : 'Ultima modificación:'} ${new Date(parseInt(lastUpdate)).toLocaleDateString('es-mx', { year: "numeric", weekday: 'short', month: "long", day: "numeric", hour12: true, hour: 'numeric', minute: '2-digit' })}`
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
  );
}

export default FormPassword;
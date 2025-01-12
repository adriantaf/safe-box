/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const FormDataContext = createContext();

export function FormPassDataProvider({ children }) {
  const [dataForm, setDataForm] = useState(null);
  const [formVisibility, setFormVisibility] = useState(false);

  return (
    <FormDataContext.Provider value={ { dataForm, setDataForm, formVisibility, setFormVisibility } }>
      { children }
    </FormDataContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useFormData() {
  const context = useContext(FormDataContext);

  if (!context) {
    throw new Error("Esta usando FormDataContext fuera de FormPassDataProvider");
  }

  return context;
}

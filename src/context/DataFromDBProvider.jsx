/* eslint-disable react/prop-types */
import React, { createContext, useContext, useEffect, useState } from "react";

const DataFromDBContext = createContext();

export function DataFromDBProvider({ children }) {
  const [dataOfDB, setDataOfDB] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await window.electronAPI.db.selectAll();
        setDataOfDB(data);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <DataFromDBContext.Provider value={ { dataOfDB, setDataOfDB } }>
      { children }
    </DataFromDBContext.Provider>
  )
}

export function useDataFromDB() {
  const context = useContext(DataFromDBContext);

  if (!context) {
    throw new Error("Esta usando DataFromDBContext fuera de DataFromDBProvider");
  }

  return context;
}

import FormPassword from './components/FormPassword';
import Table from './components/Table';
import Header from './components/Header';
import { useFormData } from './context/FormPassDataProvider';
import React from 'react';
import { useDataFromDB } from './context/DataFromDBProvider';
import Key from "./assets/icons/key.jsx";

function App() {
  const { formVisibility } = useFormData();
  const { dataOfDB } = useDataFromDB();

  return (
    <>
      <div className='grid h-screen text-neutral-900 bg-white dark:text-white bg-neutral-white dark:bg-neutral-900 grid-cols-[1fr_auto] grid-rows-[auto_1fr] overflow-hidden gap-x-0 gap-y-4'>
        <Header />
        <main className='px-4 pb-2 pt-0 overflow-y-auto overflow-x-auto'>
          { dataOfDB === null ? (
            <div className="h-full flex justify-center items-center border bg-neutral-50 border-gray-300 dark:border-gray-600 dark:bg-slate-950 rounded-lg shadow-lg">
              <h2 className='font-medium text-xl'>Cargando datos...</h2>
            </div>
          ) : dataOfDB.length === 0 ? (
            <div className='h-full flex justify-center flex-col items-center border bg-neutral-50 border-gray-300 dark:border-gray-600 dark:bg-slate-950 rounded-lg shadow-lg'>
              <h2 className='font-medium text-xl'>
                Aún no has guardado ninguna contraseña.
              </h2>
              <Key className="size-20 text-neutral-400" />
            </div>
          ) : (
            <Table dataFromDB={ dataOfDB } />
          ) }
        </main>
        { formVisibility && (
          <aside className='w-[450px] flex flex-col gap-3 rounded-lg border border-gray-300 bg-white dark:bg-zinc-900 dark:border-gray-600 overflow-y-auto mb-2 mr-2'>
            <FormPassword />
          </aside>
        ) }
      </div>
    </>
  )
}

export default App;

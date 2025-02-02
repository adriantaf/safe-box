import Table from './components/Table';
import Header from './components/Header';
import { useFormData } from './context/FormPassDataProvider';
import React from 'react';
import { useDataFromDB } from './context/DataFromDBProvider';
import Key from "./assets/icons/key.jsx";
import Aside from './components/Aside.jsx';

function App() {
  const { formVisibility } = useFormData();
  const { dataOfDB } = useDataFromDB();

  return (
    <>
      <div className='grid h-screen text-neutral-900 bg-white dark:text-white dark:bg-neutral-900 sm:grid-cols-[1fr_auto] grid-cols-[1fr] grid-rows-[auto_1fr] overflow-hidden gap-x-0 gap-y-0'>
        <Header />
        <main className='px-4 pb-2 pt-0 overflow-y-auto overflow-x-hidden'>
          { dataOfDB === null ? (
            <section>
              <div className="h-full flex justify-center items-center border bg-neutral-50 border-gray-300 dark:border-gray-600 dark:bg-slate-950 rounded-lg shadow-lg">
                <h2 className='font-medium text-xl'>Cargando datos...</h2>
              </div>
            </section>
          ) : dataOfDB.length === 0 ? (
            <section className='h-full w-full pt-4 pb-2'>
              <div className='h-full flex justify-center flex-col items-center border bg-neutral-50 border-gray-300 dark:border-gray-600 dark:bg-slate-950 rounded-lg shadow-lg'>
                <h2 className='font-medium text-xl'>
                  Aún no has guardado ninguna contraseña.
                </h2>
                <Key className="size-20 text-neutral-400" />
              </div>
            </section>
          ) : (
            <Table dataFromDB={ dataOfDB } />
          ) }
        </main>
        { formVisibility && (
          <Aside />
        ) }
      </div>
    </>
  )
}

export default App;

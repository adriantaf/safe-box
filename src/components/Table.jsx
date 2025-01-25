/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from "react";
import TableItem from "./TableItem";
import InputRef from "./common/InputRef";

function Table({ dataFromDB }) {
  const [filterData, setFiilterData] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const refSearch = useRef(null)

  useEffect(() => {
    setSearchValue('');
    setFiilterData(dataFromDB);
  }, [dataFromDB]);

  function handleSearch(e) {
    let query = e.target.value;
    setSearchValue(query);

    let filtered = dataFromDB.filter((item) =>
      item.platform.toLowerCase().includes(query.toLowerCase()) ||
      item.username.toLowerCase().includes(query.toLowerCase())
    );

    setFiilterData(filtered);
  }

  return (
    <div className="w-auto">
      <section className="pb-4 pt-1">
        <form className="flex gap-2 justify-end">
          <div className="inline-flex w-[400px] gap-1">
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Buscar</label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-700 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              </div>
              <InputRef
                ref={ refSearch }
                id="default-search"
                type="input"
                className="block w-full ps-10"
                value={ searchValue }
                placeholder="Buscar..."
                onChange={ handleSearch }
                required />
            </div>
          </div>
        </form>
      </section>
      <section className="rounded-lg border overflow-x-auto border-gray-300 dark:border-gray-600 whitespace-normal w-full">
        <table className="w-full text-sm text-left text-zinc-800 dark:text-zinc-300">
          <thead className="sticky top-0 z-10 bg-neutral-50 text-zinc-600 dark:text-zinc-400 border-b border-b-gray-300 shadow-sm dark:bg-gray-900 dark:border-b-gray-600">
            <tr>
              <th className="px-2 py-3 pl-3">
                Plataforma
              </th>
              <th className="px-2 py-3">
                Cuenta
              </th>
              <th className="px-2 py-3">
                Contraseña
              </th>
              <th className="px-2 py-3">
              </th>
            </tr>
          </thead>
          <tbody>
            { filterData && filterData.map((item) => (
              <TableItem
                id={ item.id }
                platform={ item.platform }
                username={ item.username }
                password={ item.password }
                creationDate={ item['creation_date'] }
                updateDate={ item['update_date'] }
                key={ item.id }
              />
            )) }
          </tbody>
        </table>
      </section>
    </div>
  )
}

export default Table;
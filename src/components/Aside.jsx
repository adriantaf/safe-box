import React from "react";
import FormPassword from "./FormPassword";
import A from "./common/A";
import FormDeletePassword from "./FormDeletePassword";
import { useFormData } from "../context/FormPassDataProvider";

function Aside() {
  const { dataForm } = useFormData();
  return (
    <aside className='w-[350px] flex flex-col gap-3 rounded-lg border border-gray-300 bg-white dark:bg-zinc-900 dark:border-gray-600 overflow-y-auto mb-2 mr-2'>
      <FormPassword />
      { dataForm && (
        <FormDeletePassword />
      )}
      <div className="mt-auto text-sm text-right p-4">
        <small>Desarrollado por <A className="text-purple-800 dark:text-purple-300" href="https://github.com/adriantaf">Adrian TM</A></small>
      </div>
    </aside>
  );
}

export default Aside;
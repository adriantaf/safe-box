import React from "react";
import FormPassword from "./FormPassword";
import FormDeletePassword from "./FormDeletePassword";
import { useFormData } from "../context/FormPassDataProvider";

function Aside() {
  const { dataForm } = useFormData();
  return (
    <aside className='w-[350px] flex flex-col gap-3 border-l border-l-gray-300 bg-neutral-50 dark:bg-zinc-900 dark:border-l-gray-600 overflow-y-auto'>
      <FormPassword />
      { dataForm && (
        <FormDeletePassword />
      )}
    </aside>
  );
}

export default Aside;
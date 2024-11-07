/* eslint-disable @typescript-eslint/no-explicit-any */
import ItemService from "@/services/ItemService";
import { useState, useRef } from "react";
import AsyncSelect from "react-select/async";
import ItemsReportsTable from "../Tables/ItemsReportsTable";
import { BsFillPrinterFill } from "react-icons/bs";

import { useReactToPrint } from "react-to-print";

function ItemReport() {
  const [items, setItems] = useState<any>([]);
  const [isGetAllItem, setIsGetAllItems] = useState(false);
  console.log(isGetAllItem);

  const contentRef = useRef(null);

  const loadOptionItems = (searchValue: any, callback: any) => {
    ItemService.search(searchValue).then((res: any) => {
      const options = res.map((item: any) => ({
        label: `${item.name} ${item.barcode}`,
        value: item.code,
      }));
      callback(options);
    });
  };
  console.log(items);

  const handlePrint = useReactToPrint({ contentRef });

  return (
    <section className="w-full h-screen">
      {/* heading */}
      <div className="text-3xl text-center mt-14 tablet:mt-5 font-lato-extrabold ">
        BizX <span className="mr-5 text-green-500">Catelog</span>{" "}
        <span className="px-3 py-1 tracking-widest uppercase rounded-lg bg-slate-300 text-formHeaderBg">
          Report
        </span>
      </div>
      <div className="mt-5 text-3xl text-center uppercase font-lato-extrabold ">
        {" "}
        Item Report
      </div>

      {/* search  item */}
      <div className="mt-5">
        <AsyncSelect
          loadOptions={loadOptionItems}
          onChange={async (selectedValue: any) => {
            console.log(selectedValue);

            await ItemService.search(selectedValue.label.split(" ")[1]).then(
              (res: any) => {
                setItems((prevItems: any) => [...prevItems, res[0]]);
              }
            );
          }}
        />
        <div className="flex items-center mt-3 mb-4">
          <input
            id="default-checkbox"
            type="checkbox"
            value=""
            onChange={() => {
              setIsGetAllItems((prev) => !prev);
            }}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="default-checkbox"
            className="text-sm font-medium text-gray-900 ms-2 dark:text-gray-300"
          >
            Get All Items
          </label>
        </div>
      </div>

      {/* item master table */}
      <div className="flex justify-end w-full p-2 mt-5 bg-slate-100 ">
        <button
          className={`text-right  ${
            items.length === 0 && !isGetAllItem && "opacity-45"
          }`}
          onClick={() => handlePrint()}
          disabled={items.length === 0 && !isGetAllItem}
        >
          <BsFillPrinterFill size={25} />
        </button>
      </div>

      {/* this is under pagination but if you necessarily 
      need you can clone this but withut pagination in hidden class that print that component */}
      <div className="w-[350px] tablet:w-full overflow-scroll mt-5">
        <ItemsReportsTable
          items={items}
          ref={contentRef}
          allItemsState={isGetAllItem}
        />
      </div>
    </section>
  );
}

export default ItemReport;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef } from "react";
import AsyncSelect from "react-select/async";

import { BsFillPrinterFill } from "react-icons/bs";

import { useReactToPrint } from "react-to-print";
import CustomerServices from "@/services/CustomerServices";
import CustomerReportsTable from "../Tables/CustomerReportsTable";

function ItemReport() {
  const [customer, setCustomer] = useState<any>([]);
  const [isGetAllCustomers, setIsGetAllCustomers] = useState(false);
  console.log(isGetAllCustomers);

  const contentRef = useRef(null);

  const loadOptionItems = (searchValue: any, callback: any) => {
    CustomerServices.search(searchValue).then((res: any) => {
      const options = res.map((customer: any) => ({
        label: `${customer.firstName} ${customer.secondName} ${customer.code}`,
        value: customer.code,
      }));
      callback(options);
    });
  };
  console.log(customer);

  const handlePrint = useReactToPrint({ contentRef });

  return (
    <section className="w-full h-screen m-3">
      {/* heading */}
      <div className="text-3xl text-center mt-14 tablet:mt-5 font-lato-extrabold ">
        BizX <span className="mr-5 text-green-500">Catelog</span>{" "}
        <span className="px-3 py-1 uppercase rounded-lg bg-slate-300 text-formHeaderBg">
          Report
        </span>
      </div>
      <div className="mt-5 text-3xl text-center uppercase font-lato-extrabold ">
        {" "}
        Customer Report
      </div>

      {/* search  item */}
      <div className="mt-5">
        <AsyncSelect
          loadOptions={loadOptionItems}
          onChange={async (selectedValue: any) => {
            console.log(selectedValue);

            await CustomerServices.search(
              selectedValue.label.split(" ")[1]
            ).then((res: any) => {
              setCustomer((prevItems: any) => [...prevItems, res[0]]);
            });
          }}
        />
      </div>
      <div className="flex items-center mt-3 mb-4">
        <input
          id="default-checkbox"
          type="checkbox"
          value=""
          onChange={() => {
            setIsGetAllCustomers((prev) => !prev);
          }}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          htmlFor="default-checkbox"
          className="text-sm font-medium text-gray-900 ms-2 dark:text-gray-300"
        >
          Get All Customers
        </label>
      </div>

      {/* item master table */}
      <div className="flex justify-end w-full p-2 mt-5 bg-slate-100 ">
        <button
          className={`text-right ${
            customer.length === 0 && !isGetAllCustomers && "opacity-45"
          }`}
          onClick={() => handlePrint()}
          disabled={customer.length === 0 && !isGetAllCustomers}
        >
          <BsFillPrinterFill size={20} />
        </button>
      </div>
      {/* <div ref={contentRef}>Content to print</div> */}
      <div className="w-[350px] tablet:w-full  overflow-scroll mt-5">
        <CustomerReportsTable
          customers={customer}
          ref={contentRef}
          allCustomersState={isGetAllCustomers}
        />
      </div>
    </section>
  );
}

export default ItemReport;

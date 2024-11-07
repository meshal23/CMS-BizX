/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from "react";
import { DatePicker } from "../ui/DatePicker";
import { BsFillPrinterFill } from "react-icons/bs";
import { useQuery } from "@tanstack/react-query";
import SalesQuotationService from "@/services/SalesQuotationService";

import { useReactToPrint } from "react-to-print";
import DetailsSQReportsTable from "../Tables/DetailsSQReportsTable";
import CustomerServices from "@/services/CustomerServices";
import AsyncSelect from "react-select/async";
import { Skeleton } from "../ui/skeleton";
// import DetailsSQReportsTable from "../Tables/DetailsSQReportsTable";

function DetailsSalesQuotationReport() {
  const [date, setDate] = useState<Date>();
  const [customer, setCustomer] = useState("");

  const contentRef = useRef(null);
  const handlePrint = useReactToPrint({ contentRef });

  // reason not using ISOString is it is picking the previous date of "date" state
  const filteredDate = date?.toLocaleDateString("en-CA").split("T")[0];
  console.log(filteredDate);
  console.log(date);
  console.log(customer);

  //   -------------- get customer data -----------------------
  const {
    data: customerData,

    isSuccess: customerIsSuccess,
  } = useQuery({
    queryKey: ["customerData"],
    queryFn: async () => {
      return await CustomerServices.getAll();
    },
  });

  if (customerIsSuccess) {
    console.log(customerData);
  }

  const customerLoadOptions = (searchValue: any, callback: any) => {
    CustomerServices.search(searchValue).then((res: any) => {
      const options = res.map((cus: any) => ({
        label: `${cus.firstName} ${cus.secondName}`,
        value: cus.code,
      }));
      callback(options);
    });
  };

  //   ------------------ get sales quotation data ----------------
  const {
    data: salesQuotationData,
    isLoading,
    isSuccess,
    isError,
  } = useQuery({
    queryKey: ["salesQuotationData"],
    queryFn: async () => {
      return await SalesQuotationService.getAll();
    },
  });

  if (isSuccess) {
    // console.log(salesQuotationData);
    // salesQuotationData
    //   .filter((quo: any) => quo.date.split(" ")[0] === filteredDate)
    //   .map((item: any) => console.log(item));
    console.log(
      salesQuotationData
        ?.filter((quo: any) => quo.date.split(" ")[0] === filteredDate)
        ?.flatMap((quo: any) => quo.stockHistoryTemps)
    );
  }

  if (isError) {
    console.log("unexpected error");
  }

  return (
    <section className="w-full min-h-screen">
      <div className="flex justify-between w-full gap-1 tablet:gap-2">
        {/* search the date */}
        <DatePicker date={date} setDate={setDate} />
        <AsyncSelect
          className="tablet:w-[275px] w-[175px]"
          loadOptions={customerLoadOptions}
          placeholder="Select Customer"
          isClearable
          onChange={(selectedValue: any) => {
            setCustomer(selectedValue.label);
          }}
        />
      </div>

      {/* print button */}
      <div className="flex justify-end w-full p-2 mt-5 bg-slate-100 ">
        <button
          className={`text-right  ${date === undefined && "opacity-45"}`}
          onClick={() => handlePrint()}
        >
          <BsFillPrinterFill size={25} />
        </button>
      </div>

      {/* details sales quotation table */}
      {isLoading ? (
        <Skeleton />
      ) : (
        <DetailsSQReportsTable
          ref={contentRef}
          quotations={salesQuotationData?.filter(
            (quo: any) =>
              quo.date.split(" ")[0] === filteredDate &&
              quo.customer.secondName === customer.split(" ")[1]
          )}
          customer={customer}
          quoDate={filteredDate}
        />
      )}
    </section>
  );
}

export default DetailsSalesQuotationReport;

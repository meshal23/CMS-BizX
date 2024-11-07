/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from "react";
import { DatePicker } from "../ui/DatePicker";
import { BsFillPrinterFill } from "react-icons/bs";
import { useQuery } from "@tanstack/react-query";
import SalesQuotationService from "@/services/SalesQuotationService";
import PeriodicSQReportsTable from "../Tables/PeriodicSQReportsTable";

import { useReactToPrint } from "react-to-print";

function PeriodicSalesQuotationReport() {
  const [fromdate, setFromDate] = useState<Date>();
  const [todate, setToDate] = useState<Date>();

  const contentRef = useRef(null);

  // reason not using ISOString is it is picking the previous date of "date" state
  const filteredFromDate = fromdate?.toLocaleDateString("en-CA").split("T")[0];
  console.log(filteredFromDate);
  console.log(fromdate);

  const filteredToDate = todate?.toLocaleDateString("en-CA").split("T")[0];
  console.log(filteredToDate);
  console.log(todate);

  const {
    data: salesQuotationData,
    // isLoading,
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
    salesQuotationData
      .filter((quo: any) => quo.date.split(" ")[0] === filteredFromDate)
      .map((item: any) => console.log(item));
  }

  if (isError) {
    console.log("unexpected error");
  }

  const filteredData = salesQuotationData?.filter((quo: any) => {
    if (filteredFromDate && filteredToDate) {
      return quo.date >= filteredFromDate && quo.date <= filteredToDate;
    } else if (filteredFromDate) {
      return quo.date >= filteredFromDate;
    } else if (filteredToDate) {
      return quo.date <= filteredToDate;
    } else {
      return true;
    }
  });

  console.log(filteredData);
  console.log(filteredData?.flatMap((quo: any) => quo.stockHistoryTemps));

  const handlePrint = useReactToPrint({ contentRef });

  return (
    <section className="w-full min-h-screen">
      {/* search from date */}
      <DatePicker date={fromdate} setDate={setFromDate} placeholder={"from"} />

      {/* search To date */}
      <DatePicker date={todate} setDate={setToDate} placeholder={"To"} />
      {/* print button */}
      <div className="flex justify-end w-full p-2 mt-5 bg-slate-100 ">
        <button
          className={`text-right  ${
            fromdate === undefined && todate === undefined && "opacity-45"
          }`}
          onClick={() => handlePrint()}
        >
          <BsFillPrinterFill size={25} />
        </button>
      </div>

      {/* daily sales quotation table */}
      <PeriodicSQReportsTable
        ref={contentRef}
        quotations={filteredData?.flatMap((quo: any) => quo.stockHistoryTemps)}
      />
    </section>
  );
}

export default PeriodicSalesQuotationReport;

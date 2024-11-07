/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from "react";
import { DatePicker } from "../ui/DatePicker";
import { BsFillPrinterFill } from "react-icons/bs";
import { useQuery } from "@tanstack/react-query";
import SalesQuotationService from "@/services/SalesQuotationService";
import DailySQReportTable from "../Tables/DailySQReportTable";
import { useReactToPrint } from "react-to-print";
import { Skeleton } from "../ui/skeleton";

function DailySalesQuotationReport() {
  const [date, setDate] = useState<Date>();
  const contentRef = useRef(null);
  const handlePrint = useReactToPrint({ contentRef });

  // reason not using ISOString is it is picking the previous date of "date" state
  const filteredDate = date?.toLocaleDateString("en-CA").split("T")[0];
  console.log(filteredDate);
  console.log(date);

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
    salesQuotationData
      .filter((quo: any) => quo.date.split(" ")[0] === filteredDate)
      .map((item: any) => console.log(item));
  }

  if (isError) {
    console.log("unexpected error");
  }

  return (
    <section className="w-full min-h-screen">
      {/* search the date */}
      <DatePicker date={date} setDate={setDate} />

      {/* print button */}
      <div className="flex justify-end w-full p-2 mt-5 bg-slate-100 ">
        <button
          className={`text-right  ${date === undefined && "opacity-45"}`}
          onClick={() => handlePrint()}
        >
          <BsFillPrinterFill size={25} />
        </button>
      </div>

      {/* daily sales quotation table */}
      {isLoading ? (
        <Skeleton />
      ) : (
        <DailySQReportTable
          ref={contentRef}
          quotations={salesQuotationData?.filter(
            (quo: any) => quo.date.split(" ")[0] === filteredDate
          )}
        />
      )}
    </section>
  );
}

export default DailySalesQuotationReport;

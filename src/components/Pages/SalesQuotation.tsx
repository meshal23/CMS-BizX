/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import FormModals from "../Forms/FormModals";
import SalesQuotationService from "@/services/SalesQuotationService";
import { Toaster } from "react-hot-toast";
import { SkeletonCard } from "../Card/SkeletonCard";
import { SalesQuotationCard } from "../Card/SalesQuotationCard";
import { useState } from "react";

function SalesQuotation() {
  const [quotation, setQuotation] = useState("");

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
    console.log(salesQuotationData);
  }

  if (isError) {
    console.log("unexpected error");
  }

  return (
    <section className="flex flex-col items-center justify-center w-full min-h-screen gap-2 m-2 ">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="mt-10">
        <label
          htmlFor="small-input"
          className="block mb-2 text-sm font-medium text-gray-900 pocket:max-tablet:hidden dark:text-white"
        >
          Search Customer
        </label>
        <input
          type="text"
          onChange={(e) => setQuotation(e.target.value)}
          placeholder="Search Customer"
          id="small-input"
          className="block w-[300px] tablet:w-[500px] p-2 mb-4 text-xs text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      {isLoading ? (
        <SkeletonCard />
      ) : (
        salesQuotationData
          ?.filter((quo: any) => {
            if (quotation === "") return [];
            else if (quotation !== "") {
              return quo.customer.secondName
                .toLowerCase()
                .includes(quotation.toLowerCase());
            }
          })
          .map((cus: any, idx: any) => {
            return (
              <SalesQuotationCard
                key={idx}
                name={`${cus.customer.firstName} ${cus.customer.secondName}`}
                phone1={cus.customer.phone1}
                email={cus.customer.email}
                stockHistoryTemps={cus.stockHistoryTemps}
                totalQuo={cus.totalAmount}
              />
            );
          })
      )}
      {/* form here */}
      <FormModals formName="sales-quotation" />
    </section>
  );
}

export default SalesQuotation;

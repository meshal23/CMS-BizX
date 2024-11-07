/* eslint-disable @typescript-eslint/no-explicit-any */
import FormModals from "../Forms/FormModals";
import { useQuery } from "@tanstack/react-query";
import CustomerServices from "@/services/CustomerServices";
import { SkeletonCard } from "../Card/SkeletonCard";
import { CustomerCard } from "../Card/CustomerCard";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";

function Customer() {
  const [customer, setCustomer] = useState("");
  const {
    data: customerData,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["customerData"],
    queryFn: async () => {
      return await CustomerServices.getAll();
    },
  });

  if (isSuccess) {
    console.log(customerData);
  }

  if (isError) {
    return toast.error("Getting customer data failed");
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
          onChange={(e) => setCustomer(e.target.value)}
          placeholder="Search Customer"
          id="small-input"
          className="block w-[300px] tablet:w-[500px] p-2 mb-4 text-xs text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      {isLoading ? (
        <SkeletonCard />
      ) : (
        customerData
          ?.filter((cus: any) => {
            if (customer === "")
              return true; // Always include the element if customer is empty
            else if (
              cus.secondName !== null &&
              cus.secondName.toLowerCase().includes(customer.toLowerCase())
            ) {
              return true; // Include the element if secondName is not null and matches the search term
            }
            return false;
          })
          .map((cus: any, idx: any) => {
            return (
              <CustomerCard
                key={idx}
                name={`${cus.firstName} ${cus.secondName}`}
                phone1={cus.phone1}
                email={cus.email}
              />
            );
          })
      )}

      {/* form for creating customer */}
      <div className="">
        <FormModals formName="customer" />
      </div>
    </section>
  );
}

export default Customer;

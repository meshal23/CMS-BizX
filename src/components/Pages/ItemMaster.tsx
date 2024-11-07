/* eslint-disable @typescript-eslint/no-explicit-any */

import FormModals from "../Forms/FormModals";
import { ItemCard } from "../Card/ItemCard";
import { useQuery } from "@tanstack/react-query";
import ItemService from "@/services/ItemService";
import { Skeleton } from "../ui/skeleton";

import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";

function ItemMaster() {
  const {
    data: itemData,
    isLoading,
    isSuccess,
    isError,
  } = useQuery({
    queryKey: ["itemData"],
    queryFn: async () => {
      return await ItemService.getAll();
    },
  });

  if (isSuccess) {
    console.log(itemData);
  }

  if (isError) {
    toast.error("Cannot get data");
  }

  const [item, setItem] = useState("");

  return (
    <section className="flex flex-col items-center justify-center w-full min-h-screen overflow-hidden">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="mt-12 ">
        <label
          htmlFor="small-input"
          className="block mb-2 text-sm font-medium text-gray-900 pocket:max-tablet:hidden dark:text-white"
        >
          Search Item
        </label>
        <input
          type="text"
          placeholder="Search Item"
          onChange={(e) => setItem(e.target.value)}
          id="small-input"
          className="block placeholder:tablet:hidden w-[300px] tablet:w-[500px] p-2 mb-4 text-xs text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>

      <div className="flex flex-col gap-2">
        {isLoading ? (
          <Skeleton />
        ) : (
          itemData
            .filter((itemSearch: any) => {
              if (item === "") return [];
              else if (item !== "") {
                return itemSearch.name
                  .toLowerCase()
                  .includes(item.toLowerCase());
              }
            })
            .map((item: any, idx: any) => {
              return (
                <ItemCard
                  key={idx}
                  name={item.name}
                  description={item.description}
                  minStock={item.minStock}
                  maxStock={item.maxStock}
                  costPrice={item.costPrice}
                  retailPrice={item.retailPrice}
                  wholesalePrice={item.wholesalePrice}
                  itemImages={item.itemImages}
                />
              );
            })
        )}
      </div>

      {/* form open button */}
      <FormModals formName="item" />
    </section>
  );
}

export default ItemMaster;

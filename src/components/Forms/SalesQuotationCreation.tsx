/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  // DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"

import { IoMdAdd } from "react-icons/io";
import { Form } from "react-router-dom";

import { Stepper } from "react-form-stepper";

import { useEffect, useState } from "react";
import CustomerServices from "@/services/CustomerServices";
import ItemService from "@/services/ItemService";

import { Controller, useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";
// import AsynchronousSelect from "../AsyncSelect";
import AsyncSelect from "react-select/async";
// import { useQuery } from "@tanstack/react-query";
import { currency } from "@/currency";
import toast from "react-hot-toast";
import SalesQuotationTable from "../Tables/SalesQuotationTable";
import SalesQuotationService from "@/services/SalesQuotationService";

import { MdDelete } from "react-icons/md";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const today = new Date().toISOString().split("T")[0];

export default function SalesQuotationCreation() {
  const initCurrentStockValue = {
    quantity: "",
    costPrice: "",
    wholesalePrice: "",
    retailPrice: "",
    discountPercentage: "",
    discountAmount: "",
    stock: "",
  };

  const [activeStep, setActiveStep] = useState(0);
  const [currentStock, setCurrentStock] = useState(initCurrentStockValue);

  const navigate = useNavigate();

  // const [currentlySelectedItem, setCurrentlySelectedItem] = useState(undefined);

  const yupSchema = yup.object({
    customer: yup.mixed().notRequired(),
    date: yup.string().notRequired(),
    remarks: yup.string().notRequired(),
    stockHistoryTemps: yup.array().of(
      yup.object({
        stockCode: yup.string().notRequired(),
        quantity: yup.number().min(1).required("Quantity is required"),
        discountPercentage: yup.number().notRequired(),
        itemMaster: yup.object().notRequired(),
        subTotalAmount: yup.number().notRequired(),
        discountTotal: yup.number().notRequired(),
        totalAmount: yup.number().notRequired(),
        discountAmount: yup.number().notRequired(),
        costPrice: yup.number().notRequired(),
        wholesalePrice: yup.number().notRequired(),
        retailPrice: yup.number().notRequired(),
      })
    ),
    discountAmount: yup.number().notRequired(),
    discountPercentage: yup.number().notRequired(),
    quotationDiscount: yup.number().notRequired(),
    discountTotal: yup.number().notRequired(),
    totalAmount: yup.number().notRequired(),
    subTotalAmount: yup.number().notRequired(),
  });

  const {
    register,
    formState: { errors },
    control,
    setValue,
    getValues,
    handleSubmit,
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(yupSchema),
    defaultValues: {
      customer: undefined,
      date: today,
      remarks: "",
      stockHistoryTemps: [
        {
          stockCode: undefined,
          quantity: 0,
          discountPercentage: 0,
          itemMaster: {},
          subTotalAmount: 0,
          discountTotal: 0,
          totalAmount: 0,
          discountAmount: 0,
          costPrice: 0,
          wholesalePrice: 0,
          retailPrice: 0,
        },
      ],
      discountAmount: 0, // Entire quotation discount Amount
      discountPercentage: 0, // Entire quotation discount Percentage
      quotationDiscount: 0, //discountAmount + discountPercentage
      discountTotal: 0, // Line Discount + quotation Discount
      totalAmount: 0,
      subTotalAmount: 0,
    },
    mode: "onBlur",
  });

  const {
    fields: SHTFields,
    append,
    remove,
  } = useFieldArray({
    name: "stockHistoryTemps",
    control,
  });

  // const { fields: CSFields } = useFieldArray({
  //   name: "currentStocks",
  //   control,
  // });

  //item load

  // async select load options
  // customer load
  const customerLoadOptions = (searchValue: any, callback: any) => {
    CustomerServices.search(searchValue).then((res: any) => {
      const options = res.map((cus: any) => ({
        label: `${cus.firstName} ${cus.secondName}`,
        value: cus.code,
      }));
      callback(options);
    });
  };

  const itemLoadOptions = (searchValue: any, callback: any) => {
    ItemService.posSearchWithoutStock(searchValue).then((res: any) => {
      const options = res.map((stock: any) => ({
        label: `${stock.itemMaster.name}`,
        value: stock.itemMaster.code,
      }));
      setCurrentStock({
        ...currentStock,
        stock: options.value,
        costPrice: options.costPrice,
        retailPrice: options.retailPrice,
        wholesalePrice: options.wholesalePrice,
      });
      callback(options);
    });
  };

  const steps = [
    { label: "Sales Quotation" },
    { label: "Items" },
    // { label: "Contact Info" },
  ];

  useEffect(() => {
    console.log(currentStock);
  }, [itemLoadOptions, customerLoadOptions]);

  useEffect(() => {
    console.log("errors", errors);
    if (errors?.customer?.message) {
      toast.error(errors.customer.message);
    } else if (errors.stockHistoryTemps?.message) {
      toast.error("Select Item");
    }
  }, [errors]);

  const updateFieldValues = (fieldName: any, value: any) => {
    setValue(fieldName, value);
  };

  const handleStockDataChangeQuantity = (e: any) => {
    const { name } = e.target;
    const { value } = e.target;
    const index = Number(name.split(".")[1]);

    setValue(`stockHistoryTemps.${index}.quantity`, value);
    setCurrentStock({ ...currentStock, quantity: value });

    console.log(currentStock);

    updateCalculations(index);
  };

  const handleStockDataChangeDiscountPercentage = (e: any) => {
    const { name } = e.target;
    const { value } = e.target;
    const index = Number(name.split(".")[1]);

    setValue(`stockHistoryTemps.${index}.discountPercentage`, value);
    setCurrentStock({ ...currentStock, discountPercentage: value });

    console.log(currentStock);

    updateCalculations(index);
  };

  const handleStockDataChangeDiscountAmount = (e: any) => {
    const { name } = e.target;
    const { value } = e.target;
    const index = Number(name.split(".")[1]);

    setValue(`stockHistoryTemps.${index}.discountAmount`, value);
    setCurrentStock({ ...currentStock, discountAmount: value });

    console.log(currentStock);

    updateCalculations(index);
  };

  const updateCalculations = (index: any) => {
    const quantity = getValues(`stockHistoryTemps.${index}.quantity`);
    const retailPrice = currentStock.retailPrice;
    const discountPercentage = getValues(
      `stockHistoryTemps.${index}.discountPercentage`
    );
    const discountAmount = getValues(
      `stockHistoryTemps.${index}.discountAmount`
    );

    console.log(quantity, retailPrice);

    let lineDiscountPercentage =
      discountPercentage === undefined ? 0 : Number(discountPercentage);
    let lineDiscountAmount =
      discountAmount === undefined ? 0 : Number(discountAmount);

    const subTotalAmount = Number(retailPrice) * Number(quantity);
    const totalAmount =
      subTotalAmount -
      (lineDiscountAmount * Number(quantity) +
        (subTotalAmount * lineDiscountPercentage) / 100);
    const discountTotal =
      lineDiscountAmount * Number(quantity) +
      (subTotalAmount * lineDiscountPercentage) / 100;

    setValue(`stockHistoryTemps.${index}.subTotalAmount`, subTotalAmount);
    setValue(`stockHistoryTemps.${index}.totalAmount`, totalAmount);
    setValue(`stockHistoryTemps.${index}.discountTotal`, discountTotal);
  };

  // const calculateItemTotals = (item: any) => {
  //   const quantity = item.quantity;
  //   const retailPrice = item.retailPrice;
  //   const discountPercentage = item.discountPercentage;
  //   const discountAmount = item.discountAmount;

  //   const subTotalAmount = Number(retailPrice) * Number(quantity);
  //   const totalAmount =
  //     subTotalAmount -
  //     (discountAmount * Number(quantity) +
  //       (subTotalAmount * discountPercentage) / 100);
  //   const discountTotal =
  //     discountAmount * Number(quantity) +
  //     (subTotalAmount * discountPercentage) / 100;

  //   return { subTotalAmount, totalAmount, discountTotal };
  // };

  const calculateTotals = () => {
    const stockHistoryTemps = watch("stockHistoryTemps");
    const overallDiscountPercent = watch("discountPercentage") as number;
    const overallDiscountAmount = watch("discountAmount") as number;

    let totalSubTotalAmount = 0;
    let totalTotalAmount = 0;
    let revisedTotal = 0;

    stockHistoryTemps?.forEach((item) => {
      totalSubTotalAmount += Number(item.subTotalAmount);
      totalTotalAmount += Number(item.totalAmount);
    });

    revisedTotal =
      totalTotalAmount -
      (totalTotalAmount * overallDiscountPercent) / 100 -
      overallDiscountAmount;

    return { totalSubTotalAmount, totalTotalAmount, revisedTotal };
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  calculateTotals();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { totalSubTotalAmount, totalTotalAmount } = calculateTotals();
    setValue("subTotalAmount", totalSubTotalAmount);
    setValue(
      "totalAmount",
      totalTotalAmount -
        (totalTotalAmount * (getValues("discountPercentage") ?? 0)) / 100 -
        (getValues("discountAmount") ?? 0)
    );
    // setValue("totalAmount", revisedTotal);
    // console.log(typeof totalTotalAmount);
  }, [watch("stockHistoryTemps"), setValue, getValues, currentStock]);

  const stockHistoryTemps = watch("stockHistoryTemps");

  const getSectionComponent = () => {
    switch (activeStep) {
      case 0:
        return (
          <div className="grid grid-cols-2 gap-2">
            <div className="col-span-1">
              <label
                htmlFor="customer"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Customer
              </label>
              {/* <AsynchronousSelect
                name="customer"
                loadOptions={customerLoadOptions}
              /> */}
              <Controller
                name="customer"
                control={control}
                rules={{ required: "Customer field is required" }}
                render={({ field: { onChange } }) => (
                  <AsyncSelect
                    onChange={async (selectValue: any) => {
                      onChange(selectValue);
                      const searchValue = selectValue.label.split(" ")[1];
                      const response = await CustomerServices.search(
                        searchValue
                      );

                      setValue(
                        `customer`,
                        response.find(
                          (cus: any) => cus.secondName === searchValue
                        )
                      );
                    }}
                    isClearable
                    loadOptions={customerLoadOptions}
                    defaultOptions
                    name="customer"
                  />
                )}
              />
            </div>
            <div className="col-span-1">
              <label
                htmlFor="date"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Date
              </label>
              <input
                {...register("date")}
                type="date"
                name="date"
                id="date"
                max={today}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="col-span-2">
              <label
                htmlFor="remarks"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Remarks
              </label>
              <input
                {...register("remarks")}
                type="text"
                name="remarks"
                id="remarks"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            {/* <div className="col-span-2 mt-1">
          <label
            htmlFor="category"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Customer Type
          </label>
          <Select
            options={options}
            defaultInputValue={options[0].value}
            onChange={handleChange}
            name="itemCategory"
            id="category"
          />
        </div> */}
          </div>
        );

      case 1:
        return (
          <>
            {SHTFields.map((item, index) => {
              return (
                <Accordion
                  key={item.id}
                  type="single"
                  collapsible
                  className="w-full"
                >
                  <AccordionItem value={item.id}>
                    <AccordionTrigger className="">
                      ITEM - {index + 1}
                    </AccordionTrigger>
                    <button type="button" onClick={() => remove(index)}>
                      <MdDelete className="text-red-500" size={25} />
                    </button>
                    <AccordionContent>
                      <div key={item.id} className="grid grid-cols-2 gap-2">
                        <div className="col-span-1 ">
                          <label
                            htmlFor="item"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Item Master
                          </label>
                          <Controller
                            name={`stockHistoryTemps.${index}.stockCode`}
                            control={control}
                            rules={{ required: "Select Item" }}
                            render={({ field: { onChange } }) => (
                              <AsyncSelect
                                loadOptions={itemLoadOptions}
                                defaultOptions
                                // inputValue={currentlySelectedItem}
                                onChange={async (selectValue: any) => {
                                  onChange(selectValue);

                                  const response =
                                    await ItemService.posSearchWithoutStock(
                                      selectValue.label
                                    );
                                  setCurrentStock({
                                    ...currentStock,
                                    stock: response[0].stockCode,
                                    costPrice: response[0].costPrice,
                                    retailPrice: response[0].retailPrice,
                                    wholesalePrice: response[0].wholesalePrice,
                                  });
                                  console.log(response);
                                  console.log(currentStock);

                                  setValue(
                                    `stockHistoryTemps.${index}.stockCode`,
                                    selectValue.value
                                  );
                                  setValue(
                                    `stockHistoryTemps.${index}.itemMaster`,
                                    response[0].itemMaster
                                  );
                                  // setCurrentlySelectedItem(selectValue.label);
                                }}
                              />
                            )}
                          />
                        </div>

                        <div className="col-span-1 ">
                          <label
                            htmlFor="quantity"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            quantity
                          </label>

                          <input
                            {...register(`stockHistoryTemps.${index}.quantity`)}
                            type="number"
                            // value={currentStock.quantity}
                            value={watch(`stockHistoryTemps.${index}.quantity`)}
                            onChange={handleStockDataChangeQuantity}
                            // name="quantity"
                            name={`stockHistoryTemps.${index}.quantity`}
                            id="quantity"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          />
                          {errors.stockHistoryTemps?.[index]?.quantity && (
                            <p className="text-red-600 font-roboto-normal">
                              {/* {errors.stockHistoryTemps[index].quantity.message} */}
                              quantity must be greater than or equals to 1
                            </p>
                          )}
                        </div>
                        <div className="col-span-1 ">
                          <label
                            htmlFor="discountPercentage"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Discount %
                          </label>

                          <input
                            {...register(
                              `stockHistoryTemps.${index}.discountPercentage`
                            )}
                            type="number"
                            value={currentStock.discountPercentage}
                            onChange={handleStockDataChangeDiscountPercentage}
                            name={`stockHistoryTemps.${index}.discountPercentage`}
                            id="discountPercentage"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          />
                        </div>
                        <div className="col-span-1 ">
                          <label
                            htmlFor="discountAmount"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Discount Amount
                          </label>

                          <input
                            {...register(
                              `stockHistoryTemps.${index}.discountAmount`
                            )}
                            type="number"
                            value={currentStock.discountAmount}
                            onChange={handleStockDataChangeDiscountAmount}
                            name={`stockHistoryTemps.${index}.discountAmount`}
                            id="discountAmount"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          />
                        </div>
                        <div className="col-span-1 ">
                          <label
                            htmlFor="costPrice"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Cost Price
                          </label>

                          <input
                            {...register(
                              `stockHistoryTemps.${index}.costPrice`
                            )}
                            type="number"
                            name={`stockHistoryTemps.${index}.costPrice`}
                            value={currentStock.costPrice}
                            onChange={(e) =>
                              setCurrentStock({
                                ...currentStock,
                                costPrice: e.target.value,
                              })
                            }
                            id="costPrice"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          />
                        </div>
                        <div className="col-span-1 ">
                          <label
                            htmlFor="wholesalePrice"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Wholesale Price
                          </label>

                          <input
                            {...register(
                              `stockHistoryTemps.${index}.wholesalePrice`
                            )}
                            type="number"
                            value={currentStock.wholesalePrice}
                            name={`stockHistoryTemps.${index}.wholesalePrice`}
                            id="wholesalePrice"
                            onChange={(e) =>
                              setCurrentStock({
                                ...currentStock,
                                wholesalePrice: e.target.value,
                              })
                            }
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          />
                        </div>
                        <div className="col-span-1 ">
                          <label
                            htmlFor="retailPrice"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Retail Price
                          </label>

                          <input
                            {...register(
                              `stockHistoryTemps.${index}.retailPrice`
                            )}
                            type="number"
                            value={currentStock.retailPrice}
                            name={`stockHistoryTemps.${index}.retailPrice`}
                            id="retailPrice"
                            onChange={(e) =>
                              setCurrentStock({
                                ...currentStock,
                                retailPrice: e.target.value,
                              })
                            }
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          />
                        </div>
                        <div className="col-span-1">
                          <h1 className="p-1 tracking-widest text-center border font-roboto-bold border-formHeaderBg">
                            Summary
                          </h1>
                          <span className="tracking-widest font-roboto-bold text-formHeaderBg ">
                            Sub Total:{" "}
                          </span>
                          {currency(
                            Number(currentStock.retailPrice) *
                              Number(currentStock.quantity)
                              ? Number(currentStock.retailPrice) *
                                  Number(currentStock.quantity)
                              : 0.0
                          )}

                          <br />
                          <span className="tracking-widest font-roboto-bold text-formHeaderBg ">
                            Total:{" "}
                          </span>
                          {currency(
                            Number(currentStock.retailPrice) *
                              Number(currentStock.quantity) -
                              ((currentStock.discountAmount == "" ||
                              currentStock.discountAmount == undefined
                                ? 0
                                : Number(currentStock.discountAmount) *
                                  Number(currentStock.quantity)) +
                                (currentStock.discountPercentage == ""
                                  ? 0
                                  : (Number(currentStock.retailPrice) *
                                      Number(currentStock.quantity) *
                                      Number(currentStock.discountPercentage)) /
                                    100))
                              ? Number(currentStock.retailPrice) *
                                  Number(currentStock.quantity) -
                                  ((currentStock.discountAmount == "" ||
                                  currentStock.discountAmount == undefined
                                    ? 0
                                    : Number(currentStock.discountAmount) *
                                      Number(currentStock.quantity)) +
                                    (currentStock.discountPercentage == ""
                                      ? 0
                                      : (Number(currentStock.retailPrice) *
                                          Number(currentStock.quantity) *
                                          Number(
                                            currentStock.discountPercentage
                                          )) /
                                        100))
                              : 0.0
                          )}
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              );
            })}
            <div
              onClick={() => {
                append({
                  stockCode: undefined,
                  quantity: 0,
                  discountPercentage: 0,
                  itemMaster: {},
                  subTotalAmount: 0,
                  discountTotal: 0,
                  totalAmount: 0,
                  discountAmount: 0,
                  costPrice: 0,
                  wholesalePrice: 0,
                  retailPrice: 0,
                });
                setCurrentStock(initCurrentStockValue);
              }}
              className="p-2 mt-3 text-center text-white bg-black rounded-lg cursor-pointer font-roboto-bold"
            >
              Add +
            </div>
            {/* <div>
              <p>Total Sub Total Amount: {totalSubTotalAmount}</p>
              <p>Total Total Amount: {totalTotalAmount}</p>
            </div> */}
            <div className="mt-3">
              <SalesQuotationTable
                stockHistoryTemps={stockHistoryTemps}
                calculateTotals={calculateTotals}
                updateFieldValues={updateFieldValues}
              />
            </div>
          </>
        );
    }
  };

  const onSubmit = async (data: any) => {
    try {
      await SalesQuotationService.create(data);
    } catch (err) {
      console.log(err);
      toast.error("Sales quotation creation failed");
    } finally {
      await SalesQuotationService.getAll();
      reset();
      navigate("/intro");
      setTimeout(() => {
        navigate("/intro/sales-quotation");
      }, 50);
    }
  };

  // useEffect(() => {
  //   setValue(
  //     "currentStock",
  //     fields.map((field) => ({
  //       stockCode: field.stockCode,
  //       quantity: field.quantity,
  //       discountPercentage: field.discountPercentage,
  //       discountAmount: field.discountAmount,
  //       costPrice: field.costPrice,
  //       wholesalePrice: field.wholesalePrice,
  //       retailPrice: field.retailPrice,
  //     }))
  //   );
  // }, [fields, setValue]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="text-white fixed bottom-2 shadow-xl right-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <IoMdAdd size={30} />
          <span className="sr-only">Icon description</span>
        </button>
      </DialogTrigger>
      <DialogContent className="pocket:max-tablet:max-w-[350px] pocket:max-tablet:max-h-[400px] desktop:max-w-[700px] desktop:max-h-[70vh] overflow-scroll scrollbar-thin scrollbar-webkit">
        <DialogHeader>
          <DialogTitle className="font-roboto-bold">
            Add Sales Quotation
          </DialogTitle>
          {/* <DialogDescription>Adding a new customer</DialogDescription> */}
        </DialogHeader>
        <Stepper
          style={{ width: "100%", padding: 0, margin: 0 }}
          steps={steps}
          activeStep={activeStep}
          styleConfig={{
            size: 30,
            circleFontSize: 16,
            labelFontSize: 14,
            borderRadius: 50,
            fontWeight: 600,
            activeBgColor: "#337ab7",
            completedBgColor: "#ECECEC",
            inactiveBgColor: "#ddd",
            activeTextColor: "#fff",
            completedTextColor: "#333",
            inactiveTextColor: "#333",
          }}
        />
        <Form
          className="w-full p-4 overflow-y-scroll bg-formBg scrollbar-thin scrollbar-webkit"
          method="post"
          encType="multipart/form-data"
          replace
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* {<ItemDetails />}
          {<PriceDetails />} */}
          {getSectionComponent()}

          {activeStep === steps.length - 1 && (
            <DialogFooter className="mt-3">
              <button
                type="submit"
                className="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Add Sales Quotation
              </button>
            </DialogFooter>
          )}

          {/* <pre>{JSON.stringify(watch(), null, 2)} </pre> */}
        </Form>
        <div className="flex justify-between mt-2">
          {activeStep !== 0 && (
            <Button
              onClick={() => setActiveStep(activeStep - 1)}
              variant="outline"
              className="text-white bg-formHeaderBg"
            >
              Previous
            </Button>
          )}
          {activeStep !== steps.length - 1 && (
            <Button
              onClick={() => setActiveStep(activeStep + 1)}
              variant="outline"
              className="text-white bg-formHeaderBg"
            >
              Next
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { IoMdAdd } from "react-icons/io";
import { Form, useNavigate } from "react-router-dom";

import { Stepper } from "react-form-stepper";
// import Select from "react-select";

import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import CustomerServices from "@/services/CustomerServices";

import { useForm, useFieldArray } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export default function CustomerCreation() {
  const [activeStep, setActiveStep] = useState(0);

  const navigate = useNavigate();

  const yupSchema = yup.object({
    companyName: yup.string().notRequired(),
    customCode: yup.string().notRequired(),
    firstName: yup.string().required("This field is required"),
    secondName: yup.string().required("this field is required"),
    phone1: yup.string().notRequired(),
    phone2: yup.string().notRequired(),
    email: yup.string().notRequired(),
    website: yup.string().notRequired(),
    creditLimit: yup.number().notRequired(),
    creditBalance: yup.number().notRequired(),
    creditDays: yup.string().notRequired(),
    isActive: yup.boolean().notRequired(),
    isVerified: yup.boolean().notRequired(),
    passportNumber: yup.string().notRequired(),
    nicNumber: yup.string().notRequired(),
    rating: yup.number().notRequired(),
    customerType: yup.mixed().notRequired(),
    notes: yup.string().notRequired(),
    fax: yup.string().notRequired(),
    route: yup.string().notRequired(),
    customerContacts: yup.mixed().notRequired(),
    customerAddresses: yup.array().of(
      yup.object({
        firstName: yup.string().notRequired(),
        email: yup.string().notRequired(),
        secondName: yup.string().notRequired(),
        phone1: yup.string().notRequired(),
        phone2: yup.string().notRequired(),
        address: yup.string().notRequired(),
        country: yup.string().notRequired(),
        district: yup.string().notRequired(),
        city: yup.string().notRequired(),
        postBox: yup.string().notRequired(),
        isActive: yup.boolean().notRequired(),
      })
    ),
  });

  const {
    register,
    control,
    formState: { errors },
    // watch,
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(yupSchema),
    defaultValues: {
      companyName: "",
      customCode: "",
      firstName: "",
      secondName: "",
      phone1: "",
      phone2: "",
      email: "",
      website: "",
      creditLimit: 0,
      creditBalance: 0,
      creditDays: "",
      isActive: true,
      isVerified: false,
      passportNumber: "",
      nicNumber: "",
      rating: 0,
      customerType: null,
      notes: "",
      fax: "",
      route: "",
      customerContacts: [],
      customerAddresses: [
        {
          firstName: "",
          email: "",
          secondName: "",
          phone1: "",
          phone2: "",
          address: "",
          country: "Sri Lanka",
          district: "",
          city: "",
          postBox: "",
          isActive: true,
        },
      ],
    },
    mode: "onBlur",
  });

  const { fields } = useFieldArray({
    name: "customerAddresses",
    control,
  });

  const steps = [
    { label: "General Info" },
    { label: "Address" },
    { label: "Contact Info" },
  ];

  const getSectionComponent = () => {
    switch (activeStep) {
      case 0:
        return (
          <div className="grid grid-cols-2 gap-2">
            <div className="col-span-1 ">
              <label
                htmlFor="custom_code"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Code
              </label>
              <input
                {...register("customCode")}
                type="text"
                name="customCode"
                id="custom_code"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="col-span-1">
              <label
                htmlFor="firstName"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                First Name
              </label>
              <input
                {...register("firstName")}
                type="text"
                name="firstName"
                id="firstName"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {errors.firstName && (
                <p className="text-sm tracking-wider text-red-600 font-roboto-normal">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div className="col-span-2">
              <label
                htmlFor="secondName"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Last Name
              </label>
              <input
                {...register("secondName")}
                type="text"
                name="secondName"
                id="secondName"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {errors.secondName && (
                <p className="text-sm tracking-wider text-red-600 font-roboto-normal">
                  {errors.secondName && errors.secondName.message}
                </p>
              )}
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
            {fields.map((item: any, index: any) => {
              return (
                <div key={item.id} className="grid grid-cols-2 gap-2">
                  <div className="col-span-1 ">
                    <label
                      htmlFor="street"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Street
                    </label>
                    <input
                      {...register(`customerAddresses.${index}.address`)}
                      type="text"
                      name={`customerAddresses.${index}.address`}
                      id="street"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  <div className="col-span-1 ">
                    <label
                      htmlFor="city"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      City
                    </label>
                    <input
                      {...register(`customerAddresses.${index}.city`)}
                      type="text"
                      name={`customerAddresses.${index}.city`}
                      id="city"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  <div className="col-span-2 ">
                    <label
                      htmlFor="street"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      District
                    </label>
                    <input
                      {...register(`customerAddresses.${index}.district`)}
                      type="text"
                      name={`customerAddresses.${index}.district`}
                      id="district"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                </div>
              );
            })}
          </>
        );
      case 2:
        return (
          <div className="grid grid-cols-2 gap-2">
            <div className="col-span-1 ">
              <label
                htmlFor="phone1"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Phone Number
              </label>
              <input
                {...register("phone1")}
                type="tel"
                name="phone1"
                id="phone1"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="col-span-1 ">
              <label
                htmlFor="phone2"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Telephone
              </label>
              <input
                {...register("phone2")}
                type="tel"
                name="phone2"
                id="phone2"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="col-span-2 ">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email ID
              </label>
              <input
                {...register("email")}
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          </div>
        );
    }
  };

  const onSubmit = async (data: any) => {
    try {
      await CustomerServices.create(data);
      toast.success("Customer created successfully");
    } catch (err) {
      console.log(err);
      return toast.error("Customer creation failed");
    } finally {
      await CustomerServices.getAll();
      reset();
      navigate("/intro");
      setTimeout(() => {
        navigate("/intro/customer-create");
      }, 50);
    }
  };

  return (
    <Dialog>
      <Toaster position="top-center" reverseOrder={false} />
      <DialogTrigger asChild>
        <button
          type="button"
          className=" text-white fixed bottom-4 shadow-xl right-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <IoMdAdd size={30} />
          <span className="sr-only">Icon description</span>
        </button>
      </DialogTrigger>
      <DialogContent className="pocket:max-tablet:max-w-[350px] pocket:max-tablet:max-h-[400px] desktop:max-w-[700px] desktop:max-h-[70vh] overflow-scroll scrollbar-thin scrollbar-webkit">
        <DialogHeader>
          <DialogTitle className="font-roboto-bold">Add Customer</DialogTitle>
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
          replace
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* {<ItemDetails />}
          {<PriceDetails />} */}
          {getSectionComponent()}
          {/* <input
            type="hidden"
            name="formData"
            value={JSON.stringify(formData)}
          /> */}

          {activeStep === steps.length - 1 && (
            <DialogFooter className="mt-3">
              <button
                type="submit"
                className="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Add Customer
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

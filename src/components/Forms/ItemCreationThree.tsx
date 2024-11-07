/* eslint-disable @typescript-eslint/no-unused-vars */

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
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"

import { IoMdAdd } from "react-icons/io";
import { Form, useNavigate, useNavigation } from "react-router-dom";

import { Stepper } from "react-form-stepper";
import Select from "react-select";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import ItemMasterService from "../../services/ItemService";

import toast, { Toaster } from "react-hot-toast";

import ItemCategoryService from "../../services/ItemCategoryService";

import Dropzone from "react-dropzone";

import { useForm, Controller } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ImageCollectionViewer from "../Card/ImageCollectionViewer";

const options = [
  { value: "Product", label: "Product" },
  { value: "Service", label: "Service" },
];

export default function ItemCreationThree() {
  const [activeStep, setActiveStep] = useState(0);

  const [imagePath, setImagePath] = useState(undefined);
  const [itemCode, setItemCode] = useState(undefined);

  console.log(imagePath);
  console.log(itemCode);

  const [success, setSuccess] = useState(false);

  const yupSchema = yup.object().shape({
    name: yup.string().notRequired(),
    barcode: yup.string().required("This field is required"),
    // itemCategory: yup
    //   .object()
    //   .shape({
    //     label: yup.string().required("status is required (from label)"),
    //     value: yup.string().required("status is required"),
    //   })
    //   .nullable() // for handling null value when clearing options via clicking "x"
    //   .required("status is required (from outter null check)"),
    itemCategory: yup.string().required("sadas"),
    itemSubCategories: yup.mixed().notRequired(),
    minStock: yup
      .number()
      .min(1, "Min Stock must be greater than 0")
      .required(),
    maxStock: yup
      .number()
      .min(2, "Max Stock must be greater than 1")
      .required(),
    costPrice: yup.number().min(1).required("Cost Price is required"),
    wholesalePrice: yup.number().min(1).required("Wholesale Price is required"),
    retailPrice: yup.number().min(1).required("Retail Price is required"),
    image: yup.array().of(yup.mixed()).notRequired(),
    filePath: yup.string().notRequired(),
    itemCode: yup.number().notRequired(),
  });

  const {
    watch,
    register,
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(yupSchema),
    defaultValues: {
      name: "",
      barcode: "",
      itemCategory: undefined,
      itemSubCategories: undefined,
      minStock: 0,
      maxStock: 0,
      costPrice: 0,
      wholesalePrice: 0,
      retailPrice: 0,
      filePath: "",
      itemCode: 0,
      image: [{}],
    },
    mode: "onBlur",
  });

  // //image upload
  //   const [file, setFile] = useState<any>(null);

  //itemDetails states
  const [setSelectedOption] = useState<any>(null);

  //react-router-dom states
  const state = useNavigation().state;
  const navigate = useNavigate();

  //uploadImage states
  // const [files, setFiles] = useState<any>(null);
  // const [uploadImage, setUploadImage] = useState([]);

  useEffect(() => {
    setValue("filePath", imagePath);
    setValue("itemCode", itemCode);
  }, [imagePath]);

  //fetching category
  const {
    data: categoryData,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["item-category"],
    queryFn: async () => {
      const category = await ItemCategoryService.getAll();
      return category;
    },
  });

  console.log(categoryData);
  if (isLoading) {
    console.log("loading...");
  }

  let selectedOptions: any;

  if (isSuccess) {
    selectedOptions = categoryData.map((ele: any) => {
      return { label: ele.name, value: ele.code };
    });
  }
  const handleChange = (selectedOptions: any) => {
    setSelectedOption(selectedOptions);
    // setFormData({ ...formData, itemCategory: selectedOptions.value });
  };

  const steps = [
    { label: "Item Details" },
    { label: "Price Details" },
    { label: "Image Upload (optional)" },
  ];

  //   useEffect(() => {
  //     console.log(watch("itemCategory")); // logs the selected option every time it changes
  //   }, [watch("itemCategory")]);

  // useEffect(() => {
  //   toast.error(errors)
  // }, [errors])

  const getSectionComponent = () => {
    switch (activeStep) {
      case 0:
        return (
          <>
            <div className="grid grid-cols-2 gap-2">
              <div className="col-span-1 ">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Item Name
                </label>
                <input
                  {...register("name")}
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="col-span-1 ">
                <label
                  htmlFor="barcode"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Barcode
                </label>
                <input
                  {...register("barcode")}
                  type="text"
                  name="barcode"
                  id="barcode"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {errors.barcode && (
                  <p className="text-sm tracking-wider text-red-600 font-roboto-normal">
                    {errors.barcode.message}
                  </p>
                )}
              </div>
              <div className="col-span-2 mt-1">
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Category
                </label>
                <Controller
                  name="itemCategory"
                  control={control}
                  render={({ field: { onChange, value, name } }) => (
                    <Select
                      options={selectedOptions}
                      isClearable
                      isSearchable={false}
                      value={selectedOptions.find(
                        (option: any) => option.value === value
                      )}
                      //   onChange={onChange}
                      onChange={(selectedOption) => {
                        onChange(selectedOption);
                        setValue("itemCategory", selectedOption.value);
                      }}
                      id="category"
                      name={name}
                    />
                  )}
                />
                <p>{errors.itemCategory?.message}</p>
              </div>
              <div className="col-span-2 mt-1">
                <label
                  htmlFor="subcategory"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Sub Category
                </label>
                <Controller
                  name="itemSubCategories"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={options}
                      defaultInputValue={options[0].value}
                      onChange={handleChange}
                      name="itemSubCategories"
                      id="subcategory"
                    />
                  )}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="col-span-1 mt-1">
                <label
                  htmlFor="minStock"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Min Stock
                </label>
                <input
                  {...register("minStock")}
                  type="number"
                  name="minStock"
                  //   onChange={(e) =>
                  //     setFormData({ ...formData, minStock: e.target.value })
                  //   }
                  //   value={formData.minStock}
                  id="minStock"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {errors?.minStock && (
                  <p className="text-sm tracking-wider text-red-600 font-roboto-normal">
                    {errors.minStock.message}
                  </p>
                )}
              </div>
              <div className="col-span-1 mt-1">
                <label
                  htmlFor="maxStock"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Max Stock
                </label>
                <input
                  {...register("maxStock")}
                  type="number"
                  name="maxStock"
                  //   onChange={(e) =>
                  //     setFormData({ ...formData, maxStock: e.target.value })
                  //   }
                  //   value={formData.maxStock}
                  id="maxStock"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {errors?.maxStock && (
                  <p className="text-sm tracking-wider text-red-600 font-roboto-normal">
                    {errors.maxStock.message}
                  </p>
                )}
              </div>
            </div>
          </>
        );

      case 1:
        return (
          <div className="grid grid-cols-2 gap-2">
            <div className="col-span-1 ">
              <label
                htmlFor="costPrice"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Cost Price
              </label>
              <input
                {...register("costPrice")}
                type="number"
                name="costPrice"
                // onChange={(e) =>
                //   setFormData({ ...formData, costPrice: e.target.value })
                // }
                // value={formData.costPrice}
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
                {...register("wholesalePrice")}
                type="number"
                name="wholesalePrice"
                // onChange={(e) =>
                //   setFormData({ ...formData, wholesalePrice: e.target.value })
                // }
                // value={formData.wholesalePrice}
                id="wholesalePrice"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="col-span-2 ">
              <label
                htmlFor="retailPrice"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Retail Price
              </label>
              <input
                {...register("retailPrice")}
                type="number"
                name="retailPrice"
                // onChange={(e) =>
                //   setFormData({ ...formData, retailPrice: e.target.value })
                // }
                // value={formData.retailPrice}
                id="retailPrice"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <>
            <ImageCollectionViewer
              setImagePath={setImagePath}
              setItemCode={setItemCode}
            />
            <Controller
              control={control}
              name="image"
              defaultValue={[]}
              render={({ field: { onChange, onBlur, value } }) => (
                <Dropzone
                  onDrop={(acceptedFiles) => {
                    onChange(acceptedFiles);
                    setValue("image", acceptedFiles);
                  }}
                  //   onDrop={onChange}
                >
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()} className="dropzone">
                      <div className="">
                        <div className="flex items-center justify-center w-full">
                          <label
                            htmlFor="dropzone-file"
                            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 "
                          >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <svg
                                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 16"
                              >
                                <path
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                />
                              </svg>
                              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">
                                  Click to upload
                                </span>{" "}
                                or drag and drop
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                SVG, PNG, JPG or GIF (MAX. 800x400px)
                              </p>
                            </div>
                            <input {...getInputProps()} onBlur={onBlur} />
                          </label>
                        </div>
                      </div>
                      {
                        value &&
                          value.map((file: any) => (
                            <div key={file.path}>{file.path}</div>
                          ))
                        // <div key={value.path}>{value.path}</div>
                      }
                    </div>
                  )}
                </Dropzone>
              )}
            />

            {/* {uploadImage && (
              <div className="flex flex-wrap gap-1 mt-2">
                {uploadImage.map((image: any, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(image)}
                    alt={`uploaded-image-${index}`}
                    style={{
                      width: "100px",
                      height: "100px",
                      alignContent: "left",
                    }}
                  />
                ))}
              </div>
            )} */}
          </>
        );
    }
  };

  const onSubmit = async (data: any) => {
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("barcode", data.barcode);
      formData.append("itemCategory", data.itemCategory);
      formData.append("itemSubCategories", data.itemSubCategories);
      formData.append("minStock", data.minStock);
      formData.append("maxStock", data.maxStock);
      formData.append("costPrice", data.costPrice);
      formData.append("wholesalePrice", data.wholesalePrice);
      formData.append("retailPrice", data.retailPrice);
      data?.image?.forEach((file: any) => {
        formData.append("image[]", file);
      });
      formData.append("filePath", data.filePath);
      formData.append("itemCode", data.itemCode);

      const res = await ItemMasterService.create(formData);
      setSuccess(true);
      toast.success("Item created successfully");

      console.log(res);
    } catch (err) {
      return toast.error("Item creation failed");
    } finally {
      console.log(success);
      await ItemMasterService.getAll();
      reset();
      navigate("/intro");
      setTimeout(() => {
        navigate("/intro/item-master");
      }, 50);
    }

    console.log(data);
  };

  return (
    <Dialog>
      <Toaster position="top-center" reverseOrder={false} />

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
          <DialogTitle className="font-roboto-bold">Add Item</DialogTitle>
          {/* <DialogDescription>Add Item To Item Master</DialogDescription> */}
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
          onSubmit={handleSubmit(onSubmit)}
          encType="multipart/form-data"
        >
          {getSectionComponent()}

          {activeStep === steps.length - 1 && (
            <DialogFooter className="mt-3">
              <button
                disabled={state === "submitting"}
                type="submit"
                className="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                {state === "submitting" ? "Creating Item...." : "Add Item"}
              </button>
            </DialogFooter>
          )}
          <pre>{JSON.stringify(watch(), null, 2)} </pre>
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

/* eslint-disable @typescript-eslint/no-explicit-any */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

import { CONSTANT_PATH } from "../../constants/ImagePath";
import { ImageDialog } from "./ImageDialog";

export function ItemCard({
  name,
  description,
  minStock,
  maxStock,
  costPrice,
  retailPrice,
  wholesalePrice,
  itemImages,
  key,
}: any) {
  const [itemShow, setItemShow] = useState(true);
  const [pricingShow, setPricingShow] = useState(false);
  const [imageShow, setImageShow] = useState(false);

  const clickItem = () => {
    setItemShow(true);
    setPricingShow(false);
    setImageShow(false);
  };

  const clickPricing = () => {
    setItemShow(false);
    setPricingShow(true);
    setImageShow(false);
  };

  const clickImage = () => {
    setItemShow(false);
    setPricingShow(false);
    setImageShow(true);
  };

  const renderCategory = () => {
    if (itemShow) {
      return (
        <div className="flex flex-col gap-4">
          <div className="flex justify-between m-1 ">
            <span className="tracking-wider tablet:text-xl font-lato-extrabold">
              {" "}
              Item Name:
            </span>{" "}
            <span className="tracking-wider tablet:text-xl font-lato-extrabold">
              {name}
            </span>
          </div>
          <div className="flex justify-between m-1 ">
            <span className="tracking-wider tablet:text-xl font-lato-extrabold">
              Item Description:
            </span>{" "}
            <span className="tracking-wider tablet:text-xl font-lato-extrabold">
              {description}
            </span>
          </div>
          <div className="flex justify-between m-1 ">
            <span className="tracking-wider tablet:text-xl font-lato-extrabold">
              Min.Stock: {minStock.split(".")[0]}
            </span>{" "}
            <div>
              <span className="tracking-wider tablet:text-xl font-lato-extrabold">
                Max.Stock: {maxStock.split(".")[0]}
              </span>
            </div>
          </div>
        </div>
      );
    } else if (pricingShow) {
      return (
        <div className="flex flex-col gap-4">
          <div className="flex justify-between m-1 ">
            <span className="tracking-wider tablet:text-xl font-lato-extrabold">
              Item Cost Price:
            </span>{" "}
            <span className="tracking-wider tablet:text-xl font-lato-extrabold">
              {costPrice}
            </span>
          </div>
          <div className="flex justify-between m-1 ">
            <span className="tracking-wider tablet:text-xl font-lato-extrabold">
              Item Wholesale Price:
            </span>{" "}
            <span className="tracking-wider tablet:text-xl font-lato-extrabold">
              {wholesalePrice}
            </span>
          </div>
          <div className="flex justify-between m-1 ">
            <span className="tracking-wider tablet:text-xl font-lato-extrabold">
              Item Retail Price:
            </span>{" "}
            <span className="tracking-wider tablet:text-xl font-lato-extrabold">
              {retailPrice}
            </span>
          </div>
        </div>
      );
    } else if (imageShow) {
      return (
        <>
          <div className="flex w-full gap-2 overflow-x-scroll scrollbar-thin scrollbar-webkit">
            {itemImages?.map((img: any, idx: any) => {
              return (
                <ImageDialog path={img.filePath}>
                  <div key={idx} className="flex-shrink-0 w-[120px] h-[120px]">
                    <img
                      className="object-cover w-full h-full"
                      src={`${CONSTANT_PATH.IMAGE_PATH}/${img.filePath}`}
                      alt="itemImages"
                    />
                  </div>
                </ImageDialog>
              );
            })}
          </div>
        </>
      );
    }
  };
  return (
    <Card
      key={key}
      className="w-[300px] tablet:w-[550px]  tablet:h-[230px] h-[250px]"
    >
      <CardHeader className="w-full p-3 ">
        <CardTitle className="">
          <div className="flex justify-between gap-1 p-[0.1rem] border border-green-700 bg-green-50 rounded-lg">
            <div
              onClick={clickItem}
              className={`text-lg text-center p-2 w-1/3 cursor-pointer tracking-widest uppercase font-roboto-bold ${
                itemShow &&
                "bg-slate-700 text-white rounded-lg rounded-tr-none rounded-br-none"
              }`}
            >
              Item
            </div>
            <div
              onClick={clickPricing}
              className={`text-lg p-2 text-center w-1/3 gap-1 cursor-pointer tracking-widest uppercase font-roboto-bold ${
                pricingShow && "bg-slate-700 text-white rounded-none"
              }`}
            >
              Pricing
            </div>
            <div
              onClick={clickImage}
              className={`text-lg p-2 w-1/3 text-center gap-1 cursor-pointer tracking-widest uppercase font-roboto-bold ${
                imageShow &&
                "bg-slate-700 text-white rounded-lg rounded-tl-none rounded-bl-none"
              }`}
            >
              Image
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>{renderCategory()}</CardContent>
    </Card>
  );
}

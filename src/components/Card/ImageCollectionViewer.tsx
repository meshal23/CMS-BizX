/* eslint-disable @typescript-eslint/no-explicit-any */
import ImageServices from "@/services/ImageServices";
import { useQuery } from "@tanstack/react-query";

import { CONSTANT_PATH } from "../../constants/ImagePath";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Skeleton } from "../ui/skeleton";
// import { ImageDialog } from "./ImageDialog";

function ImageCollectionViewer({ setImagePath, setItemCode }: any) {
  const {
    data: imageData,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["image-data"],
    queryFn: async () => {
      return ImageServices.getAll();
    },
  });
  if (isLoading) {
    console.log("loading");
  }

  if (isSuccess) {
    console.log(imageData);
  }

  const uniqueImageData = imageData?.filter(
    (image: any, index: any, self: any) =>
      index === self.findIndex((t: any) => t.filePath === image.filePath)
  );

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>View All Images</AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-wrap gap-2">
            {isLoading ? (
              <Skeleton />
            ) : (
              uniqueImageData?.map((image: any) => {
                return (
                  //   <ImageDialog path={image.filePath}>
                  <img
                    onClick={() => {
                      setImagePath(image.filePath);
                      setItemCode(image.itemCode);
                      console.log(image.filePath);
                      console.log(image);
                    }}
                    alt="itemImages"
                    className={`${
                      image.filePath === undefined
                        ? "hidden"
                        : "object-cover w-[100px] h-[100px]"
                    } `}
                    src={`${CONSTANT_PATH.IMAGE_PATH}/${image.filePath}`}
                  />
                  //   </ImageDialog>
                );
              })
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default ImageCollectionViewer;

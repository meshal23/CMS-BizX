/* eslint-disable @typescript-eslint/no-explicit-any */

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CONSTANT_PATH } from "@/constants/ImagePath";

export function ImageDialog({ children, path }: any) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className=" tablet:max-w-[625px] tablet:max-h-[625px] h-[600px] max-w-[300px] max-h-[300px] bg-transparent border-none">
        <section className="flex items-center justify-center w-full ">
          <div className="flex-shrink-0 tablet:w-[520px] tablet:h-[520px] w-[200px] h-[200px]">
            <img
              className="object-cover w-full h-full"
              src={`${CONSTANT_PATH.IMAGE_PATH}/${path}`}
              alt="itemImages"
            />
          </div>
        </section>
      </DialogContent>
    </Dialog>
  );
}

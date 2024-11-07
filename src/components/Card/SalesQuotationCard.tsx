/* eslint-disable @typescript-eslint/no-explicit-any */

// import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  //   CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function SalesQuotationCard({
  name,
  phone1,
  email,
  stockHistoryTemps,
  totalQuo,
  key,
}: any) {
  return (
    <Card key={key} className="w-[350px] tablet:w-[550px]">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="my-1">Customer Details</CardDescription>
        <div className="flex justify-between m-1">
          <span className="tracking-wider tablet:text-xl font-lato-extrabold">
            Phone:{" "}
          </span>
          <span className="tracking-wider tablet:text-xl font-lato-extrabold">
            {phone1}
          </span>
        </div>
        <div className="flex justify-between m-1">
          <span className="tracking-wider tablet:text-xl font-lato-extrabold">
            Email:{" "}
          </span>
          <span className="tracking-wider tablet:text-xl font-lato-extrabold">
            {email}
          </span>
        </div>
        <CardDescription className="my-1">Quotation Details</CardDescription>
        <div className="flex flex-col gap-2 overflow-y-scroll scrollbar-thin scrollbar-webkit w-full h-[150px]">
          {stockHistoryTemps.map((quo: any, idx: any) => {
            return (
              <>
                <div className="p-2 rounded-lg bg-red-50">
                  <div key={idx} className="flex justify-between m-1">
                    <span className="tracking-wider text-md font-lato-extrabold">
                      Date
                    </span>
                    <span className="tracking-wider text-md font-lato-extrabold">
                      {quo.createdAt.split(" ")[0]}
                    </span>
                  </div>

                  <div key={idx} className="flex justify-between m-1">
                    <span className="tracking-wider text-md font-lato-extrabold">
                      Item
                    </span>
                    <span className="tracking-wider text-md font-lato-extrabold">
                      {quo.itemMaster.name}
                    </span>
                  </div>

                  <div className="flex justify-between m-1">
                    <span className="tracking-wider text-md font-lato-extrabold">
                      Total
                    </span>
                    <span className="tracking-wider text-md font-lato-extrabold">
                      {quo.totalAmount}
                    </span>
                  </div>
                </div>
              </>
            );
          })}
          <div className="flex justify-between p-2 m-1 bg-green-50 ">
            <span className="text-xl tracking-wider font-lato-extrabold">
              Quotation Total:
            </span>
            <span className="text-xl tracking-wider font-lato-extrabold">
              {totalQuo}
            </span>
          </div>
        </div>
      </CardContent>
      {/* <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter> */}
    </Card>
  );
}

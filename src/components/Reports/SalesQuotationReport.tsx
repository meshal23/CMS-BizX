import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import DailySalesQuotationReport from "./DailySalesQuotationReport";
import PeriodicSalesQuotationReport from "./PeriodicSalesQuotationReport";

import { IoTodaySharp } from "react-icons/io5";
import { MdDetails } from "react-icons/md";
import { MdCalendarMonth } from "react-icons/md";
import DetailsSalesQuotationReport from "./DetailsSalesQuotationReport";

export default function SalesQuotationReport() {
  return (
    <>
      <section className="w-full tablet:h-[10%] h-1/6 desktop:mb-9">
        {/* heading */}
        <div className="text-3xl text-center mt-14 tablet:mt-5 font-lato-extrabold ">
          BizX <span className="mr-5 text-green-500">Catelog</span>{" "}
          <span className="px-3 py-1 uppercase rounded-lg bg-slate-300 text-formHeaderBg">
            Report
          </span>
        </div>
        <div className="mt-5 text-3xl text-center uppercase font-lato-extrabold ">
          {" "}
          Sales Quotation Report
        </div>
      </section>
      <Tabs defaultValue="daily" className="w-full min-h-screen ">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="daily">
            <IoTodaySharp className="mt-[0.2rem] mr-2" /> Daily Quo{" "}
          </TabsTrigger>
          <TabsTrigger value="details">
            <MdDetails className="mt-[0.1rem] mr-2" /> Details Quo
          </TabsTrigger>
          <TabsTrigger value="periodic">
            <MdCalendarMonth className="mt-[0.2rem] mr-2" /> Periodic Quo{" "}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="daily">
          <DailySalesQuotationReport />
        </TabsContent>
        <TabsContent value="details">
          <DetailsSalesQuotationReport />
        </TabsContent>
        <TabsContent value="periodic">
          <PeriodicSalesQuotationReport />
        </TabsContent>
      </Tabs>
    </>
  );
}

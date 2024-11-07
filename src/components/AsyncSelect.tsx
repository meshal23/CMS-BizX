/* eslint-disable @typescript-eslint/no-explicit-any */
// import CustomerServices from "@/services/CustomerServices";
// import ItemService from "@/services/ItemService";
import AsyncSelect from "react-select/async";

function AsynchronousSelect({ name, loadOptions, defaultValue }: any) {
  // const loadOptions = (searchValue: any, callback: any) => {
  //   if (api === "customer") {
  //     CustomerServices.search(searchValue).then((res: any) => {
  //       const options = res.map((cus: any) => ({
  //         label: `${cus.firstName} ${cus.secondName}`,
  //         value: cus.code,
  //       }));
  //       callback(options);
  //     });
  //   } else if (api === "item") {
  //     ItemService.posSearchWithoutStock(searchValue).then((res: any) => {
  //       const options = res.map((stock: any) => ({
  //         label: `${stock.itemMaster.name}`,
  //         value: stock.itemMaster.code,
  //       }));
  //       callback(options);
  //     });
  //   }
  // };
  const handleChange = (selectedOption: any) => {
    console.log("handle change: ", selectedOption);
  };
  return (
    <AsyncSelect
      loadOptions={loadOptions}
      onChange={handleChange}
      defaultInputValue={defaultValue}
      name={name}
    />
  );
}

export default AsynchronousSelect;

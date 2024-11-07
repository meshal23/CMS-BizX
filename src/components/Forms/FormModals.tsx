import { FC } from "react";
// import ItemCreation from "./ItemCreation";
import CustomerCreation from "./CustomerCreation";
import SalesQuotationCreation from "./SalesQuotationCreation";
// import ItemCreationTwo from "./ItemCreationTwo";
import ItemCreationThree from "./ItemCreationThree";

type modalProps = {
  formName: string;
  // visible: boolean;
};

const renderForm = (formName: string) => {
  if (formName === "item") {
    return <ItemCreationThree />;
  } else if (formName === "customer") {
    return <CustomerCreation />;
  } else if (formName === "sales-quotation") {
    return <SalesQuotationCreation />;
  }
};

const FormModals: FC<modalProps> = ({ formName }: modalProps) => {
  return <div>{renderForm(formName)}</div>;
};

export default FormModals;

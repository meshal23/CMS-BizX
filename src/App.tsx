import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import Welcome from "./components/Pages/Welcome";
import Login, { action as loginAction } from "./components/Pages/Login";
import { validate } from "./validate";
import Layout from "./components/Pages/Layout";
import ItemMaster from "./components/Pages/ItemMaster";
// import { action as ItemAction } from "../src/components/Forms/ItemCreation";
// import { action as ItemActionTwo } from "../src/components/Forms/ItemCreationTwo";
// import { action as CustomerAction } from "../src/components/Forms/CustomerCreation";
import Customer from "./components/Pages/Customer";
import SalesQuotation from "./components/Pages/SalesQuotation";
import Introduction from "./components/Pages/Introduction";
// import { ReportNavigationMenu } from "./components/Card/ReportNavigationMenu";
import ItemReport from "./components/Reports/ItemReport";
import CustomerReport from "./components/Reports/CustomerReport";
import SalesQuotationReport from "./components/Reports/SalesQuotationReport";
// import ItemCreationThree from "./components/Forms/ItemCreationThree";
// import FormModals from "./components/Forms/FormModals";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<Login />} action={loginAction} />
      <Route path="/intro" element={<Layout />}>
        <Route
          index
          element={<Introduction />}
          loader={async () => await validate()}
        />
        <Route
          path="item-master"
          element={<ItemMaster />}
          loader={async () => await validate()}
          // action={ItemActionTwo}
        ></Route>
        {/* <Route
          path="item-create"
          element={<FormModals formName="item" />}
          loader={async () => await validate()}
          action={ItemActionTwo}
        ></Route> */}
        <Route
          path="customer-create"
          element={<Customer />}
          loader={async () => await validate()}
          // action={CustomerAction}
        />
        <Route
          path="sales-quotation"
          element={<SalesQuotation />}
          loader={async () => await validate()}
        />
        <Route path="reports">
          <Route index element={<Introduction />} />
          <Route path="item-report" element={<ItemReport />} />
          <Route path="customer-report" element={<CustomerReport />} />
          <Route path="sq-report" element={<SalesQuotationReport />} />
        </Route>
      </Route>
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

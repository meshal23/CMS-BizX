import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NavLink, useNavigate } from "react-router-dom";

import { AiFillProduct } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { IoReceiptSharp } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";

import { activeStyles } from "@/styles/activeNavLinkStyles";
import { ReportNavigationMenu } from "../Card/ReportNavigationMenu";

export default function SideBarSheet() {
  const navigate = useNavigate();
  return (
    <Sheet>
      <SheetTrigger asChild className="fixed top-2 left-2">
        <Button variant="outline">
          <GiHamburgerMenu />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="mb-2">
          <SheetTitle>BizX Catelog</SheetTitle>
          <SheetDescription>Navigate To The Pages</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col w-full gap-3">
          <NavLink
            to="/intro/item-master"
            end
            className="w-full p-3 rounded-[30px]"
            style={({ isActive }) => (isActive ? activeStyles : undefined)}
          >
            <AiFillProduct size={20} className="inline mb-1 mr-4" />
            <span className="text-lg tracking-wider font-roboto-normal">
              Item Master
            </span>
          </NavLink>
          <SheetClose asChild className="w-full">
            <NavLink
              to="/intro/customer-create"
              end
              className="w-full p-3 rounded-[30px]"
              style={({ isActive }) => (isActive ? activeStyles : undefined)}
            >
              <FaUser size={20} className="inline mb-1 mr-4" />
              <span className="text-lg tracking-wider font-roboto-normal">
                Customer
              </span>
            </NavLink>
          </SheetClose>
          {/* <NavLink
            to="/intro/seller"
            className="w-full p-3 rounded-[30px]"
            style={({ isActive }) => (isActive ? activeStyles : undefined)}
          >
            <FaUserTie size={20} className="inline mb-1 mr-4" />
            <span className="text-lg tracking-wider font-roboto-normal">
              Seller
            </span>
          </NavLink> */}
          <SheetClose className="w-full" asChild>
            <NavLink
              to="/intro/sales-quotation"
              className="w-full p-3 rounded-[30px]"
              style={({ isActive }) => (isActive ? activeStyles : undefined)}
            >
              <IoReceiptSharp size={20} className="inline mb-1 mr-4" />
              <span className="text-lg tracking-wider font-roboto-normal">
                Sales Quotation
              </span>
            </NavLink>
          </SheetClose>

          {/* <SheetClose className="w-full " asChild> */}
          <NavLink
            to="/intro/reports/item-report"
            className="w-full p-0 mt-5 rounded-[30px]"
            // style={({ isActive }) => (isActive ? activeStyles : undefined)}
          >
            <ReportNavigationMenu />
          </NavLink>
          {/* </SheetClose> */}
        </div>

        {/* <div className="grid gap-4 py-4">
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div> */}
        {/* <NavLink to="/item-create">Create Item</NavLink> */}
        <SheetFooter className="mt-4">
          <SheetClose asChild>
            <div
              className="flex w-full gap-3 py-3 mt-5 tracking-widest cursor-pointer text-roboto-normal bg-slate-200 hover:bg-slate-300 text-formHeaderBg"
              onClick={() => {
                localStorage.removeItem("isLoggedIn");
                localStorage.removeItem("BizX_accessToken");
                navigate("/?message=successfully logged out", {
                  replace: true,
                });
              }}
            >
              <span className="mt-1 ml-4">
                <MdLogout size={20} />
              </span>
              Logout
            </div>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

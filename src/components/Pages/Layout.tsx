// import SideBar from "./SideBar";
import SideBarSheet from "./SideBarSheet";
import { Outlet } from "react-router-dom";

// import { GiHamburgerMenu } from "react-icons/gi";

function Layout() {
  //   const [isNavBarShown, setIsNavBarShown] = useState(true);
  return (
    <section className="flex justify-center w-full min-h-screen bg-slate-200">
      {/* <SideBar visible={isNavBarShown} /> */}

      <div className="">
        <SideBarSheet />
        <Outlet />
      </div>
    </section>
  );
}

export default Layout;

import { Fragment, useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import Loader from "../components/Loader";
import Topbar from "../components/Topbar";
import CategoryNav from "../components/CategoryNav";
const Main = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);
  return (
    <Fragment>
      <Topbar />
      <CategoryNav />
      <Loader>
        <Outlet />
      </Loader>
      {/* <Footer/> */}
    </Fragment>
  );
};

export default Main;

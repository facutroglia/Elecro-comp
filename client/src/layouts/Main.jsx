import { Fragment, Suspense } from "react";
import { Outlet } from "react-router";
import Loader from "../components/Loader";
const Main = () => {
  return (
    <Fragment>
      {/* <Header/> */}
      <Loader>
        <Outlet />
      </Loader>
      {/* <Footer/> */}
    </Fragment>
  );
};

export default Main;

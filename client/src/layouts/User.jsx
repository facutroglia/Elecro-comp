import { Fragment, Suspense } from "react";
import { Outlet, Navigate } from "react-router";
import Loader from "../components/Loader";
import { useUser } from "../context/useUser";
const User = () => {
  const { user } = useUser();
  if (!user) {
    return <Navigate to="/acceso" />;
  }
  return (
    <Fragment>
      <Loader>
        <Outlet />
      </Loader>
    </Fragment>
  );
};

export default User;

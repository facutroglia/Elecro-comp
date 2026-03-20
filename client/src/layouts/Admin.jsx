import { Fragment } from "react";
import { Outlet, Navigate } from "react-router";
import Loader from "../components/Loader";
import { useUser } from "../context/useUser";
// usamos el contexto para obtener el usuario
const Admin = () => {
  const { user } = useUser();
  if (!user) {
    return <Navigate to="/acceso" />;
  }
  if (!user.isAdmin) {
    return <Navigate to="/" />;
  }
  return (
    <Fragment>
      <Loader>
        <Outlet />
      </Loader>
    </Fragment>
  );
};

export default Admin;

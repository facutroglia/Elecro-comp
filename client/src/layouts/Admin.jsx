import { Fragment, useEffect } from "react";
import { Outlet, Navigate, useNavigate } from "react-router";
import Loader from "../components/Loader";
import { useUser } from "../context/useUser";
// usamos el contexto para obtener el usuario
const Admin = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/acceso");
      // return <Navigate to="/acceso" />;
    }
    if (user && !user.isAdmin) {
      navigate("/");
      // return <Navigate to="/" />;
    }
  }, [user]);
  return (
    <Fragment>
      <Loader>
        <Outlet />
      </Loader>
    </Fragment>
  );
};

export default Admin;

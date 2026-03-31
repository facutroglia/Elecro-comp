import { Fragment } from "react";
import { Icon } from "@iconify/react";
import { NavLink, useNavigate } from "react-router";
import Brand from "./Brand";
import Search from "./Search";
import styles from "../styles/components/TopBar.module.css";
import { useUser } from "../context/useUser";
const Topbar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  return (
    <header id={styles.topbar}>
      <NavLink to={"/"} id={styles.brand}>
        <Brand />
      </NavLink>
      <Search id={styles.search} />
      <nav id={styles.actions}>
        {!user && (
          <Fragment>
            <NavLink to={"/acceso"}>
              <Icon icon="material-symbols:login" />
            </NavLink>
          </Fragment>
        )}
        {user && !user.isAdmin && (
          <Fragment>
            <NavLink to={"/usuario"}>
              <Icon icon="mdi:account" />
            </NavLink>
          </Fragment>
        )}
        {user && user.isAdmin && (
          <Fragment>
            <NavLink to={"/panel"}>
              <Icon icon="oui:nav-administration" />
            </NavLink>
          </Fragment>
        )}
        {(!user || !user.isAdmin) && (
          <NavLink to={"/carrito"}>
            <Icon icon="mdi:cart" />
          </NavLink>
        )}
        {user && (
          <button
            onClick={() => {
              setUser(null);
              navigate("/acceso");
            }}
            id={styles.logout}
          >
            <Icon icon="material-symbols:logout" />
          </button>
        )}
      </nav>
    </header>
  );
};

export default Topbar;

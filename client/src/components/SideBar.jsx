import { Fragment } from "react";
import { NavLink } from "react-router";
import { Icon } from "@iconify/react";
import styles from "../styles/components/SideBar.module.css";

const SideBar = () => {
  return (
    <Fragment>
      <aside className={styles.Sidebar}>
        <section className={styles.NameUser}>
          <h3>Facundo</h3>
          <p>Facundo@gmail.com</p>
        </section>

        <nav className={styles.NavProfile}>
          <NavLink to="/usuario">
            {" "}
            <Icon icon="mdi:user"></Icon> Mi cuenta
          </NavLink>
          <NavLink to="/usuario/compras">
            {" "}
            <Icon icon="weui:shop-filled"></Icon> Mis pedidos
          </NavLink>
          <NavLink to="/usuario/favoritos">
            {" "}
            <Icon icon="mdi:heart"></Icon> Favoritos
          </NavLink>
        </nav>
      </aside>
    </Fragment>
  );
};

export default SideBar;

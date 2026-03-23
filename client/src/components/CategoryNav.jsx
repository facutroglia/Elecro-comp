import React from "react";
import { Icon } from "@iconify/react";
import styles from "../styles/components/CategoryNav.module.css";
import { NavLink } from "react-router";
import { useMobile } from "../context/useMobile";
const CategoryNav = () => {
  const { isMobile } = useMobile();
  return (
    <header id={styles.NavCategory}>
      {!isMobile && (
        <button id={styles.Category}>
          <Icon
            id={styles.SvgCategory}
            icon="material-symbols:menu-rounded"
          ></Icon>{" "}
          Todas las Categorias
        </button>
      )}

      <nav id={styles.MenuSeccion}>
        <NavLink to={"/productos"} className={styles.linkReset}>
          Productos
        </NavLink>
        <NavLink to={"/contacto"} className={styles.linkReset}>
          Contacto
        </NavLink>
        <NavLink to={"/nosotros"} className={styles.linkReset}>
          Sobre nosotros
        </NavLink>
      </nav>
    </header>
  );
};

export default CategoryNav;

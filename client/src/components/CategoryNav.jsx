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
        <NavLink to={"/productos"}>Productos</NavLink>
        <NavLink to={"/contacto"}>Contacto</NavLink>
        <NavLink to={"/nosotros"}>Sobre nosotros</NavLink>
      </nav>
    </header>
  );
};

export default CategoryNav;

import React, { useState } from "react";
import { Icon } from "@iconify/react";
import styles from "../styles/components/CategoryNav.module.css";
import { NavLink } from "react-router";
import { useMobile } from "../context/useMobile";
const CategoryNav = () => {
  const { isMobile } = useMobile();
  const [open, setOpen] = useState(false);
  console.log(open);
  return (
    <header id={styles.NavCategory}>
      <button id={styles.Category} onClick={() => setOpen(!open)}>
        {isMobile ? (
          <Icon id={styles.SvgCategory} icon="mingcute:down-line" />
        ) : (
          <>
            <Icon id={styles.SvgCategory} icon="ion:menu" />
            Todas las categorias
          </>
        )}
      </button>

      {!isMobile && (
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
      )}
      {isMobile && (
        <nav id={styles.MenuMobile} className={open ? styles.active : ""}>
          <NavLink
            to="/productos"
            className={styles.linkReset}
            onClick={() => setOpen(false)}
          >
            Productos
          </NavLink>

          <NavLink
            to="/contacto"
            className={styles.linkReset}
            onClick={() => setOpen(false)}
          >
            Contacto
          </NavLink>

          <NavLink
            to="/nosotros"
            className={styles.linkReset}
            onClick={() => setOpen(false)}
          >
            Sobre nosotros
          </NavLink>
        </nav>
      )}
    </header>
  );
};

export default CategoryNav;

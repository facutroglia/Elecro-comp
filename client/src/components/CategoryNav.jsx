import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import styles from "../styles/components/CategoryNav.module.css";
import { NavLink, useLocation } from "react-router";
import { useMobile } from "../context/useMobile";
const CategoryNav = () => {
  const { isMobile } = useMobile();
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  useEffect(() => {
    setOpenMenu(false);
    setOpenCategory(false);
  }, [location]);
  return (
    <header id={styles.NavCategory}>
      <form onSubmit={(e) => e.preventDefault()} className={styles.actions}>
        <button
          type="button"
          className={`${styles.btns} ${styles.category}`}
          onClick={() => {
            setOpenCategory(!openCategory);
            setOpenMenu(false);
          }}
        >
          {isMobile ? (
            <Icon id={styles.SvgCategory} icon="mingcute:down-line" />
          ) : (
            <>
              <Icon id={styles.SvgCategory} icon="ion:menu" />
              Todas las categorias
            </>
          )}
        </button>
        {isMobile && (
          <button
            type="button"
            className={`${styles.btns} ${styles.menu}`}
            onClick={() => {
              setOpenCategory(false);
              setOpenMenu(!openMenu);
            }}
          >
            <Icon id={styles.SvgCategory} icon="ion:menu" />
          </button>
        )}
      </form>

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
        <nav id={styles.MenuMobile} className={openMenu ? styles.active : ""}>
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
      <nav id={styles.categories} className={openCategory ? styles.open : null}>
        <NavLink to="/productos/categoria/procesador">
          {!isMobile && (
            <img
              src="https://placehold.co/72/36013F/violet/png?text=Pc"
              alt=""
            />
          )}
          <span>Procesador</span>
        </NavLink>
        <NavLink to="/productos/categoria/memorias">
          {!isMobile && (
            <img
              src="https://placehold.co/72/36013F/violet/png?text=Mr"
              alt=""
            />
          )}
          <span>Memorias</span>
        </NavLink>
        <NavLink to="/productos/categoria/placas">
          {!isMobile && (
            <img
              src="https://placehold.co/72/36013F/violet/png?text=Pl"
              alt=""
            />
          )}
          <span>Placas</span>
        </NavLink>
        <NavLink to="/productos/categoria/graficas">
          {!isMobile && (
            <img
              src="https://placehold.co/72/36013F/violet/png?text=Gf"
              alt=""
            />
          )}
          <span>Graficas</span>
        </NavLink>
      </nav>
    </header>
  );
};

export default CategoryNav;

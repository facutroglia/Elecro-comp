import React from "react";
import { NavLink } from "react-router";
import styles from "../styles/components/Template.module.css";
const Template = ({ title, children }) => {
  return (
    <section id={styles.container}>
      <header id={styles.header}>
        <h2 id={styles.title}>{title}</h2>
        <nav id={styles.actions}>
          <NavLink className={styles.NavLinks} to="/panel/productos">
            Productos
          </NavLink>
          <NavLink className={styles.NavLinks} to="/panel/categorias">
            Categorias
          </NavLink>
          <NavLink className={styles.NavLinks} to="/panel/marcas">
            Marcas
          </NavLink>
          <NavLink className={styles.NavLinks} to="/panel/pedidos">
            Pedidos
          </NavLink>
        </nav>
      </header>
      {children}
    </section>
  );
};

export default Template;

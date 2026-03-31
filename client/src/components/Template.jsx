import React from "react";
import { NavLink } from "react-router";
import styles from "../styles/components/Template.module.css";
const Template = ({ title, children }) => {
  return (
    <section id={styles.container}>
      <header id={styles.header}>
        <h2 id={styles.title}>{title}</h2>
        <nav id={styles.actions}>
          <NavLink to="/panel/productos">Productos</NavLink>
          <NavLink to="/panel/categorias">Categorias</NavLink>
          <NavLink to="/panel/marcas">Marcas</NavLink>
          <NavLink to="/panel/pedidos">Pedidos</NavLink>
        </nav>
      </header>
      {children}
    </section>
  );
};

export default Template;

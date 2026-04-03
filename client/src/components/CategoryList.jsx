import { useState, useEffect, Fragment } from "react";
import CategoryCard from "./CategoryCard";
import styles from "../styles/components/CategoryList.module.css";
const CategoryList = ({ categorias }) => {
  return (
    <Fragment>
      {!categorias || (categorias.length < 1 && <p>No hay categorias</p>)}
      {categorias && categorias.length > 0 && (
        <ul className={styles.UlCategory}>
          {categorias.map((categoria) => (
            <CategoryCard key={categoria.id} category={categoria} />
          ))}
        </ul>
      )}
    </Fragment>
  );
};

export default CategoryList;

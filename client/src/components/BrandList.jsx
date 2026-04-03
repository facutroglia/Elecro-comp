import { useState, useEffect, Fragment } from "react";
import BrandCard from "./BrandCard";
import styles from "../styles/components/BrandList.module.css";
const BrandList = ({ brands }) => {
  return (
    <Fragment>
      {brands.length === 0 && <p>No hay marcas disponibles.</p>}
      <ul className={styles.UlCategory}>
        {brands.map((brand) => (
          <BrandCard key={brand.id} brand={brand} />
        ))}
      </ul>
    </Fragment>
  );
};

export default BrandList;

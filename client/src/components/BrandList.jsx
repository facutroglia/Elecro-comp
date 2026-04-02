import { useState, useEffect, Fragment } from "react";
import BrandCard from "./BrandCard";
import styles from "../styles/components/BrandList.module.css";
const BrandList = () => {
  const [brands, setBrands] = useState([]);
  useEffect(() => {
    const getBrands = async () => {
      const req = await fetch("/api/marcas");
      const res = await req.json();
      setBrands(res);
    };
    getBrands();
  }, []);
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

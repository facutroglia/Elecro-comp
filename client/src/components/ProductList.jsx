import React, { Fragment } from "react";

import ProductCard from "./ProductCard";
import styles from "../styles/components/ProductList.module.css";

function ProductList({ products }) {
  return (
    <ul className={styles.ProductList}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          image={`/assets/${product?.gallery?.[0]?.url}`}
          {...product}
        />
      ))}
    </ul>
  );
}

export default ProductList;

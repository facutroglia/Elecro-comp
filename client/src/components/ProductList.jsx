import React, { Fragment } from "react";
import products from "../assets/productos.json";
import ProductCard from "./ProductCard";
import styles from "../styles/components/ProductList.module.css";

function ProductList() {
  return (
    <ul className={styles.ProductList}>
      {products.Productos.slice(0, 4).map((product) => (
        <ProductCard
          {...product}
          key={product.id}
          image={`https://placehold.co/200x140/white/purple/png?text=${product.id}`}
        />
      ))}
    </ul>
  );
}

export default ProductList;

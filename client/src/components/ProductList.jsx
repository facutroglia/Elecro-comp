import React, { Fragment } from "react";
import products from "../assets/productos.json";
import ProductCard from "./ProductCard";

function ProductList() {
  return (
    <ul>
      {products.Productos.slice(0, 4).map((product) => (
        <ProductCard
          {...product}
          key={product.id}
          image={`https://placehold.co/680x420/white/purple/png?text=${product.id}`}
        />
      ))}
    </ul>
  );
}

export default ProductList;

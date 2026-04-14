import { useState, useEffect, Fragment } from "react";
import { Link } from "react-router";
import formatPrice from "../utils/formatPrice";
import styles from "../styles/components/Inventory.module.css";
const Inventory = ({ products }) => {
  return (
    <Fragment>
      <h2>Lista de productos</h2>
      {products && (
        <ul className={styles.InventoryList}>
          {products.map((product) => (
            <li className={styles.NewProduct} key={product.id}>
              {product?.gallery &&
                Array.isArray(product?.gallery) &&
                product?.gallery.length > 0 && (
                  <picture className={styles.ImageNewProduct}>
                    <img
                      src={`${import.meta.env.VITE_BACKEND_PUBLIC}/${product?.gallery[0].url}`}
                      alt={`${product.name} image`}
                    />
                  </picture>
                )}
              <dl>
                <dt className={styles.NameNewProduct}>{product.name}</dt>
                <dd className={styles.PriceNewProduct}>
                  {formatPrice(product.price)}
                </dd>
              </dl>
              <dl>
                <dt className={styles.NameInfo}>Categoria</dt>
                <dd className={styles.PriceNewProduct}>
                  {product.category.name}
                </dd>
              </dl>
              <dl>
                <dt className={styles.NameInfo}>Marca</dt>
                <dd className={styles.PriceNewProduct}>{product.brand.name}</dd>
              </dl>
              <Link
                className={styles.BtnEditProduct}
                to={`/panel/productos/${product.id}`}
              >
                Editar
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Fragment>
  );
};

export default Inventory;

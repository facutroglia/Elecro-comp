import { useState, useEffect, Fragment } from "react";
import { Link } from "react-router";
import formatPrice from "../utils/formatPrice";
import styles from "../styles/components/Inventory.module.css";
const Inventory = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    const getProducts = async () => {
      const req = await fetch("/api/productos");
      const res = await req.json();
      if (req.ok) {
        setData(res);
      }
    };
    getProducts();
  }, []);
  return (
    <Fragment>
      {data?.products && (
        <ul className={styles.InventoryList}>
          {data?.products.map((product) => (
            <li key={product.id}>
              {product?.gallery &&
                Array.isArray(product?.gallery) &&
                product?.gallery.length > 0 && (
                  <picture>
                    <img
                      src={`/assets/${product?.gallery[0].url}`}
                      alt={`${product.name} image`}
                    />
                  </picture>
                )}
              <dl>
                <dt>{product.name}</dt>
                <dd>{formatPrice(product.price)}</dd>
              </dl>
              <dl>
                <dd>{product.category.name}</dd>
                <dd>{product.brand.name}</dd>
              </dl>
              <Link to={`/panel/productos/${product.id}`}>Editar</Link>
            </li>
          ))}
        </ul>
      )}
    </Fragment>
  );
};

export default Inventory;

import { Fragment, useState, useEffect } from "react";
import styles from "../styles/pages/Detail.module.css";
import { useCart } from "../context/useCart.jsx";
import { useLoaderData } from "react-router";
import { Icon } from "@iconify/react";
import formatPrice from "../utils/formatPrice.js";
import ProductList from "../components/ProductList.jsx";
const Detail = () => {
  const { producto, relacionados } = useLoaderData();
  const { add, cartItems, reduce } = useCart();
  const [current, setCurrent] = useState(null);
  useEffect(() => {
    if (producto && producto.gallery) {
      const firtImage = producto.gallery.find((_, i) => i == 0);
      setCurrent(firtImage);
    }
  }, [producto]);
  const itemEnCarrito = cartItems?.find((i) => i.id === producto.id);
  return (
    <section id={styles.detail}>
      <article id={styles.gallery}>
        <ul id={styles.thumbs}>
          {producto.gallery.map((imagen) => (
            <li
              className={`${styles.thumb} ${current?.id === imagen?.id ? styles.active : ""}`}
              key={imagen.id}
              onClick={() => setCurrent(imagen)}
            >
              <img src={`/assets/${imagen.url}`} alt="" />
            </li>
          ))}
        </ul>
        <picture id={styles.current}>
          {current?.id && <img src={`/assets/${current.url}`} alt="" />}
        </picture>
      </article>
      <article id={styles.data}>
        <dl>
          <dt className={styles.AttributeName}>{producto.name}</dt>
          <dd className={styles.AttributeValue}>{producto.description}</dd>
        </dl>
        <dl>
          <dt className={styles.AttributeName}>Precio</dt>
          <dd className={styles.AttributeValue}>
            {formatPrice(producto.price)}
          </dd>
        </dl>
        <dl>
          <dt className={styles.AttributeName}>Marca</dt>
          <dd className={styles.AttributeValue}>{producto.brand.name}</dd>
        </dl>
        <dl>
          <dt className={styles.AttributeName}>Caracteristicas</dt>
          {producto.atributes.map((attr) => (
            <dl>
              <dt className={styles.NameCaracteristicas}>{attr.name}</dt>
              <dd className={styles.ValorCaracteristicas}>{attr.value}</dd>
            </dl>
          ))}
        </dl>
        <form onSubmit={(e) => e.preventDefault()}>
          {!itemEnCarrito ? (
            <button
              className={styles.BtnAddProduct}
              type="button"
              onClick={() => add(producto)}
            >
              Agregar al <Icon icon="mdi:cart" />
            </button>
          ) : (
            <Fragment>
              <button
                className={styles.BtnAddProduct}
                type="button"
                onClick={() => add(producto)}
              >
                <Icon icon="mdi:plus" />
              </button>
              <output>
                <span>{itemEnCarrito?.cantidad}</span>
              </output>
              <button
                className={styles.BtnAddProduct}
                type="button"
                onClick={() => reduce(producto)}
              >
                <Icon icon="mdi:minus" />
              </button>
            </Fragment>
          )}
        </form>
      </article>
      <article className={styles.Relacionados}>
        <h2>Productos Relacionados</h2>
        <ProductList products={relacionados} />
      </article>
    </section>
  );
};

export default Detail;

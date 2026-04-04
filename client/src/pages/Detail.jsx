import { Fragment, useState, useEffect } from "react";
import styles from "../styles/pages/Detail.module.css";
import { useCart } from "../context/useCart.jsx";
import { useLoaderData } from "react-router";
const Detail = () => {
  const { producto, relacionados } = useLoaderData();
  const { add, items } = useCart();
  const [current, setCurrent] = useState(null);
  useEffect(() => {
    setCurrent({ id: 1 });
  }, []);
  return (
    <section id={styles.detail}>
      <article id={styles.gallery}>
        <ul id={styles.thumbs}>
          {Array.from({ length: 4 }, (_, i) => ({ id: i + 1 })).map((i) => (
            <li
              className={`${styles.thumb} ${current?.id === i?.id ? styles.active : ""}`}
              key={i.id}
              onClick={() => setCurrent(i)}
            >
              <img
                src={`http://placehold.co/480/purple/white/png?text=${i.id}`}
                alt=""
              />
            </li>
          ))}
        </ul>
        <picture id={styles.current}>
          {current?.id && (
            <img
              src={`http://placehold.co/853x480/purple/white/png?text=${current.id}`}
              alt=""
            />
          )}
        </picture>
      </article>
      <article id={styles.data}>
        <dl>
          <dt>Nombre del producto</dt>
          <dd>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illum fuga
            sapiente nobis nihil ullam incidunt ipsum deleniti molestias
            officiis modi ducimus minus atque, unde repellat cum iusto
            praesentium. Vero, harum?
          </dd>
        </dl>
        <dl>
          <dt>Precio</dt>
          <dd>Precio</dd>
        </dl>
      </article>
    </section>
  );
};

export default Detail;

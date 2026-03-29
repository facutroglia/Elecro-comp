import React from "react";
import { useNavigate } from "react-router";
import { useCart } from "../context/useCart.jsx";
import styles from "../styles/components/ProductCard.module.css";
import { useFavorites } from "../context/useFavorite.jsx";
import { Icon } from "@iconify/react";

const ProductCard = ({ name, id, precio, image }) => {
  const navigate = useNavigate();
  const { add } = useCart();
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.some((fav) => fav.id === id);

  return (
    <li className={styles.Card}>
      <picture>
        <img className={styles.CardImg} src={image} alt="" />
      </picture>

      <dl>
        <dt className={styles.Title}>Nombre</dt>
        <dd className={styles.infoCard}>{name}</dd>
        <dt className={styles.Title}>Precio</dt>
        <dd className={styles.infoCard}>${precio}</dd>
      </dl>
      <form className={styles.BtnCard}>
        <button
          className={styles.Btns}
          onClick={() => add({ name, precio, id, image })}
          type="button"
        >
          Agregar
        </button>
        <button
          className={styles.Btns}
          onClick={() => navigate(`/productos/${id}`)}
          type="button"
        >
          Ver producto
        </button>
        <button
          type="button"
          className={styles.Btns}
          onClick={() => toggleFavorite({ name, id, precio, image })}
        >
          <Icon
            icon="mdi:heart"
            style={{ color: isFavorite ? "red" : "gray" }}
          ></Icon>
        </button>
      </form>
    </li>
  );
};

export default ProductCard;

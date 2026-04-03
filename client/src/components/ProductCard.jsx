import React from "react";
import { useNavigate } from "react-router";
import { useCart } from "../context/useCart.jsx";
import { useFavorites } from "../context/useFavorite.jsx";
import { useUser } from "../context/useUser.jsx";
import styles from "../styles/components/ProductCard.module.css";
import { Icon } from "@iconify/react";
import formatPrice from "../utils/formatPrice.js";

const ProductCard = ({ name, id, price, gallery }) => {
  const navigate = useNavigate();
  const { add } = useCart();
  const { user } = useUser();
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <li className={styles.Card}>
      {gallery && Array.isArray(gallery) && gallery?.length > 0 && (
        <picture>
          <img
            className={styles.CardImg}
            src={`/assets/${gallery?.[0].url}`}
            alt=""
          />
        </picture>
      )}

      <dl>
        <dt className={styles.Title}>Nombre</dt>
        <dd className={styles.infoCard}>{name}</dd>
        <dt className={styles.Title}>Precio</dt>
        <dd className={styles.infoCard}>{formatPrice(price)}</dd>
      </dl>
      <form className={styles.BtnCard}>
        <button
          className={styles.Btns}
          onClick={() => add({ name, price, id, image })}
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
        {user && (
          <button
            type="button"
            className={styles.Btns}
            onClick={() => toggleFavorite(id, user.id)}
          >
            <Icon
              icon="mdi:heart"
              style={{
                color: favorites.some((fav) => fav.id === id) ? "red" : "gray",
              }}
            ></Icon>
          </button>
        )}
      </form>
    </li>
  );
};

export default ProductCard;

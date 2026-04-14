import { Fragment } from "react";
import { useNavigate } from "react-router";
import { useCart } from "../context/useCart.jsx";
import { useFavorites } from "../context/useFavorite.jsx";
import { useUser } from "../context/useUser.jsx";
import styles from "../styles/components/ProductCard.module.css";
import { Icon } from "@iconify/react";
import formatPrice from "../utils/formatPrice.js";

const ProductCard = ({ name, id, price, gallery }) => {
  const navigate = useNavigate();
  const { add, cartItems, reduce } = useCart();
  const { user } = useUser();
  const { favorites, toggleFavorite } = useFavorites();
  const productInCart = cartItems.find((item) => item.id === id);

  return (
    <li className={styles.Card}>
      {gallery && Array.isArray(gallery) && gallery?.length > 0 && (
        <picture>
          <img
            className={styles.CardImg}
            src={`${import.meta.env.VITE_BACKEND_PUBLIC}/${gallery?.[0].url}`}
            alt=""
          />
        </picture>
      )}

      <dl>
        <dd className={styles.ProductTitle}>{name}</dd>
      </dl>
      <dl>
        <dd className={styles.productPrice}>{formatPrice(price)}</dd>
      </dl>
      <form onSubmit={(e) => e.preventDefault()} className={styles.BtnCard}>
        {!productInCart ? (
          <button
            type="button"
            onClick={() => add({ name, id, price, gallery })}
            className={styles.Btns}
          >
            Agregar al <Icon icon="mdi:cart" />
          </button>
        ) : (
          <Fragment>
            <button
              type="button"
              className={styles.Btns}
              onClick={() => add({ name, id, price, gallery })}
            >
              <Icon icon="mdi:plus" />
            </button>
            <output className={styles.Quantity}>
              <span>{productInCart.cantidad}</span>
            </output>
            <button
              type="button"
              className={styles.Btns}
              onClick={() => reduce({ name, id, price, gallery })}
            >
              <Icon icon="mdi:minus" />
            </button>
          </Fragment>
        )}
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
                color: favorites.some((fav) => fav.id === id)
                  ? "red"
                  : "var(--gray-02)",
              }}
            ></Icon>
          </button>
        )}
      </form>
    </li>
  );
};

export default ProductCard;

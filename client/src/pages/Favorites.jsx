import React from "react";
import { Fragment } from "react";
import SideBar from "../components/SideBar";
import styles from "../styles/pages/Favorites.module.css";
import { useFavorites } from "../context/useFavorite.jsx";
import ProductCard from "../components/ProductCard";

const Favorites = () => {
  const { favorites } = useFavorites();

  return (
    <Fragment>
      <section className={styles.FavoritesContainer}>
        <SideBar />
        <section className={styles.Content}>
          <h2>Productos favoritos</h2>
          {favorites.length === 0 ? (
            <p>No tenes productos agregados.</p>
          ) : (
            <div className={styles.FavoritesProducts}>
              {favorites.map((producto) => (
                <ProductCard key={producto.id} {...producto} />
              ))}
            </div>
          )}
        </section>
      </section>
    </Fragment>
  );
};

export default Favorites;

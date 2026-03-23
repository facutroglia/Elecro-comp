import { Fragment } from "react";
import styles from "../styles/pages/Home.module.css";
const Home = () => {
  return (
    <Fragment>
      <hero id={styles.HeroContainer}>
        <h1>Mejora tu experiencia de juego</h1>
        <p id={styles.PHero}>
          Disfruta una inmersión y un rendimiento de otro nivel con nuestros
          componentes de primera calidad.
        </p>
        <button id={styles.BtnVerMas}>Ver productos</button>
      </hero>
    </Fragment>
  );
};

export default Home;

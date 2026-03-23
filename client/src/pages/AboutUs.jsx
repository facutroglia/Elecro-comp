import React, { Fragment } from "react";
import styles from "../styles/pages/AboutUs.module.css";

function AboutUs() {
  return (
    <Fragment>
      <section id={styles.AboutUsContainer}>
        <header id={styles.AboutUsHeader}>
          <h2>Nuesta historia</h2>
          <p>Pasion por la innovacion</p>
        </header>

        <article className={styles.AboutUsContent}>
          <picture className={styles.AboutUsImg}>
            <img src="/FondoAboutUs.jpeg" alt="" />
          </picture>
          <aside className={styles.TextContent}>
            <h3>Nuestros Orígenes</h3>
            <p>
              Comenzamos en un pequeño garaje con una idea simple:
              <strong>
                {" "}
                transformar la manera en que el mundo interactúa con la
                tecnología.
              </strong>
            </p>
            <p>
              Hoy, somos un equipo multidisciplinario enfocado en crear
              soluciones sostenibles y de alto impacto para nuestros clientes.
            </p>
            <ul className={styles.valuesList}>
              <li>
                <b>Compromiso:</b> Damos el 100% en cada proyecto.
              </li>
              <li>
                <b>Transparencia:</b> Comunicación clara y honesta siempre.
              </li>
            </ul>
          </aside>
        </article>
        <article className={styles.AboutUsContent}>
          <aside className={styles.TextContent}>
            <h3>Nuestro Equipo</h3>
            <p>
              En <b>Electro-comp</b>, entendemos que una computadora no es solo
              un conjunto de cables y circuitos; es tu herramienta de trabajo,
              tu consola de juegos y tu ventana al mundo digital. Nos
              especializamos en acercarte lo último en tecnología con un
              asesoramiento personalizado y humano.
            </p>
            <ul className={styles.valuesList}>
              <li>
                <b>Asesoramiento Experto:</b> No solo vendemos componentes; te
                ayudamos a elegir la pieza exacta que tu proyecto o partida
                necesitan.
              </li>
              <li>
                <b>Calidad Garantizada:</b> Trabajamos con las mejores marcas
                del mercado para asegurar que cada compra sea una inversión a
                largo plazo.
              </li>
            </ul>
          </aside>
          <picture className={styles.AboutUsImg}>
            <img src="/ImgAbout.jpg" alt="" />
          </picture>
        </article>
      </section>
    </Fragment>
  );
}

export default AboutUs;

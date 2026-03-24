import { Fragment } from "react";
import styles from "../styles/components/Footer.module.css";
import { NavLink } from "react-router";
import Brand from "./Brand";
import { Icon } from "@iconify/react";

const Footer = () => {
  return (
    <footer>
      <section id={styles.FooterContainer}>
        <section className={styles.SocialSeccion}>
          <NavLink to={"/"} className={styles.BrandFooter}>
            <Brand />
          </NavLink>
          <p>Componentes de calidad</p>
          <nav className={styles.SocialMedia}>
            <Icon className={styles.IconMedia} icon={"stash:social-whatsapp"} />
            <Icon
              className={styles.IconMedia}
              icon={"simple-line-icons:social-google"}
            />
            <Icon
              className={styles.IconMedia}
              icon={"simple-line-icons:social-instagram"}
            />
          </nav>
        </section>
        <nav className={styles.FooterLinks}>
          <p>Terminos y condiciones</p>
          <p>Trabaja con nosotros</p>
          <p>Defensa al consumidor</p>
        </nav>

        <address className={styles.ContactInfo}>
          <p>
            <Icon icon={"line-md:phone-filled"}></Icon> 351-2514-923
          </p>
          <p>
            <Icon icon={"solar:map-point-bold"}></Icon> Cordoba, Cordoba -
            Argentina
          </p>
          <p>
            <Icon icon={"tabler:mail-filled"}></Icon> Electro-comp@gmail.com
          </p>
        </address>
      </section>
      <small>&copy; 2026 Electro-comp. Todos los derechos reservados.</small>
    </footer>
  );
};

export default Footer;

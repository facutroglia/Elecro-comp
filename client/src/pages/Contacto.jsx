import React, { Fragment } from "react";
import { Icon } from "@iconify/react";
import Styles from "../styles/pages/Contact.module.css";
function Contact() {
  return (
    <Fragment>
      <section id={Styles.ContactContainer}>
        <article id={Styles.InfoContact}>
          <h3>Contacto</h3>
          <p>¿Tenes alguna consulta? Escribinos</p>

          <ul>
            <li>
              <Icon icon="fluent:mail-28-filled" />
              Electro-comp@gmail.com
            </li>
            <li>
              {" "}
              <Icon icon="tabler:phone-filled"></Icon>351-2514-923
            </li>
            <li>
              {" "}
              <Icon icon="solar:map-point-bold"></Icon>Cordoba, Cordoba -
              Argentina
            </li>
          </ul>
        </article>

        <form action="" id={Styles.FormContact}>
          <h3>Envianos un mensaje</h3>
          <label htmlFor="">Nombre</label>
          <input type="text" placeholder="Nombre completo" />
          <label htmlFor="">Email</label>
          <input type="email" placeholder="Email" />
          <label htmlFor="">Mensaje</label>
          <input type="text" placeholder="Escribe tu consulta o mensaje" />
          <button id={Styles.BtnSubmmit}>Enviar</button>
        </form>
      </section>
    </Fragment>
  );
}
export default Contact;

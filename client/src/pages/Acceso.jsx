import { Fragment } from "react";
import { data, NavLink } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import styles from "../styles/pages/Acceso.module.css";

const Acceso = () => {
  const AccesoSchema = z.object({
    email: z.string().email("Email no valido"),
    password: z.string().password("Constraseña incorrecta"),
  });
  const AccesoForm = useForm({
    resolver: zodResolver(AccesoSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const SendAcceso = (data) => {};
  return (
    <Fragment>
      <section id={styles.AccesoContainer}>
        <h3>Iniciá secion</h3>
        <form onSubmit={AccesoForm.handleSubmit(S)} id={styles.FormLogin}>
          <fieldset>
            <label htmlFor="">Email</label>
            <input type="email" placeholder="Ingresa tu email" />
          </fieldset>
          <fieldset>
            <label htmlFor="">Contraseña</label>
            <input type="password" placeholder="Ingresa tu contraseña" />
          </fieldset>
          <button id={styles.BtnLogin}>Iniciar secion</button>
        </form>
        <p>
          <NavLink to="/registro">¿No tenes cuenta? Regitrate</NavLink>
        </p>
      </section>
    </Fragment>
  );
};

export default Acceso;

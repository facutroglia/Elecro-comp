import { Fragment } from "react";
import { data, NavLink } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import styles from "../styles/pages/Acceso.module.css";

const Acceso = () => {
  const AccesoSchema = z.object({
    email: z.string().email("Email no valido"),
    password: z.string().min(3, "Constraseña incorrecta"),
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
      <main id={styles.Container}>
        <section id={styles.AccesoContainer}>
          <h3>Iniciá sesion</h3>
          <form
            onSubmit={AccesoForm.handleSubmit(SendAcceso)}
            id={styles.FormLogin}
          >
            <fieldset>
              <label htmlFor="">Email</label>
              <input
                {...AccesoForm.register("email")}
                type="email"
                placeholder="Ingresa tu email"
                className={
                  !AccesoForm.getFieldState("email").invalid &&
                  AccesoForm.getFieldState("email").isTouched
                    ? styles.valid
                    : ""
                }
              />
              {AccesoForm.formState.errors.email && (
                <p className={styles.error}>
                  {AccesoForm.formState.errors.email.message}
                </p>
              )}
            </fieldset>
            <fieldset>
              <label htmlFor="">Contraseña</label>
              <input
                type="password"
                {...AccesoForm.register("password")}
                placeholder="Ingresa tu contraseña"
                className={
                  !AccesoForm.getFieldState("password").invalid &&
                  AccesoForm.getFieldState("password").isTouched
                    ? styles.valid
                    : ""
                }
              />
              {AccesoForm.formState.errors.password && (
                <p className={styles.error}>
                  {AccesoForm.formState.errors.password.message}
                </p>
              )}
            </fieldset>
            <button id={styles.BtnLogin}>
              <NavLink to="/home">Iniciar secion</NavLink>
            </button>
          </form>
          <p>
            <NavLink to="/registro" className={styles.LinkRegister}>
              ¿No tenes cuenta? Regitrate
            </NavLink>
          </p>
        </section>
      </main>
    </Fragment>
  );
};

export default Acceso;

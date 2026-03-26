import { Fragment } from "react";
import { data, NavLink } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import styles from "../styles/pages/Register.module.css";
const Register = () => {
  const RegisterSchema = z.object({
    name: z.string().min(3, "Minimo 3 caracteres"),
    lastname: z.string().min(3, "Minimo 3 caracteres"),
    email: z.string().email("email no valido"),
    password: z.string().min(3, "Constraseña incorrecta"),
  });
  const RegisterForm = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      lastname: "",
      email: "",
      password: "",
    },
  });
  const SendRegister = (data) => {};
  return (
    <Fragment>
      <main id={styles.Container}>
        <section id={styles.AccesoContainer}>
          <h3>Registrarse</h3>
          <form
            onSubmit={RegisterForm.handleSubmit(SendRegister)}
            id={styles.FormLogin}
          >
            <fieldset>
              <label htmlFor="">Nombre</label>
              <input
                {...RegisterForm.register("name")}
                type="text"
                placeholder="Ingresa su nombre"
                className={
                  !RegisterForm.getFieldState("name").invalid &&
                  RegisterForm.getFieldState("name").isTouched
                    ? styles.valid
                    : ""
                }
              />
              {RegisterForm.formState.errors.name && (
                <p className={styles.error}>
                  {RegisterForm.formState.errors.name.message}
                </p>
              )}
            </fieldset>
            <fieldset>
              <label htmlFor="">Apellido</label>
              <input
                {...RegisterForm.register("lastname")}
                type="text"
                placeholder="Ingresa su apellido"
                className={
                  !RegisterForm.getFieldState("lastname").invalid &&
                  RegisterForm.getFieldState("lastname").isTouched
                    ? styles.valid
                    : ""
                }
              />
              {RegisterForm.formState.errors.lastname && (
                <p className={styles.error}>
                  {RegisterForm.formState.errors.lastname.message}
                </p>
              )}
            </fieldset>
            <fieldset>
              <label htmlFor="">Email</label>
              <input
                type="email"
                {...RegisterForm.register("email")}
                placeholder="Ingresa su email"
                className={
                  !RegisterForm.getFieldState("email").invalid &&
                  RegisterForm.getFieldState("email").isTouched
                    ? styles.valid
                    : ""
                }
              />
              {RegisterForm.formState.errors.email && (
                <p className={styles.error}>
                  {RegisterForm.formState.errors.email.message}
                </p>
              )}
            </fieldset>
            <fieldset>
              <label htmlFor="">Contraseña</label>
              <input
                type="password"
                {...RegisterForm.register("password")}
                placeholder="Ingresa su contraseña"
                className={
                  !RegisterForm.getFieldState("password").invalid &&
                  RegisterForm.getFieldState("password").isTouched
                    ? styles.valid
                    : ""
                }
              />
              {RegisterForm.formState.errors.password && (
                <p className={styles.error}>
                  {RegisterForm.formState.errors.password.message}
                </p>
              )}
            </fieldset>
            <button id={styles.BtnLogin}>
              <NavLink to="/acceso">Registrarse</NavLink>
            </button>
          </form>
        </section>
      </main>
    </Fragment>
  );
};

export default Register;

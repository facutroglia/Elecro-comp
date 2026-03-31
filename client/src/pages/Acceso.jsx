import { Fragment } from "react";
import { useNavigate, NavLink } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import styles from "../styles/pages/Acceso.module.css";
import { useUser } from "../context/useUser";

const Acceso = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();
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
  const SendAcceso = async (data) => {
    try {
      const request = await fetch("/api/usuarios/verificar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const response = await request.json();
      if (!request.ok) {
        throw new Error(response.error || "Error al iniciar sesion");
      }
      setUser(response);
      navigate("/");
    } catch (error) {
      AccesoForm.setError("root", { message: error.message });
    }
  };
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
            {AccesoForm.formState.errors.root && (
              <p className={styles.error}>
                {AccesoForm.formState.errors.root.message}
              </p>
            )}
            <button
              id={styles.BtnLogin}
              disabled={AccesoForm.formState.isSubmitting}
            >
              Iniciar secion
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

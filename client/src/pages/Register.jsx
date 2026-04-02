import { Fragment } from "react";
import { useNavigate, NavLink, Navigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useUser } from "../context/useUser";
import styles from "../styles/pages/Register.module.css";
const Register = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const RegisterSchema = z.object({
    name: z.string().min(3, "Minimo 3 caracteres"),
    email: z.string().email("email no valido"),
    password: z.string().min(3, "Constraseña incorrecta"),
  });
  const RegisterForm = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const sendRegister = async (data) => {
    if (data.email.includes("@ecom.com")) {
      data.isAdmin = true;
    }

    try {
      const request = await fetch("/api/usuarios/registrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const response = await request.json();
      if (!request.ok) {
        throw new Error(response.error || "Error al registrar usuario");
      }
      setUser(response);
      return navigate("/");
    } catch (error) {
      RegisterForm.reset();
      RegisterForm.setError("root", {
        message: error.message,
      });
    }
  };

  if (user && user?.isAdmin) {
    return <Navigate to={"/panel"} />;
  }
  if (user) {
    return <Navigate to={"/"} />;
  }
  return (
    <Fragment>
      <main id={styles.Container}>
        <section id={styles.AccesoContainer}>
          <h3>Registrarse</h3>
          <form
            onSubmit={RegisterForm.handleSubmit(sendRegister)}
            id={styles.FormLogin}
          >
            <fieldset>
              <label htmlFor="">Nombre Completo</label>
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
            {RegisterForm.formState.errors.root && (
              <p className={styles.error}>
                {RegisterForm.formState.errors.root.message}
              </p>
            )}
            <button
              id={styles.BtnLogin}
              disabled={RegisterForm.formState.isSubmitting}
            >
              Registrarse
            </button>
          </form>
          <nav>
            <NavLink to="/login">¿Ya tienes una cuenta? Inicia sesión</NavLink>
          </nav>
        </section>
      </main>
    </Fragment>
  );
};

export default Register;

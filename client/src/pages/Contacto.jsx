import { Fragment } from "react";
import { Icon } from "@iconify/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Styles from "../styles/pages/Contact.module.css";
function Contact() {
  const contactSchema = z.object({
    name: z.string().min(3, "Minimo 3 caracteres."),
    email: z.string().email("Email no valido."),
    message: z
      .string()
      .min(15, "Minimo 15 caracteres.")
      .max(140, "Te pasaste de caracteres, maximo 140."),
  });
  const ContactForm = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });
  const sendContact = async (data) => {
    return new Promise((resolve, reject) =>
      setTimeout(() => {
        ContactForm.reset();
        resolve();
      }, 1000),
    );
  };
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

        <form
          onSubmit={ContactForm.handleSubmit(sendContact)}
          id={Styles.FormContact}
        >
          <h3>Envianos un mensaje</h3>
          <fieldset>
            <label htmlFor="">Nombre</label>
            <input
              {...ContactForm.register("name")}
              type="text"
              placeholder="Nombre completo"
              className={
                !ContactForm.getFieldState("name").invalid &&
                ContactForm.getFieldState("name").isTouched
                  ? Styles.valid
                  : ""
              }
            />
            {ContactForm.formState.errors.name && (
              <p className={Styles.error}>
                {ContactForm.formState.errors.name.message}
              </p>
            )}
          </fieldset>
          <fieldset>
            <label htmlFor="">Email</label>
            <input
              type="email"
              {...ContactForm.register("email")}
              placeholder="Email"
              className={
                !ContactForm.getFieldState("email").invalid &&
                ContactForm.getFieldState("email").isTouched
                  ? Styles.valid
                  : ""
              }
            />
            {ContactForm.formState.errors.email && (
              <p className={Styles.error}>
                {ContactForm.formState.errors.email.message}
              </p>
            )}
          </fieldset>
          <fieldset>
            <label htmlFor="">Mensaje</label>
            <textarea
              {...ContactForm.register("message")}
              placeholder="Escribe tu consulta o mensaje"
              className={
                !ContactForm.getFieldState("message").invalid &&
                ContactForm.getFieldState("message").isTouched
                  ? Styles.valid
                  : ""
              }
            />
            {ContactForm.formState.errors.message && (
              <p className={Styles.error}>
                {ContactForm.formState.errors.message.message}
              </p>
            )}
          </fieldset>
          <button
            id={Styles.BtnSubmmit}
            disabled={ContactForm.formState.isSubmitting}
          >
            {ContactForm.formState.isSubmitting ? "Enviando..." : "Enviar"}
          </button>
          {ContactForm.formState.isSubmitSuccessful && (
            <p className={Styles.MessageSucces}>
              <Icon icon="twemoji:check-mark-button" />
              Mensaje enviado con exito
            </p>
          )}
        </form>
      </section>
    </Fragment>
  );
}
export default Contact;

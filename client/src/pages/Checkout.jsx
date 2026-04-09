import { Fragment, useState } from "react";
import styles from "../styles/pages/Checkout.module.css";
import { useCart } from "../context/useCart.jsx";
import { useUser } from "../context/useUser.jsx";
import { NavLink } from "react-router";
import { useForm } from "react-hook-form";
import formatPrice from "../utils/formatPrice.js";
const Checkout = () => {
  const { cartItems, clear } = useCart();
  const { user } = useUser();
  const checkForm = useForm({
    defaultValues: {
      userId: user.id,
      name: user.name ?? "",
      phone: user.phone ?? "",
      address: user.address ?? "",
      codeZip: user.codeZip ?? "",
      items: cartItems.map((item) => ({
        productId: item.id,
        price: item.price,
        quantity: item.cantidad,
      })),
    },
  });

  const total = cartItems.reduce(
    (acc, item) => (acc += item.price * item.cantidad),
    0,
  );
  const createOrder = async (data) => {
    try {
      console.clear();
      const reqOrder = await fetch("/api/ordenes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const resOrder = await reqOrder.json();
      if (!reqOrder.ok) {
        throw new Error(resOrder.error || "Error en el servidor");
      }

      clear();
    } catch (error) {
      checkForm.setError(
        "root",
        error.message || "Error al finalizar la compra",
      );
    }
  };

  if (checkForm.formState.isSubmitSuccessful) {
    return (
      <section className={styles.SuccessContainer}>
        <main className={styles.SuccessContent}>
          <p className={styles.SuccessText}>Compra realizada con éxito!</p>
          <NavLink to="/" className={styles.BtnVolver}>
            Volver al inicio
          </NavLink>
        </main>
      </section>
    );
  }

  return (
    <Fragment>
      <h2>Datos del envio</h2>
      <section className={styles.CheckoutContainer}>
        <form
          id="CheckoutForm"
          className={styles.FormCheckout}
          onSubmit={checkForm.handleSubmit(createOrder)}
        >
          <h3>Completa los datos del envio</h3>
          <fieldset className={styles.InputGroup}>
            <label>Nombre completo</label>
            <input
              type="text"
              {...checkForm.register("name", { required: true })}
            />
          </fieldset>

          <fieldset className={styles.InputGroup}>
            <label>Telefono</label>
            <input
              type="tel"
              {...checkForm.register("phone", { required: true })}
            />
          </fieldset>

          <fieldset className={styles.InputGroup}>
            <label>Dirección</label>
            <input
              type="text"
              {...checkForm.register("address", { required: true })}
            />
          </fieldset>

          <fieldset className={styles.InputGroup}>
            <label>Codigo postal</label>
            <input
              type="text"
              {...checkForm.register("codeZip", { required: true })}
            />
          </fieldset>
        </form>
        <aside className={styles.SummaryCard}>
          <h3>Resumen del Pedido</h3>
          <ul className={styles.ItemList}>
            {cartItems.map((item) => (
              <li key={item.id} className={styles.SummaryItem}>
                <span>
                  {item.name} - ({item.cantidad})
                </span>
                <span>{formatPrice(item.price * item.cantidad)}</span>
              </li>
            ))}
          </ul>

          <section className={styles.Totals}>
            <p className={styles.Row}>
              <span>Subtotal: </span>
              <span>{formatPrice(total)}</span>
            </p>
            <p>Envio gratis</p>
            <p className={`${styles.Row} ${styles.TotalRow}`}>
              <strong>Total: </strong>
              <strong>{formatPrice(total)}</strong>
            </p>
          </section>

          <button className={styles.BtnPay} type="submit" form="CheckoutForm">
            Confirmar y Pagar
          </button>
        </aside>
      </section>
    </Fragment>
  );
};

export default Checkout;

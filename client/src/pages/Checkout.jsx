import { Fragment, useState } from "react";
import styles from "../styles/pages/Checkout.module.css";
import { useCart } from "../context/useCart.jsx";
import { NavLink } from "react-router";

const Checkout = () => {
  const { cartItems, clear } = useCart();
  const [isSuccess, setIsSuccess] = useState(false);

  const total = cartItems.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0,
  );
  const handleSubmit = (e) => {
    e.preventDefault(); // Esto se dispara gracias al vínculo que haremos abajo
    setIsSuccess(true);
    clear();
  };

  if (isSuccess) {
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
          onSubmit={handleSubmit}
        >
          <h3>Completa los datos del envio</h3>
          <fieldset className={styles.InputGroup}>
            <label>Nombre completo</label>
            <input type="text" required />
          </fieldset>

          <fieldset className={styles.InputGroup}>
            <label>Telefono</label>
            <input type="tel" required />
          </fieldset>

          <fieldset className={styles.InputGroup}>
            <label>Email</label>
            <input type="email" required />
          </fieldset>

          <fieldset className={styles.InputGroup}>
            <label>Ciudad</label>
            <input type="text" required />
          </fieldset>

          <fieldset className={styles.InputGroup}>
            <label>Pais</label>
            <input type="text" required />
          </fieldset>
          <fieldset className={styles.InputGroup}>
            <label>Codigo postal</label>
            <input type="number" required />
          </fieldset>
        </form>
        <aside className={styles.SummaryCard}>
          <h3>Resumen del Pedido</h3>
          <ul className={styles.ItemList}>
            {cartItems.map((item) => (
              <li key={item.id} className={styles.SummaryItem}>
                <span>
                  {item.name} (x{item.cantidad})
                </span>
                <span>
                  ${(item.precio * item.cantidad).toLocaleString("es-AR")}
                </span>
              </li>
            ))}
          </ul>

          <section className={styles.Totals}>
            <p className={styles.Row}>
              <span>Subtotal: </span>
              <span>${total.toLocaleString("es-AR")}</span>
            </p>
            <p>Envio gratis</p>
            <p className={`${styles.Row} ${styles.TotalRow}`}>
              <strong>Total: </strong>
              <strong>${total.toLocaleString("es-AR")}</strong>
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

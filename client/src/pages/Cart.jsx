import { Fragment } from "react";
import styles from "../styles/pages/Cart.module.css";
import Item from "../components/Item";
import { NavLink } from "react-router";
import { useCart } from "../context/useCart.jsx";
import { useUser } from "../context/useUser.jsx";
import { Icon } from "@iconify/react";
import formatPrice from "../utils/formatPrice.js";
const Cart = () => {
  const { cartItems, clear } = useCart();
  const { user } = useUser();
  const total = cartItems.reduce((acc, item) => {
    return (acc += item.price * item.cantidad);
  }, 0);

  return (
    <Fragment>
      <section className={styles.CartContainer}>
        <header className={styles.Header}>
          <h2 className={styles.Title}>Carrito de compras</h2>
          <button
            type="button"
            className={styles.BtnClear}
            onClick={() => clear()}
          >
            <Icon icon="mdi:trash" />
          </button>
        </header>
        <table
          className={styles.TableProducts}
          cellpadding="0"
          cellspacing="0"
          border="0"
        >
          <thead>
            <tr id={styles.TheadTable}>
              <th className={styles.thTitle}>Producto</th>
              <th className={styles.thTitle}>Precio</th>
              <th className={styles.thTitle}>Cantidad</th>
              <th className={styles.thTitle}>Sub total</th>
              <th className={styles.thTitle}>Eliminar</th>
            </tr>
          </thead>
          <tbody className={styles.Tbody}>
            {cartItems.length === 0 ? (
              <tr>
                <td colSpan="5" className={styles.EmptyCart}>
                  No hay productos en el carrito
                </td>
              </tr>
            ) : (
              cartItems.map((item) => (
                <Item key={item.id} producto={item} cantidad={item.cantidad} />
              ))
            )}
          </tbody>
          <tfoot className={styles.Tfoot}>
            <tr className={styles.tr}>
              <td className={styles.TdTotal} colSpan="5">
                <b>Total:</b>
              </td>
              <td className={styles.TdTotal}>
                <b>
                  <b>{formatPrice(total)}</b>
                </b>
              </td>
            </tr>
          </tfoot>
        </table>

        {user && cartItems.length > 0 && (
          <NavLink to="/usuario/checkout" className={styles.BtnPay}>
            Finalizar compra
          </NavLink>
        )}
      </section>
    </Fragment>
  );
};

export default Cart;

import { Fragment } from "react";
import styles from "../styles/pages/Cart.module.css";
import Item from "../components/Item";

const Cart = () => {
  return (
    <Fragment>
      <h2>Carrito de compras</h2>
      <section id={styles.CartContainer}>
        <table className={styles.TableProducts}>
          <thead>
            <tr id={styles.TheadTable}>
              <th className={styles.thTitle}>Producto</th>
              <th className={styles.thTitle}>Precio</th>
              <th className={styles.thTitle}>Cantidad</th>
              <th className={styles.thTitle}>Sub total</th>
            </tr>
          </thead>
          <tbody className={styles.Tbody}>
            <Item />
          </tbody>
          <tfoot className={styles.Tfoot}>
            <tr className={styles.tr}>
              <td className={styles.TdTotal} colSpan="4">
                <b>Total:</b>{" "}
              </td>
              <td className={styles.TdTotal}>
                {" "}
                <b>80 USD</b>
              </td>
            </tr>
          </tfoot>
        </table>
      </section>
    </Fragment>
  );
};

export default Cart;

import { Fragment } from "react";
import styles from "../styles/pages/Orders.module.css";
import SideBar from "../components/SideBar.jsx";
import OrderedProducts from "../components/OrderedProducts.jsx";

const Orders = () => {
  return (
    <Fragment>
      <section id={styles.OrdersContainer}>
        <SideBar />
        <section className={styles.Content}>
          <h2>Mis compras</h2>
          <table className={styles.TableProducts}>
            <thead>
              <tr id={styles.TheadTable}>
                <th className={styles.thTitle}>Fecha</th>
                <th className={styles.thTitle}>Detalle</th>
                <th className={styles.thTitle}>Monto</th>
                <th className={styles.thTitle}>Estado</th>
              </tr>
            </thead>
            <tbody className={styles.Tbody}>
              <OrderedProducts />
            </tbody>
          </table>
        </section>
      </section>
    </Fragment>
  );
};

export default Orders;

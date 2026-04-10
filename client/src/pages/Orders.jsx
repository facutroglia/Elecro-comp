import { Fragment, useState } from "react";
import styles from "../styles/pages/Orders.module.css";
import SideBar from "../components/SideBar.jsx";
import OrderedProducts from "../components/OrderedProducts.jsx";
import DetailOrders from "../components/DetailOrders.jsx";

const Orders = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <Fragment>
      <section id={styles.OrdersContainer}>
        <SideBar />
        <main className={styles.OrdersContent}>
          <header className={styles.HeaderOrders}>
            <h2>Mis pedidos</h2>
          </header>
          <section className={styles.OrdersList}>
            <OrderedProducts onOpen={() => setIsModalOpen(true)} />
          </section>
        </main>
      </section>
      {isModalOpen && <DetailOrders onClose={() => setIsModalOpen(false)} />}
    </Fragment>
  );
};

export default Orders;

import { Fragment, useState, useEffect } from "react";
import styles from "../styles/pages/Orders.module.css";
import SideBar from "../components/SideBar.jsx";
import OrderedProducts from "../components/OrderedProducts.jsx";
import DetailOrders from "../components/DetailOrders.jsx";
import { useUser } from "../context/useUser.jsx";
const Orders = () => {
  const { user } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [list, setList] = useState([]);
  useEffect(() => {
    const getUser = async (userId) => {
      try {
        const response = await fetch("/api/usuarios/perfil", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: userId }),
        });

        const data = await response.json();
        if (!response.ok) throw new Error("Error al traer al usuario");
        setList(data.orders);
        return;
      } catch (error) {
        console.error(error.message);
      }
    };
    if (user) {
      getUser(user.id);
    }
  }, [user]);
  return (
    <Fragment>
      <section id={styles.OrdersContainer}>
        <SideBar />
        <main className={styles.OrdersContent}>
          <header className={styles.HeaderOrders}>
            <h2>Mis pedidos</h2>
          </header>
          <section className={styles.OrdersList}>
            <OrderedProducts
              orders={list}
              onOpen={() => setIsModalOpen(true)}
              setCurrent={(order) => setCurrentOrder(order)}
            />
          </section>
        </main>
      </section>
      {isModalOpen && (
        <DetailOrders
          order={currentOrder}
          onClose={() => {
            setIsModalOpen(false);
            setCurrentOrder(null);
          }}
        />
      )}
    </Fragment>
  );
};

export default Orders;

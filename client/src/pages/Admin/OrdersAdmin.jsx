import React, { useState } from "react";
import { useLoaderData } from "react-router";
import Template from "../../components/Template";
import styles from "../../styles/pages/AdminOrders.module.css";
import { Icon } from "@iconify/react";

const AdminOrders = () => {
  const { pedidos } = useLoaderData();
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);
  const getTotal = (items) => {
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };
  return (
    <Template title={"Panel | Gestión de Pedidos"}>
      <div className={styles.OrdersContainer}>
        {pedidos.length > 0 ? (
          <table className={styles.Table}>
            <thead>
              <tr>
                <th>ID Pedido</th>
                <th>Cliente</th>
                <th>Fecha</th>
                <th>Total</th>
                <th>Detalle</th>
                <th>Editar</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody className={styles.TableContent}>
              {pedidos.map((pedido) => (
                <tr key={pedido.id}>
                  <td>#{pedido.id.split("-")[0]}</td>
                  <td>{pedido.name || pedido.user?.email || "Sin nombre"}</td>
                  <td>
                    {pedido.date
                      ? new Date(pedido.date).toLocaleDateString()
                      : "Sin fecha"}
                  </td>
                  <td>${getTotal(pedido.items)}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => setPedidoSeleccionado(pedido)}
                      className={styles.BtnOrders}
                    >
                      Ver detalle
                    </button>
                  </td>
                  <td>
                    <button type="button" className={styles.BtnOrders}>
                      Editar
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => handleDelete(pedido.id)}
                      className={styles.BtnDeleteOrder}
                    >
                      <Icon icon="mdi:trash" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className={styles.noData}>
            No hay pedidos registrados actualmente.
          </p>
        )}
        {pedidoSeleccionado && (
          <div
            className={styles.ModalOverlay}
            onClick={() => setPedidoSeleccionado(null)}
          >
            <section
              className={styles.ModalContent}
              onClick={(e) => e.stopPropagation()}
            >
              <header className={styles.ModalHeader}>
                <h3>
                  Detalle del Pedido #{pedidoSeleccionado.id.split("-")[0]}
                </h3>
                <button
                  className={styles.BtnCloseDetail}
                  onClick={() => setPedidoSeleccionado(null)}
                >
                  &times;
                </button>
              </header>

              <main className={styles.ModalBody}>
                <p>
                  <strong>Cliente:</strong>{" "}
                  {pedidoSeleccionado.name || pedidoSeleccionado.user?.email}
                </p>
                <p>
                  <strong>Dirección:</strong> {pedidoSeleccionado.address},{" "}
                  {pedidoSeleccionado.codeZip}
                </p>
                <p>
                  <strong>Teléfono:</strong>{" "}
                  {pedidoSeleccionado.phone || "No provisto"}
                </p>

                <hr className={styles.Separator} />

                <h4>Productos:</h4>
                <ul className={styles.ProductList}>
                  {pedidoSeleccionado.items.map((item) => (
                    <li key={item.id} className={styles.ProductItem}>
                      <span>
                        {item.product.name} (x{item.quantity})
                      </span>
                      <span>
                        ${(item.price * item.quantity).toLocaleString()}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className={styles.ModalTotal}>
                  <strong>Total Final:</strong>
                  <strong>
                    ${getTotal(pedidoSeleccionado.items).toLocaleString()}
                  </strong>
                </div>
              </main>
            </section>
          </div>
        )}
      </div>
    </Template>
  );
};

export default AdminOrders;

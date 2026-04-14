import { Fragment, useState, useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import Template from "../../components/Template";
import styles from "../../styles/pages/AdminOrders.module.css";
import { Icon } from "@iconify/react";
import formatPrice from "../../utils/formatPrice.js";
const AdminOrders = () => {
  const { pedidos } = useLoaderData();
  const navigate = useNavigate();
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [alert, setAlert] = useState(false);
  const removeForm = useForm({ defaultValues: { id: null } });
  const getTotal = (items) => {
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const remove = async (data) => {
    try {
      const req = await fetch(`${import.meta.env.VITE_BACKEND_URL}/ordenes`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await req.json();
      if (!req.ok) {
        throw new Error(res.error ?? "No se reconocio la orden de compra");
      }
      navigate(0);
    } catch (error) {
      removeForm.setError("root", error.message ?? "No se pudo eliminar");
    }
  };

  useEffect(() => {
    if (confirm) {
      removeForm.setValue("id", confirm.id);
    }
  }, [confirm]);

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
                  <td>{formatPrice(getTotal(pedido.items))}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => setPedidoSeleccionado(pedido)}
                      className={styles.BtnOrders}
                    >
                      <Icon icon="mdi:eye" />
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => {
                        setAlert(true);
                        setConfirm(pedido);
                      }}
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

        {alert && confirm && (
          <div
            className={styles.ModalOverlay}
            onClick={() => {
              setAlert(false);
              setConfirm(null);
            }}
          >
            <section
              className={`${styles.ModalContent} ${styles.Alert}`}
              onClick={(e) => e.stopPropagation()}
            >
              <p>
                Estas seguro que deseas eleminar esta orden de compra? #
                {confirm.id.split("-")[0]}
              </p>
              <form onSubmit={removeForm.handleSubmit(remove)}>
                <button
                  type="submit"
                  disabled={removeForm.formState.isSubmitting}
                >
                  {removeForm.formState.isSubmitting ? (
                    <>
                      <Icon icon="line-md:loading-loop" />
                    </>
                  ) : (
                    <>
                      <Icon icon="mdi:check" />
                      Si
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAlert(false);
                    setConfirm(null);
                  }}
                >
                  <Icon icon="mdi:close" />
                  No
                </button>
              </form>
            </section>
          </div>
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
                  <Icon icon="mdi:close" />
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
                        {item.product.name} {`(x${item.quantity})`}
                      </span>
                      <span>{formatPrice(item.price * item.quantity)}</span>
                    </li>
                  ))}
                </ul>

                <div className={styles.ModalTotal}>
                  <strong>Total Final:</strong>
                  <strong>
                    {formatPrice(getTotal(pedidoSeleccionado.items))}
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

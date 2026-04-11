import React from "react";
import { Fragment } from "react";
import styles from "../styles/components/OrderedProducts.module.css";
import moment from "moment";
import formatPrice from "../utils/formatPrice.js";
function OrderedProducts({ onOpen, setCurrent, orders }) {
  return (
    <Fragment>
      {orders.length > 0 &&
        orders.map((order, index) => (
          <section className={styles.MiniCard} key={order.id}>
            <header className={styles.HeaderData}>
              <h4 className={styles.CodeOrder}>
                Codigo del Pedido: #{order.id.split("-").find((_, i) => i == 0)}
              </h4>
              <h4 className={styles.InfoH4}>
                Fecha: {moment(order.date).format("L")}
              </h4>
              <h4 className={styles.InfoH4}>
                Cantidad de Productos:{" "}
                {order.items
                  .map(({ quantity }) => quantity)
                  .reduce((a, c) => (a += c), 0)}
              </h4>
            </header>
            <ul className={styles.UlProducts}>
              {order.items.slice(0, 3).map((item) => (
                <li className={styles.LiProducts}>
                  <img src={`/assets/${item?.product?.gallery?.[0].url}`} />
                  <p>{item.product.name}</p>
                  <p>
                    {formatPrice(item.price)} x {`(${item.quantity})`}
                  </p>
                </li>
              ))}
            </ul>

            <p className={styles.TotalPrice}>
              Total:
              <span>
                {formatPrice(
                  order.items
                    .map(({ quantity, price }) => quantity * price)
                    .reduce((a, c) => (a += c), 0),
                )}
              </span>
            </p>
            <button
              className={styles.BtnDetail}
              onClick={() => {
                onOpen();
                setCurrent(order);
              }}
            >
              Ver detalle
            </button>
          </section>
        ))}
    </Fragment>
  );
}

export default OrderedProducts;

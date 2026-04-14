import React from "react";
import { Icon } from "@iconify/react";
import styles from "../styles/components/DetailOrders.module.css";
import moment from "moment";
import formatPrice from "../utils/formatPrice";
function DetailOrders({ onClose, order }) {
  return (
    <section className={styles.Overlay} onClick={onClose}>
      <main className={styles.Modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.BtnCloseDetail} onClick={onClose}>
          <Icon icon="mdi:close" />
        </button>
        <div className={styles.DataOrder}>
          <h3>Codigo Pedido: #{order.id.split("-").find((_, i) => i == 0)}</h3>
          <dl className={styles.InfoOrder}>
            <dt>
              <b>Nombre:</b>
            </dt>
            <dd> {order.name}</dd>
            <dt>
              <b>Ubicacion:</b>
            </dt>
            <dd> {order.address}</dd>
            <dt>
              <b>Fecha:</b>
            </dt>
            <dd> {moment(order.date).format("L")}</dd>

            <dt>
              <b>Tel/Cel:</b>
            </dt>
            <dd> {order.phone}</dd>
            <dt>
              <b>Codigo Postal:</b>
            </dt>
            <dd> {order.codeZip}</dd>
            <dt>
              <b>Productos:</b>
            </dt>
            <dd>
              {order.items
                .map(({ quantity }) => quantity)
                .reduce((a, c) => (a += c), 0)}
            </dd>
          </dl>
        </div>
        <div className={styles.DetailProducts}>
          <h3>productos</h3>
          <ul className={styles.ProductList}>
            {order.items.map((item) => (
              <li key={item.id}>
                <img
                  src={`${import.meta.env.VITE_BACKEND_PUBLIC}/${item?.product?.gallery?.[0].url}`}
                />
                <p>{item.product.name}</p>
                <p>
                  {formatPrice(item.price)} x {`(${item.quantity})`}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.FooterDetail}>
          <h4>Total Pagado</h4>
          <p>
            {formatPrice(
              order.items
                .map(({ quantity, price }) => quantity * price)
                .reduce((a, c) => (a += c), 0),
            )}
          </p>
        </div>
      </main>
    </section>
  );
}

export default DetailOrders;

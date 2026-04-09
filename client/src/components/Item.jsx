import React from "react";
import styles from "../styles/components/Item.module.css";
import { Fragment } from "react";
import { Icon } from "@iconify/react";
import { useCart } from "../context/useCart.jsx";
import { id } from "zod/v4/locales";
import formatPrice from "../utils/formatPrice.js";
function Item({ producto, cantidad }) {
  const { add, reduce, remove } = useCart();
  const subtotal = (producto.price || 0) * (cantidad || 0);
  return (
    <Fragment>
      <tr className={styles.ItemProducto}>
        <td data-label="Producto" className={styles.Datos}>
          {producto.name}
        </td>
        <td data-label="Precio" className={styles.Datos}>
          {formatPrice(producto.price)}
        </td>
        <td data-label="Cantidad" className={styles.Cantidad}>
          <button
            className={styles.BtnCantidad}
            type="button"
            onClick={() => reduce(producto)}
          >
            <Icon icon="akar-icons:minus"></Icon>
          </button>
          <output>{cantidad || 0}</output>
          <button
            className={styles.BtnCantidad}
            type="button"
            onClick={() => add(producto)}
          >
            <Icon icon="akar-icons:plus"></Icon>
          </button>
        </td>
        <td data-label="Sub total">
          <output className={styles.Datos}>{formatPrice(subtotal)}</output>
        </td>
        <td>
          <button
            className={styles.BtnEliminar}
            type="button"
            onClick={() => remove(producto.id)}
          >
            <Icon icon="boxicons:trash"></Icon>
          </button>
        </td>
      </tr>
    </Fragment>
  );
}

export default Item;

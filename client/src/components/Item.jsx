import React from "react";
import styles from "../styles/components/Item.module.css";
import { Fragment } from "react";
import { Icon } from "@iconify/react";

function Item() {
  return (
    <Fragment>
      <tr className={styles.ItemProducto}>
        <td className={styles.Datos}>RTX 4060 8GB</td>
        <td className={styles.Datos}>$ 10000</td>
        <td>
          <input className={styles.Cantidad} type="number" step={1} min={1} />
        </td>
        <td>
          <output className={styles.Datos}>$ 10000</output>
        </td>
        <td>
          <button className={styles.BtnEliminar} type="button">
            <Icon icon="boxicons:trash"></Icon>
          </button>
        </td>
      </tr>
      <tr className={styles.ItemProducto}>
        <td className={styles.Datos}>RTX 4060 8GB</td>
        <td className={styles.Datos}>$ 10000</td>
        <td>
          <input className={styles.Cantidad} type="number" step={1} min={1} />
        </td>
        <td>
          <output className={styles.Datos}>$ 10000</output>
        </td>
        <td>
          <button className={styles.BtnEliminar} type="button">
            <Icon icon="boxicons:trash"></Icon>
          </button>
        </td>
      </tr>
    </Fragment>
  );
}

export default Item;

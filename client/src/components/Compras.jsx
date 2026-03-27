import React from "react";
import { Fragment } from "react";
import styles from "../styles/components/Item.module.css";

function Compras() {
  return (
    <Fragment>
      <tr className={styles.ItemProducto}>
        <td className={styles.Datos}>26/03/26</td>
        <td className={styles.Datos}>RTX 4060 8GB</td>
        <td className={styles.Datos}> $ 10000</td>
        <td className={styles.Datos}>Entregado</td>
      </tr>
      <tr className={styles.ItemProducto}>
        <td className={styles.Datos}>25/03/26</td>
        <td className={styles.Datos}>RTX 4060 8GB</td>
        <td className={styles.Datos}>$ 10000</td>
        <td className={styles.Datos}>En espera</td>
      </tr>
    </Fragment>
  );
}

export default Compras;

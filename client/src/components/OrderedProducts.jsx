import React from "react";
import { Fragment } from "react";
import styles from "../styles/components/OrderedProducts.module.css";

function OrderedProducts() {
  return (
    <Fragment>
      <tr className={styles.Order}>
        <td className={styles.Info}>26/03/2026</td>
        <td className={styles.Info}>RTX 4060 8GB</td>
        <td className={styles.Info}>$ 168000</td>
        <td className={styles.Info}>En revision</td>
      </tr>
      <tr className={styles.Order}>
        <td className={styles.Info}>20/03/2026</td>
        <td className={styles.Info}>RTX 4060 8GB</td>
        <td className={styles.Info}>$ 253000</td>
        <td className={styles.Info}>Cancelado</td>
      </tr>
      <tr className={styles.Order}>
        <td className={styles.Info}>15/03/2026</td>
        <td className={styles.Info}>RTX 4060 8GB</td>
        <td className={styles.Info}>$ 1015000</td>
        <td className={styles.Info}>Entregado</td>
      </tr>
    </Fragment>
  );
}

export default OrderedProducts;

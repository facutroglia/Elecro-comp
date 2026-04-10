import React from "react";
import { Fragment } from "react";
import styles from "../styles/components/OrderedProducts.module.css";

function OrderedProducts({ onOpen }) {
  return (
    <Fragment>
      <section className={styles.MiniCard}>
        <header className={styles.HeaderData}>
          <h4>Pedido N°456</h4>
          <h4>19/03/2026</h4>
          <h4>31be8492</h4>
        </header>
        <ul className={styles.UlProducts}>
          <li className={styles.LiProducts}>
            <img src="/1775225515775_Disco_Solido_SSD_M.2_MSI_500GB_01.jpg" />
            <p>Disco Sólido SSD MSI 480GB</p>
            <p>$114.000</p>
          </li>
          <li className={styles.LiProducts}>
            <img src="/1775225515775_Disco_Solido_SSD_M.2_MSI_500GB_01.jpg" />
            <p>Disco Sólido SSD MSI 480GB</p>
            <p>$114.000</p>
          </li>{" "}
          <li className={styles.LiProducts}>
            <img src="/1775225515775_Disco_Solido_SSD_M.2_MSI_500GB_01.jpg" />
            <p>Disco Sólido SSD MSI 480GB</p>
            <p>$114.000</p>
          </li>
        </ul>

        <p className={styles.TotalPrice}>Total: $5.000.000</p>
        <button className={styles.BtnDetail} onClick={onOpen}>
          Ver detalle
        </button>
      </section>
    </Fragment>
  );
}

export default OrderedProducts;

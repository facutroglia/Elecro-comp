import React from "react";
import { Icon } from "@iconify/react";
import styles from "../styles/components/DetailOrders.module.css";

function DetailOrders({ onClose }) {
  return (
    <section className={styles.Overlay} onClick={onClose}>
      <main className={styles.Modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.BtnCloseDetail} onClick={onClose}>
          <Icon icon="mdi:close" />
        </button>
        <div className={styles.DataOrder}>
          <h3>Pedido N° 456</h3>
          <p>
            <b>Nombre:</b>Facundo
          </p>
          <p>
            <b>Ubicacion:</b>Cordoba, Arg
          </p>
          <p>
            <b>Fecha:</b>19/03/2026
          </p>
        </div>
        <div className={styles.DetailProducts}>
          <h3>productos</h3>
          <ul className={styles.ProductList}>
            <li>
              <img src="/1775225515775_Disco_Solido_SSD_M.2_MSI_500GB_01.jpg" />
              <p>Procesador Intel i9 14900K</p>
              <p>$865.000</p>
            </li>
            <li>
              <img src="/1775225515775_Disco_Solido_SSD_M.2_MSI_500GB_01.jpg" />
              <p>Procesador Intel i9 14900K</p>
              <p>$865.000</p>
            </li>{" "}
            <li>
              <img src="/1775225515775_Disco_Solido_SSD_M.2_MSI_500GB_01.jpg" />
              <p>Procesador Intel i9 14900K</p>
              <p>$865.000</p>
            </li>{" "}
            <li>
              <img src="/1775225515775_Disco_Solido_SSD_M.2_MSI_500GB_01.jpg" />
              <p>Procesador Intel i9 14900K</p>
              <p>$865.000</p>
            </li>
          </ul>
        </div>
        <div className={styles.FooterDetail}>
          <h4>Total Pagado</h4>
          <p>$865.000</p>
        </div>
      </main>
    </section>
  );
}

export default DetailOrders;

import { Fragment } from "react";
import { useLoaderData } from "react-router";
import Template from "../../components/Template";
import ProductAdd from "../../components/ProductAdd";
import Inventory from "../../components/Inventory";
import styles from "../../styles/pages/ProductAdmin.module.css";

const AdminProducts = () => {
  const { productos } = useLoaderData();
  return (
    <Fragment>
      <Template title={"Control | Inventario"}>
        <div className={styles.AdminLayaout}>
          <aside className={styles.FormColumn}>
            <ProductAdd />
          </aside>
          <section className={styles.InventoryColumn}>
            <Inventory products={productos} />
          </section>
        </div>
      </Template>
    </Fragment>
  );
};

export default AdminProducts;

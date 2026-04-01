import styles from "../../styles/pages/Dashboard.module.css";
import { Fragment } from "react";
import Template from "../../components/Template";
const Dashboard = () => {
  return (
    <Fragment>
      <Template title={"Panel | Administración"}>
        <ul className={styles.DashboardContainer}>
          <li className={styles.ListDashboard}>
            <dl>
              <dt>Productos</dt>
              <dd>12</dd>
            </dl>
          </li>
          <li className={styles.ListDashboard}>
            <dl>
              <dt>Usuarios</dt>
              <dd>3</dd>
            </dl>
          </li>
          <li className={styles.ListDashboard}>
            <dl>
              <dt>Pedidos</dt>
              <dd>5</dd>
            </dl>
          </li>
          <li className={styles.ListDashboard}>
            <dl>
              <dt>Categorias</dt>
              <dd>4</dd>
            </dl>
          </li>
          <li className={styles.ListDashboard}>
            <dl>
              <dt>Marcas</dt>
              <dd>4</dd>
            </dl>
          </li>
        </ul>
      </Template>
    </Fragment>
  );
};

export default Dashboard;

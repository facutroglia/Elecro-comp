import styles from "../../styles/pages/Dashboard.module.css";
import { Fragment } from "react";
import { useLoaderData } from "react-router";
import Template from "../../components/Template";
const Dashboard = () => {
  const { productos, usuarios, pedidos, categorias, marcas } = useLoaderData();
  return (
    <Fragment>
      <Template title={"Panel | Administración"}>
        <ul className={styles.DashboardContainer}>
          <li className={styles.ListDashboard}>
            <dl>
              <dt>Productos</dt>
              <dd>{productos}</dd>
            </dl>
          </li>
          <li className={styles.ListDashboard}>
            <dl>
              <dt>Usuarios</dt>
              <dd>{usuarios}</dd>
            </dl>
          </li>
          <li className={styles.ListDashboard}>
            <dl>
              <dt>Pedidos</dt>
              <dd>{pedidos}</dd>
            </dl>
          </li>
          <li className={styles.ListDashboard}>
            <dl>
              <dt>Categorias</dt>
              <dd>{categorias}</dd>
            </dl>
          </li>
          <li className={styles.ListDashboard}>
            <dl>
              <dt>Marcas</dt>
              <dd>{marcas}</dd>
            </dl>
          </li>
        </ul>
      </Template>
    </Fragment>
  );
};

export default Dashboard;

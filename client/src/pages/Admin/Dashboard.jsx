import styles from "../../styles/pages/Dashboard.module.css";
import { Fragment } from "react";
import Template from "../../components/Template";
const Dashboard = () => {
  return (
    <Fragment>
      <Template title={"Panel | Administración"}>
        <ul>
          <li>
            <dl>
              <dt>Productos</dt>
              <dd>12</dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>Usuarios</dt>
              <dd>3</dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>Pedidos</dt>
              <dd>5</dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>Categorias</dt>
              <dd>4</dd>
            </dl>
          </li>
          <li>
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

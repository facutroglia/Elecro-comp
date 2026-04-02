import { Fragment } from "react";
import Template from "../../components/Template";
import ProductAdd from "../../components/ProductAdd";
import Inventory from "../../components/Inventory";

const AdminProducts = () => {
  return (
    <Fragment>
      <Template title={"Control | Inventario"}>
        <ProductAdd />
        <Inventory />
      </Template>
    </Fragment>
  );
};

export default AdminProducts;

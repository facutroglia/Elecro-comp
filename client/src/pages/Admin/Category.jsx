import { Fragment } from "react";
import Template from "../../components/Template";
import CategoryAdd from "../../components/CategoryAdd";
import CategoryList from "../../components/CategoryList";
const AdminCategory = () => {
  return (
    <Fragment>
      <Template title={"Control | Categorias"}>
        <CategoryAdd />
        <CategoryList />
      </Template>
    </Fragment>
  );
};

export default AdminCategory;

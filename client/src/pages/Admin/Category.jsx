import { Fragment } from "react";
import Template from "../../components/Template";
import style from "../../styles/pages/AdminCategory.module.css";
import CategoryAdd from "../../components/CategoryAdd";
import CategoryList from "../../components/CategoryList";
const AdminCategory = () => {
  return (
    <Fragment>
      <Template title={"Control | Categorias"}>
        <div id={style.wrapper}>
          <CategoryAdd />
          <CategoryList />
        </div>
      </Template>
    </Fragment>
  );
};

export default AdminCategory;

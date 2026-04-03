import { Fragment } from "react";
import { useLoaderData } from "react-router";
import Template from "../../components/Template";
import style from "../../styles/pages/AdminCategory.module.css";
import CategoryAdd from "../../components/CategoryAdd";
import CategoryList from "../../components/CategoryList";
const AdminCategory = () => {
  const { categorias } = useLoaderData();
  return (
    <Fragment>
      <Template title={"Control | Categorias"}>
        <div id={style.wrapper}>
          <CategoryAdd />
          <CategoryList categorias={categorias} />
        </div>
      </Template>
    </Fragment>
  );
};

export default AdminCategory;

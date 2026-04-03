import { Fragment } from "react";
import { useLoaderData } from "react-router";
import Template from "../../components/Template";
import BrandAdd from "../../components/BrandAdd";
import BrandList from "../../components/BrandList";
import style from "../../styles/pages/AdminBrand.module.css";
const AdminBrand = () => {
  const { marcas } = useLoaderData();
  return (
    <Fragment>
      <Template title={"Control | Marcas"}>
        <div id={style.wrapper}>
          <BrandAdd />
          <BrandList brands={marcas} />
        </div>
      </Template>
    </Fragment>
  );
};

export default AdminBrand;

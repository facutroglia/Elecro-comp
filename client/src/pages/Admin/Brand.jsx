import { Fragment } from "react";
import Template from "../../components/Template";
import BrandAdd from "../../components/BrandAdd";
import BrandList from "../../components/BrandList";
import style from "../../styles/pages/AdminBrand.module.css";
const AdminBrand = () => {
  return (
    <Fragment>
      <Template title={"Control | Marcas"}>
        <div id={style.wrapper}>
          <BrandAdd />
          <BrandList />
        </div>
      </Template>
    </Fragment>
  );
};

export default AdminBrand;

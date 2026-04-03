import { Fragment, useState, useEffect } from "react";
import ProductList from "../components/ProductList";
import { Icon } from "@iconify/react";
import {
  useLoaderData,
  useLocation,
  useNavigate,
  useParams,
} from "react-router";
import styles from "../styles/pages/Category.module.css";
// import productos from "../assets/productos.json";
const Category = () => {
  const { productos } = useLoaderData();
  const [c, setC] = useState("");
  const { search, pathname } = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  useEffect(() => {
    const query = new URLSearchParams(search);
    setC(params.categoria || "");
  }, [pathname, search, params]);
  return (
    <Fragment>
      <section id={styles.CategoryContainer}>
        <header className={styles.TitleCategory}>
          <h2>Productos de la categoria: {c}</h2>
        </header>
        <ProductList products={productos} />
      </section>
    </Fragment>
  );
};

export default Category;

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
const Category = () => {
  // const { productos,total,next,prev} = useLoaderData();
  const [c, setC] = useState("");
  const [p, setP] = useState(1);
  const { search, pathname } = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  useEffect(() => {
    const query = new URLSearchParams(search);
    setC(params.categoria || "");
    setP(query.get("p") || 1);
  }, [pathname, search, params]);
  return (
    <Fragment>
      <section id={styles.CategoryContainer}>
        <header className={styles.TitleCategory}>
          <h2>Productos de la categoria: {c}</h2>
        </header>
        <ProductList />
        <footer>
          {/* Paginacion */}
          <form id={styles.paginate}>
            <button
              className={styles.BtnPaginate}
              type="button"
              onClick={() => navigate(0)}
              disabled={true}
            >
              <Icon icon="mdi:arrow-left" />
            </button>
            <output>{p}</output>
            <button
              className={styles.BtnPaginate}
              type="button"
              onClick={() => navigate(0)}
              disabled={true}
            >
              <Icon icon="mdi:arrow-right" />
            </button>
          </form>
        </footer>
      </section>
    </Fragment>
  );
};

export default Category;

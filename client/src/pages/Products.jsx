import { Fragment, useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useLoaderData, useLocation, useNavigate } from "react-router";
import ProductList from "../components/ProductList";
import styles from "../styles/pages/Products.module.css";

const Products = () => {
  // const { productos,total,next,prev} = useLoaderData();
  const [q, setQ] = useState("");
  const [p, setP] = useState(1);
  const { search, pathname } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const query = new URLSearchParams(search);
    setQ(query.get("q") || "");
    setP(query.get("p") || 1);
  }, [pathname, search]);
  return (
    <Fragment>
      <section>
        <header>
          {q && <h2>Resultados de la busqueda: {q}</h2>}
          {!q && <h2>Nuestros Productos</h2>}
        </header>
        <ProductList />
        <footer>
          {/* Paginacion */}
          <form id={styles.paginate}>
            <button type="button" onClick={() => navigate(0)} disabled={false}>
              <Icon icon="mdi:arrow-left" />
            </button>
            <output>{p}</output>
            <button type="button" onClick={() => navigate(0)} disabled={false}>
              <Icon icon="mdi:arrow-right" />
            </button>
          </form>
        </footer>
      </section>
    </Fragment>
  );
};

export default Products;

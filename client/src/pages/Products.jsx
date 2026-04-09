import { Fragment, useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useLoaderData, useLocation, useNavigate } from "react-router";
import ProductList from "../components/ProductList";
import styles from "../styles/pages/Products.module.css";

const Products = () => {
  const { products, total, totalPages } = useLoaderData();
  const [q, setQ] = useState("");
  const [p, setP] = useState(1);
  const { search, pathname } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const query = new URLSearchParams(search);
    setQ(query.get("q") || "");
    setP(parseInt(query.get("p")) || 1);
  }, [pathname, search]);
  return (
    <Fragment>
      <section className={styles.ProductsContainer}>
        <header className={styles.TitleProduct}>
          {q && <h2>Resultados de la busqueda: {q}</h2>}
          {!q && <h2>Nuestros Productos</h2>}
        </header>
        {q && products.length == 0 && <p>No hay resultados de la busqueda</p>}
        {!q && products.length == 0 && <p>No hay productos</p>}
        {products.length != 0 && <ProductList products={products} />}
        <footer>
          {/* Paginacion */}
          <form id={styles.paginate}>
            <button
              className={styles.BtnPaginate}
              type="button"
              onClick={() =>
                navigate(
                  `/productos?${new URLSearchParams({ p: p == 1 ? 1 : p - 1, q: q })}`,
                )
              }
              disabled={p == 1}
            >
              <Icon icon="mdi:arrow-left" />
            </button>
            <output>{p}</output>
            <button
              className={styles.BtnPaginate}
              type="button"
              onClick={() =>
                navigate(
                  `/productos?${new URLSearchParams({ p: p == totalPages ? totalPages : p + 1, q: q })}`,
                )
              }
              disabled={p == totalPages}
            >
              <Icon icon="mdi:arrow-right" />
            </button>
          </form>
        </footer>
      </section>
    </Fragment>
  );
};

export default Products;

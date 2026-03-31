import { useState, useEffect, Fragment } from "react";
import CategoryCard from "./CategoryCard";
const CategoryList = () => {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const getCategorias = async () => {
      try {
        const response = await fetch("/api/categorias");
        const data = await response.json();
        setCategorias(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    getCategorias();
  }, []);
  return (
    <Fragment>
      {!categorias || (categorias.length < 1 && <p>No hay categorias</p>)}
      {categorias && categorias.length > 0 && (
        <ul>
          {categorias.map((categoria) => (
            <CategoryCard key={categoria.id} category={categoria} />
          ))}
        </ul>
      )}
    </Fragment>
  );
};

export default CategoryList;

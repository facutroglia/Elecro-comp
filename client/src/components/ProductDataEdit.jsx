import { useState, useEffect, Fragment, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Icon } from "@iconify/react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import formatPrice from "../utils/formatPrice";
import styles from "../styles/components/ProductDataEdit.module.css";
const ProductDataEdit = ({ name, category, brand, price, description, id }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const navigate = useNavigate();
  const schema = z.object({
    name: z.string().min(1, "El nombre es requerido"),
    description: z.string().min(1, "La descripcion es requerida"),
    price: z.number().min(0, "El precio debe ser mayor o igual a 0"),
    categoryId: z.string().min(1, "La categoria es requerida"),
    brandId: z.string().min(1, "La marca es requerida"),
  });
  const dataForm = useForm({
    defaultValues: {
      name,
      price,
      description,
      categoryId: category.id,
      brandId: brand.id,
    },
    resolver: zodResolver(schema),
  });
  const editData = async (data) => {
    const { name, description, price, categoryId, brandId } = data;
    try {
      const reqProduct = await fetch("/api/productos", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          name,
          description,
          price,
          categoryId,
          brandId,
        }),
      });
      const resProduct = await reqProduct.json();
      if (!reqProduct.ok) {
        throw new Error(resProduct.error || "Error al crear el producto");
      }
      dataForm.reset();
      navigate("/panel/productos");
    } catch (error) {
      console.error("Error al crear el producto:", error);
    }
  };
  useEffect(() => {
    const getCategories = async () => {
      const res = await fetch("/api/categorias");
      const data = await res.json();
      setCategories(data);
    };
    const getBrands = async () => {
      const res = await fetch("/api/marcas");
      const data = await res.json();
      setBrands(data);
    };
    getCategories();
    getBrands();
  }, []);
  return (
    <article className={styles.EditProductContainer}>
      <h3>Datos Principales</h3>
      {!isEdit && (
        <Fragment>
          <dl className={styles.ProductData}>
            <dd>{name}</dd>
            <dd>{category.name}</dd>
            <dd>{brand.name}</dd>
            <dd>{formatPrice(price)}</dd>
            <dd>{description}</dd>
          </dl>
          <form className={styles.BtnEdit} onSubmit={(e) => e.preventDefault()}>
            <button type="button" onClick={() => setIsEdit(true)}>
              <Icon icon="mdi:edit" />
            </button>
          </form>
        </Fragment>
      )}
      {isEdit && (
        <form
          className={styles.EditForm}
          onSubmit={dataForm.handleSubmit(editData)}
        >
          <fieldset className={styles.FieldsetEditData}>
            <label className={styles.labelEditData}>Nombre</label>
            <input
              className={styles.InputEditData}
              type="text"
              {...dataForm.register("name")}
            />
            {dataForm.formState.errors.name && (
              <p className={styles.error}>
                {dataForm.formState.errors.name.message}
              </p>
            )}
          </fieldset>
          <fieldset className={styles.FieldsetEditData}>
            <label className={styles.labelEditData}>Descripcion</label>
            <textarea
              className={styles.InputEditData}
              {...dataForm.register("description")}
            />
            {dataForm.formState.errors.description && (
              <p className={styles.error}>
                {dataForm.formState.errors.description.message}
              </p>
            )}
          </fieldset>
          <fieldset className={styles.FieldsetEditData}>
            <label className={styles.labelEditData}>precio</label>
            <input
              className={styles.InputEditData}
              type="number"
              {...dataForm.register("price", { valueAsNumber: true })}
            />
            {dataForm.formState.errors.price && (
              <p className={styles.error}>
                {dataForm.formState.errors.price.message}
              </p>
            )}
          </fieldset>
          <fieldset>
            <select
              className={styles.Select}
              {...dataForm.register("categoryId")}
            >
              <option value="" disabled>
                Selecciona una categoria
              </option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <select className={styles.Select} {...dataForm.register("brandId")}>
              <option value="" disabled>
                Selecciona una marca
              </option>
              {brands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
            {dataForm.formState.errors.categoryId && (
              <p className={styles.error}>
                {dataForm.formState.errors.categoryId.message}
              </p>
            )}
            {dataForm.formState.errors.brandId && (
              <p className={styles.error}>
                {dataForm.formState.errors.brandId.message}
              </p>
            )}
          </fieldset>
          <button
            className={styles.BtnSaveData}
            type="submit"
            disabled={dataForm.formState.isSubmitting}
          >
            {dataForm.formState.isSubmitting ? "Editando..." : "Editar"}
          </button>
          <button
            type="button"
            className={styles.BtnCancel}
            onClick={() => setIsEdit(false)}
          >
            Cancelar
          </button>
        </form>
      )}
    </article>
  );
};

export default ProductDataEdit;

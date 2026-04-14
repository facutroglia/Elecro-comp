import { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useForm, useFieldArray } from "react-hook-form";
import { Icon } from "@iconify/react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import styles from "../styles/components/ProductAdd.module.css";
const ProductAdd = () => {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const navigate = useNavigate();
  const schema = z.object({
    name: z.string().min(1, "El nombre es requerido"),
    description: z.string().min(1, "La descripcion es requerida"),
    price: z.number().min(0, "El precio debe ser mayor o igual a 0"),
    categoryId: z.string().min(1, "La categoria es requerida"),
    brandId: z.string().min(1, "La marca es requerida"),
    attributes: z.array(
      z.object({
        name: z.string().min(1, "El nombre del atributo es requerido"),
        value: z.string().min(1, "El valor del atributo es requerido"),
      }),
    ),
    images: z
      .array(
        z.object({
          file: z.instanceof(FileList, "Debe subir un archivo"),
        }),
      )
      .min(1, "Debe subir al menos una imagen"),
  });
  const addForm = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      categoryId: "",
      brandId: "",
      attributes: [],
      images: [],
    },
    resolver: zodResolver(schema),
  });
  const attrs = useFieldArray({
    control: addForm.control,
    name: "attributes",
  });
  const imgs = useFieldArray({
    control: addForm.control,
    name: "images",
  });
  useEffect(() => {
    const getCategories = async () => {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/categorias`);
      const data = await res.json();
      setCategories(data);
    };
    const getBrands = async () => {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/marcas`);
      const data = await res.json();
      setBrands(data);
    };
    getCategories();
    getBrands();
  }, []);
  const create = async (data) => {
    const { name, description, price, categoryId, brandId } = data;
    try {
      const reqProduct = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/productos`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            description,
            price,
            categoryId,
            brandId,
          }),
        },
      );
      const resProduct = await reqProduct.json();
      if (!reqProduct.ok) {
        throw new Error(resProduct.error || "Error al crear el producto");
      }
      const productId = resProduct.id;
      const atributos = await Promise.all(
        data.attributes.map(async (attr) => {
          const res = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/atributos`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: attr.name,
                value: attr.value,
                productId,
              }),
            },
          );
          const resData = await res.json();
          if (!res.ok) {
            throw new Error(resData.error || "Error al crear el atributo");
          }
          return resData;
        }),
      );
      const gallery = await Promise.all(
        data.images.map(async (img) => {
          const formData = new FormData();
          formData.append("file", img.file[0]);
          formData.append("type", "product");
          const res = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/archivos`,
            {
              method: "POST",
              body: formData,
            },
          );
          const resData = await res.json();
          if (!res.ok) {
            throw new Error(resData.error || "Error al subir la imagen");
          }
          const fileId = resData.id;
          const resLink = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/productos/agregar/imagen`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                productId,
                fileId,
              }),
            },
          );
          const resLinkData = await resLink.json();
          if (!resLink.ok) {
            throw new Error(
              resLinkData.error || "Error al vincular la imagen al producto",
            );
          }
          return resLinkData;
        }),
      );
      addForm.reset();
      navigate("/panel/productos");
    } catch (error) {
      console.error("Error al crear el producto:", error);
    }
  };
  return (
    <Fragment>
      <form
        className={styles.AddProductContainer}
        onSubmit={addForm.handleSubmit(create)}
      >
        <h2>Nuevo Producto</h2>
        <fieldset className={styles.FieldsetAddProduct}>
          <label className={styles.labelAddProduct}>Nombre</label>
          <input
            className={styles.InputAddProduct}
            type="text"
            {...addForm.register("name")}
          />
          {addForm.formState.errors.name && (
            <p className={styles.error}>
              {addForm.formState.errors.name.message}
            </p>
          )}
        </fieldset>
        <fieldset className={styles.FieldsetAddProduct}>
          <label className={styles.labelAddProduct}>Descripcion</label>
          <textarea
            className={styles.InputAddProduct}
            {...addForm.register("description")}
          />
          {addForm.formState.errors.description && (
            <p className={styles.error}>
              {addForm.formState.errors.description.message}
            </p>
          )}
        </fieldset>
        <fieldset className={styles.FieldsetAddProduct}>
          <label className={styles.labelAddProduct}>precio</label>
          <input
            className={styles.InputAddProduct}
            type="number"
            {...addForm.register("price", { valueAsNumber: true })}
          />
          {addForm.formState.errors.price && (
            <p className={styles.error}>
              {addForm.formState.errors.price.message}
            </p>
          )}
        </fieldset>
        <fieldset className={styles.FieldsetSelect}>
          <select className={styles.Select} {...addForm.register("categoryId")}>
            <option value="" disabled>
              Selecciona una categoria
            </option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          <select className={styles.Select} {...addForm.register("brandId")}>
            <option value="" disabled>
              Selecciona una marca
            </option>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.name}
              </option>
            ))}
          </select>
          {addForm.formState.errors.categoryId && (
            <p className={styles.error}>
              {addForm.formState.errors.categoryId.message}
            </p>
          )}
          {addForm.formState.errors.brandId && (
            <p className={styles.error}>
              {addForm.formState.errors.brandId.message}
            </p>
          )}
        </fieldset>
        <fieldset className={styles.AddAtribute}>
          <ul>
            {attrs.fields.map((item, index) => (
              <li className={styles.LiAtribute} key={item.id}>
                <input
                  className={styles.InputAtribute}
                  {...addForm.register(`attributes.${index}.name`)}
                />
                <input
                  className={styles.InputAtribute}
                  {...addForm.register(`attributes.${index}.value`)}
                />
                <button
                  className={styles.BtnDeleteProduct}
                  type="button"
                  onClick={() => attrs.remove(index)}
                >
                  <Icon icon="mdi:delete" />
                </button>
              </li>
            ))}
          </ul>
          <button
            className={styles.BtnAdd}
            type="button"
            onClick={() => attrs.append({ name: "", value: "" })}
          >
            Agregar atributo
          </button>
          {addForm.formState.errors.attributes && (
            <p className={styles.error}>
              {addForm.formState.errors.attributes.message}
            </p>
          )}
        </fieldset>
        <fieldset className={styles.AddImageProduct}>
          <ul>
            {imgs.fields.map((item, index) => (
              <li className={styles.LiAtribute} key={item.id}>
                <label htmlFor={`addForm-image-${index}`}>
                  {`Imagen ${index + 1}`}
                </label>
                <input
                  id={`addForm-image-${index}`}
                  type="file"
                  accept="images/*"
                  {...addForm.register(`images.${index}.file`)}
                />
                <button
                  className={styles.BtnDeleteProduct}
                  type="button"
                  onClick={() => imgs.remove(index)}
                >
                  <Icon icon="mdi:delete" />
                </button>
                {addForm.formState.errors.images && (
                  <p className={styles.error}>
                    {addForm.formState.errors.images[index].file.message}
                  </p>
                )}
              </li>
            ))}
          </ul>
          <button
            className={styles.BtnAdd}
            type="button"
            onClick={() => imgs.append({ file: "" })}
          >
            Agregar imagen
          </button>
        </fieldset>
        {addForm.formState.errors.root && (
          <p className={styles.error}>
            {addForm.formState.errors.root.message}
          </p>
        )}
        <button
          className={styles.BtnSaveProduct}
          type="submit"
          disabled={addForm.formState.isSubmitting}
        >
          Guardar nuevo producto
        </button>
      </form>
    </Fragment>
  );
};

export default ProductAdd;

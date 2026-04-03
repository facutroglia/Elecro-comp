import { Fragment } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import ProductImage from "./ProductImage";
import styles from "../styles/components/ProductGalleryEdit.module.css";
const ProductGalleryEdit = ({ galery, productId }) => {
  const addForm = useForm({
    defaultValues: {
      productId,
      file: null,
    },
  });
  const fileAdd = addForm.watch("file");
  const add = async (data) => {
    const formData = new FormData();
    formData.append("file", fileAdd[0]);
    formData.append("type", "product");
    const res = await fetch("/api/archivos", {
      method: "POST",
      body: formData,
    });
    const resData = await res.json();
    if (!res.ok) {
      throw new Error(resData.error || "Error al subir la imagen");
    }
    const fileId = resData.id;
    const resLink = await fetch("/api/productos/agregar/imagen", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId,
        fileId,
      }),
    });
    const resLinkData = await resLink.json();
    if (!resLink.ok) {
      throw new Error(
        resLinkData.error || "Error al vincular la imagen al producto",
      );
    }
    return resLinkData;
  };
  return (
    <article className={styles.GalleryEditContainer}>
      <h3>Galeria</h3>
      <form
        className={styles.FromGalleryEdit}
        onSubmit={addForm.handleSubmit(add)}
      >
        <label htmlFor="add-image-edit">
          {addForm.formState.isSubmitting
            ? "Cargando..."
            : fileAdd?.[0]
              ? "Cambiar"
              : "Agregar Imagen"}
        </label>
        <input
          id="add-image-edit"
          type="file"
          accept="images/*"
          {...addForm.register("file")}
          style={{ display: "none" }}
        />
        <button type="submit" disabled={addForm.formState.isSubmitting}>
          Subir
        </button>
      </form>
      <ul>
        {galery.map((file) => (
          <ProductImage key={file.id} {...file} />
        ))}
      </ul>
    </article>
  );
};

export default ProductGalleryEdit;

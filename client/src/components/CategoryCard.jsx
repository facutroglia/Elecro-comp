import { useState, useEffect, Fragment, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import styles from "../styles/components/CategoryCard.module.css";
import CategoryRemove from "./CategoryRemove";
const CategoryCard = ({ category }) => {
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();
  const editForm = useForm({
    defaultValues: {
      name: category.name,
    },
  });
  const fileInput = editForm.watch("icon");
  const EditCategory = async (data) => {
    console.log("Datos del formulario:", data, fileInput);
    if (!fileInput?.[0]) {
      try {
        const req = await fetch("/api/categorias/", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: category.id,
            name: data.name,
          }),
        });
        const updatedCategory = await req.json();
        console.log("Categoría actualizada:", updatedCategory);
        setEdit(false);
        navigate(0);
      } catch (error) {
        console.error("Error al actualizar la categoría:", error);
      }
    }
    if (!category.iconId && fileInput?.[0]) {
      try {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("icon", fileInput?.[0]);
        formData.append("type", "category");
        const reqFile = await fetch("/api/archivos/", {
          method: "POST",
          body: formData,
        });
        const fileData = await reqFile.json();
        const req = await fetch("/api/categorias/", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: category.id,
            name: data.name,
            iconId: fileData.id,
          }),
        });
        const updatedCategory = await req.json();
        console.log("Categoría actualizada:", updatedCategory);
        setEdit(false);
        navigate(0);
      } catch (error) {
        console.error("Error al actualizar la categoría:", error);
      }
    }
    if (category.iconId && fileInput?.[0]) {
      try {
        const formData = new FormData();
        formData.append("fileId", category.iconId);
        formData.append("icon", fileInput?.[0]);
        formData.append("type", "category");
        const reqFile = await fetch(`/api/archivos/`, {
          method: "PUT",
          body: formData,
        });
        const fileData = await reqFile.json();
        const req = await fetch("/api/categorias/", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: category.id,
            name: data.name,
            iconId: category.iconId,
          }),
        });
        const updatedCategory = await req.json();
        console.log("Categoría actualizada:", updatedCategory);
        setEdit(false);
      } catch (error) {
        console.error("Error al actualizar el icono:", error);
      }
    }
  };
  return (
    <li className={styles.LiCards}>
      {!edit && (
        <Fragment>
          {category?.iconId && (
            <picture className={styles.ImgCategory}>
              <img
                src={`/assets/${category?.icon?.url}`}
                alt={`${category.name} icon`}
              />
            </picture>
          )}
          <dl className={styles.InfoCategory}>
            <dt>{category.name}</dt>
            <dd>Productos: {category?.products?.length || 0}</dd>
          </dl>
          <button className={styles.BtnEditSave} onClick={() => setEdit(true)}>
            Editar
          </button>
          <CategoryRemove category={category} />
        </Fragment>
      )}
      {edit && (
        <form
          className={styles.EditForm}
          onSubmit={editForm.handleSubmit(EditCategory)}
        >
          <fieldset className={styles.FieldsetEdit}>
            <label className={styles.LabelEdit} htmlFor="name">
              Nombre
            </label>
            <input
              className={styles.InputText}
              id="name"
              {...editForm.register("name", { required: true })}
            />
            {editForm.formState.errors.name && (
              <p>{editForm.formState.errors.name.message}</p>
            )}
          </fieldset>
          <fieldset>
            <label className={styles.InputIcon} htmlFor="iconEdit">
              {!category?.iconId
                ? "Subir icono"
                : fileInput?.[0]
                  ? "Cambiar icono"
                  : "Reemplazar icono"}
            </label>
            <input
              type="file"
              accept="image/*"
              id="iconEdit"
              {...editForm.register("icon")}
              style={{ display: "none" }}
            />
            {editForm.formState.errors.icon && (
              <p>{editForm.formState.errors.icon.message}</p>
            )}
          </fieldset>
          <button
            className={styles.BtnEditSave}
            type="submit"
            disabled={editForm.formState.isSubmitting}
          >
            Guardar
          </button>
          <button
            className={styles.BtnRemove}
            type="button"
            onClick={() => setEdit(false)}
          >
            Cancelar
          </button>
        </form>
      )}
    </li>
  );
};

export default CategoryCard;

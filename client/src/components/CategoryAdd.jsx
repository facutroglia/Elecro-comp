import { Fragment } from "react";
import { useForm } from "react-hook-form";
import styles from "../styles/components/CategoryAdd.module.css";
const CategoryAdd = () => {
  const addForm = useForm({
    defaultValues: {
      name: "",
      icon: null,
    },
  });
  const fileInput = addForm.watch("icon");
  const createCategory = async (data) => {
    if (!fileInput?.[0]) {
      try {
        const req = await fetch("/api/categorias/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: data.name,
          }),
        });
        const createdCategory = await req.json();
        console.log("Categoría nueva:", createdCategory);
        setEdit(false);
      } catch (error) {
        console.error("Error al actualizar la categoría:", error);
      }
    }
    if (fileInput?.[0]) {
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
        console.log("Archivo subido:", fileData);
        const req = await fetch("/api/categorias/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: data.name,
            iconId: fileData.id,
          }),
        });
        const createdCategory = await req.json();
        console.log("Categoría nueva:", createdCategory);
        setEdit(false);
      } catch (error) {
        console.error("Error al actualizar la categoría:", error);
      }
    }
  };
  return (
    <form
      className={styles.FormContainer}
      onSubmit={addForm.handleSubmit(createCategory)}
    >
      <h3>Añadir Categoria</h3>
      <fieldset className={styles.AddContent}>
        <label className={styles.LabelName} htmlFor="name">
          Nombre de la categoria
        </label>
        <input
          className={styles.AddInput}
          id="name"
          {...addForm.register("name", { required: true })}
        />
        {addForm.formState.errors.name && (
          <p>{addForm.formState.errors.name.message}</p>
        )}
      </fieldset>
      <fieldset>
        <label id={styles.AddLabel} htmlFor="iconAdd">
          {fileInput?.[0] ? "Cambiar icono" : "Subir icono"}
        </label>
        <input
          type="file"
          accept="image/*"
          id="iconAdd"
          {...addForm.register("icon")}
          style={{ display: "none" }}
        />
        {addForm.formState.errors.icon && (
          <p>{addForm.formState.errors.icon.message}</p>
        )}
      </fieldset>
      <button
        className={styles.BtnAdd}
        type="submit"
        disabled={addForm.formState.isSubmitting}
      >
        Guardar
      </button>
      <button
        className={styles.BtnCancel}
        type="button"
        onClick={() => addForm.reset()}
        disabled={addForm.formState.isSubmitting}
      >
        Cancelar
      </button>
    </form>
  );
};

export default CategoryAdd;

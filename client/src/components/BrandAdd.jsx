import { Fragment } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import styles from "../styles/components/BrandAdd.module.css";
const BrandAdd = () => {
  const navigate = useNavigate();
  const addForm = useForm({
    defaultValues: {
      name: "",
      logo: null,
    },
  });
  const fileInput = addForm.watch("logo");
  const createBrand = async (data) => {
    if (!fileInput?.[0]) {
      try {
        const req = await fetch(`${import.meta.env.VITE_BACKEND_URL}/marcas/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: data.name,
          }),
        });
        const createdCategory = await req.json();
        console.log("Marca nueva:", createdCategory);
        navigate(0);
      } catch (error) {
        console.error("Error al actualizar la marca:", error);
      }
    }
    if (fileInput?.[0]) {
      try {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("icon", fileInput?.[0]);
        formData.append("type", "brand");
        const reqFile = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/archivos/`,
          {
            method: "POST",
            body: formData,
          },
        );
        const fileData = await reqFile.json();
        console.log("Archivo subido:", fileData);
        const req = await fetch(`${import.meta.env.VITE_BACKEND_URL}/marcas/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: data.name,
            logoId: fileData.id,
          }),
        });
        const createdBrand = await req.json();
        console.log("Marca nueva:", createdBrand);
        navigate(0);
      } catch (error) {
        console.error("Error al actualizar la categoría:", error);
      }
    }
  };
  return (
    <form
      className={styles.FormContainer}
      onSubmit={addForm.handleSubmit(createBrand)}
    >
      <h3>Añadir Marca</h3>
      <fieldset className={styles.AddContent}>
        <label className={styles.LabelName} htmlFor="name">
          Nombre de la Marca
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
        <label id={styles.AddLabel} htmlFor="logoAdd">
          {fileInput?.[0] ? "Cambiar Logo" : "Subir Logo"}
        </label>
        <input
          type="file"
          accept="image/*"
          id="logoAdd"
          {...addForm.register("logo")}
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

export default BrandAdd;

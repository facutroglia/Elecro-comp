import { useState, useEffect, Fragment, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import styles from "../styles/components/BrandEdit.module.css";

const BrandEdit = ({ brand, update }) => {
  const navigate = useNavigate();
  const editForm = useForm({
    defaultValues: {
      name: brand.name,
    },
  });
  const fileInput = editForm.watch("logo");
  const EditBrand = async (data) => {
    console.log("Datos del formulario:", data, fileInput);
    if (!fileInput?.[0]) {
      try {
        const req = await fetch(`${import.meta.env.VITE_BACKEND_URL}/marcas/`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: brand.id,
            name: data.name,
          }),
        });
        const updatedBrand = await req.json();
        console.log("Marca actualizada:", updatedBrand);
        navigate(0);
      } catch (error) {
        console.error("Error al actualizar la categoría:", error);
      }
    }
    if (!brand.logoId && fileInput?.[0]) {
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
        const req = await fetch(`${import.meta.env.VITE_BACKEND_URL}/marcas/`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: brand.id,
            name: data.name,
            logoId: fileData.id,
          }),
        });
        const updatedBrand = await req.json();
        console.log("Marca actualizada:", updatedBrand);
        navigate(0);
      } catch (error) {
        console.error("Error al actualizar la marca:", error);
      }
    }
    if (brand.logoId && fileInput?.[0]) {
      try {
        const formData = new FormData();
        formData.append("fileId", brand.logoId);
        formData.append("icon", fileInput?.[0]);
        formData.append("type", "brand");
        const reqFile = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/archivos/`,
          {
            method: "PUT",
            body: formData,
          },
        );
        const fileData = await reqFile.json();
        const req = await fetch(`${import.meta.env.VITE_BACKEND_URL}/marcas/`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: brand.id,
            name: data.name,
            logoId: brand.logoId,
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
    <form
      className={styles.EditForm}
      onSubmit={editForm.handleSubmit(EditBrand)}
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
        <label className={styles.InputIcon} htmlFor="logoEdit">
          {!brand?.logoId
            ? "Subir icono"
            : fileInput?.[0]
              ? "Cambiar icono"
              : "Reemplazar icono"}
        </label>
        <input
          type="file"
          accept="image/*"
          id="logoEdit"
          {...editForm.register("logo")}
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
        onClick={() => update(false)}
      >
        Cancelar
      </button>
    </form>
  );
};

export default BrandEdit;

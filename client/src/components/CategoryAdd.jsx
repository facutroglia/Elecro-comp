import { Fragment } from "react";
import { useForm } from "react-hook-form";
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
    <form onSubmit={addForm.handleSubmit(createCategory)}>
      <fieldset>
        <label htmlFor="name">Nombre</label>
        <input id="name" {...addForm.register("name", { required: true })} />
        {addForm.formState.errors.name && (
          <p>{addForm.formState.errors.name.message}</p>
        )}
      </fieldset>
      <fieldset>
        <label htmlFor="iconAdd">
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
      <button type="submit" disabled={addForm.formState.isSubmitting}>
        Guardar
      </button>
      <button
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

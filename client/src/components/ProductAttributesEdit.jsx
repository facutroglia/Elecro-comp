import { Fragment } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import ProductAttribute from "./ProductAttribute";
const ProductAttributesEdit = ({ attributes, productId }) => {
  const addForm = useForm();
  const navigate = useNavigate();
  const add = async (data) => {
    try {
      const res = await fetch("/api/atributos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: attr.name,
          value: attr.value,
          productId,
        }),
      });
      const resData = await res.json();
      if (!res.ok) {
        throw new Error(resData.error || "Error al crear el atributo");
      }
      return navigate(0);
    } catch (error) {
      console.error(error.message || "No se pudo agregar el atributo");
    }
  };
  return (
    <article>
      <h3>Atributos</h3>
      <form onSubmit={addForm.handleSubmit(add)}>
        <fieldset>
          <label htmlFor="add-atts-edit-prop">Propiedad</label>
          <input
            type="text"
            id="add-atts-edit-prop"
            {...addForm.register("name")}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="add-atts-edit-value">Valor</label>
          <input
            type="text"
            id="add-atts-edit-value"
            {...addForm.register("value")}
          />
        </fieldset>
        <button type="submit" disabled={addForm.formState.isSubmitting}>
          Agregar
        </button>
      </form>
      {(!Array.isArray(attributes) || attributes?.length == 0) && (
        <p>No hay atributos</p>
      )}
      {Array.isArray(attributes) &&
        attributes.length > 0 &&
        attributes.map((attr) => <ProductAttribute key={attr.id} {...attr} />)}
    </article>
  );
};

export default ProductAttributesEdit;

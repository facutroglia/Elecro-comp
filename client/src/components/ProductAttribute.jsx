import { Fragment, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Icon } from "@iconify/react";
const ProductAttribute = ({ id, name, value, productId }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [alert, setAlert] = useState(false);
  const navigate = useNavigate();
  const editForm = useForm({
    defaultValues: {
      id,
      name,
      value,
    },
  });
  const removeForm = useForm({
    defaultValues: {
      id,
    },
  });
  const edit = async (data) => {
    try {
      const res = await fetch("/api/atributos", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          name: data.name,
          value: data.value,
          productId,
        }),
      });
      const resData = await res.json();
      if (!res.ok) {
        throw new Error(resData.error || "Error al editar el atributo");
      }
      navigate(0);
    } catch (error) {
      console.error(error.message || "Error actualizando el atributo");
    }
  };
  const remove = async (data) => {
    try {
      const res = await fetch("/api/atributos", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
        }),
      });
      const resData = await res.json();
      if (!res.ok) {
        throw new Error(resData.error || "Error al editar el atributo");
      }
      navigate(0);
    } catch (error) {
      console.error(error.message || "Error actualizando el atributo");
    }
  };
  useEffect(() => {
    if (confirm) {
      removeForm.handleSubmit(remove)();
    }
  }, [confirm]);
  return (
    <li>
      {!isEdit ||
        (!alert && (
          <dl>
            <dt>{name}:</dt> <dd>{value}</dd>
            <button
              type="button"
              onClick={() => {
                setIsEdit(true);
                setAlert(false);
              }}
            >
              <Icon icon="mdi:edit" />
            </button>
            <button
              type="button"
              onClick={() => {
                setIsEdit(false);
                setAlert(true);
              }}
            >
              <Icon icon="mdi:delete" />
            </button>
          </dl>
        ))}
      {isEdit && !alert && (
        <form onSubmit={editForm.handleSubmit(edit)}>
          <fieldset>
            <label htmlFor={`edit-attr-prop-${id}`}>Propiedad/Atributo</label>
            <input
              type="text"
              id={`edit-attr-prop-${id}`}
              {...editForm.register("name")}
            />
          </fieldset>
          <fieldset>
            <label htmlFor={`edit-attr-value-${id}`}>Valor</label>
            <input
              type="text"
              id={`edit-attr-value-${id}`}
              {...editForm.register("value")}
            />
          </fieldset>
          <button type="submit" disabled={editForm.formState.isSubmitting}>
            {editForm.formState.isSubmitting ? (
              <Icon icon="line-md:loading-loop" />
            ) : (
              <Icon icon="mdi:reload" />
            )}
          </button>
          <button
            type="button"
            onClick={() => {
              editForm.reset();
              setIsEdit(false);
            }}
          >
            <Icon icon="mdi:cancel" />
          </button>
        </form>
      )}
      {alert && (
        <div id={styles.overlay} onClick={() => setAlert(false)}>
          <div id={styles.confirm}>
            <p className={styles.textConfirm}>
              Estas seguro de eliminar este atributo?
            </p>
            <div className={styles.Btns}>
              <button
                className={styles.BtnConfirm}
                type="button"
                onClick={() => setConfirm(true)}
                disabled={removeForm.formState.isSubmitting}
              >
                {removeForm.formState.isSubmitting ? "Eliminando..." : "Si"}
              </button>
              <button
                className={styles.BtnConfirm}
                type="button"
                onClick={() => setAlert(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </li>
  );
};

export default ProductAttribute;

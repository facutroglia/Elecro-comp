import { Fragment, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Icon } from "@iconify/react";
import styles from "../styles/components/ProductImage.module.css";

const ProductImage = ({ id, url }) => {
  const [confirm, setConfirm] = useState(false);
  const [alert, setAlert] = useState(false);
  const navigate = useNavigate();
  const editForm = useForm({
    defaultValues: {
      fileId: id,
      file: null,
    },
  });
  const removeForm = useForm({
    defaultValues: {
      id,
    },
  });
  const inputEdit = editForm.watch("file");
  const edit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("fileId", id);
      formData.append("file", inputEdit?.[0]);
      formData.append("type", "product");
      const reqFile = await fetch(`/api/archivos/`, {
        method: "PUT",
        body: formData,
      });
      const fileData = await reqFile.json();
      if (!reqFile.ok) {
        throw new Error(fileData.error || "Error en la carga de la imagen");
      }
      editForm.reset();
      navigate(0);
    } catch (error) {
      console.error(error.message || "Error actualizando imagen");
    }
  };
  const remove = async (data) => {
    try {
      const reqFile = await fetch(`/api/archivos/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const fileData = await reqFile.json();
      if (!reqFile.ok) {
        throw new Error(fileData.error || "Error en la carga de la imagen");
      }
      removeForm.reset();
      navigate(0);
    } catch (error) {
      console.error(error.message || "Error actualizando imagen");
    }
  };

  useEffect(() => {
    if (inputEdit?.[0]) {
      editForm.handleSubmit(edit)();
    }
  }, [inputEdit]);
  useEffect(() => {
    if (confirm) {
      removeForm.handleSubmit(remove)();
    }
  }, [confirm]);
  return (
    <Fragment>
      <li className={styles.ImageItem}>
        <picture className={styles.Picture}>
          <img src={`/assets/${url}`} alt="" />
        </picture>
        <form
          className={styles.FormImageEdit}
          onSubmit={(e) => e.preventDefault()}
        >
          <label htmlFor={`edit-file-${id}`}>
            {editForm.formState.isSubmitting
              ? "Cargando..."
              : inputEdit?.[0]
                ? "Cambiar"
                : "Editar"}
          </label>
          <input
            type="file"
            accept="images/*"
            {...editForm.register("file")}
            id={`edit-file-${id}`}
            style={{ display: "none" }}
          />
          <button type="button" onClick={() => setAlert(true)}>
            Eliminar
          </button>
        </form>
      </li>
      {alert && (
        <div id={styles.overlay} onClick={() => setAlert(false)}>
          <div id={styles.confirm}>
            <p className={styles.textConfirm}>
              Estas seguro de eleminar esta imagen?
            </p>
            <div className={styles.Btns}>
              <button
                className={styles.BtnConfirm}
                type="button"
                onClick={() => setConfirm(true)}
              >
                Si
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
    </Fragment>
  );
};

export default ProductImage;

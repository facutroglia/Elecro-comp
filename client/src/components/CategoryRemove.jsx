import { useState, useEffect, Fragment } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import styles from "../styles/components/CategoryRemove.module.css";
const CategoryRemove = ({ category }) => {
  const navigate = useNavigate();
  const removeForm = useForm();
  const [confirm, setConfirm] = useState(false);
  const [show, setShow] = useState(false);
  const remove = async (data) => {
    try {
      if (category.iconId) {
        const reqFile = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/archivos`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: category.iconId }),
          },
        );
        const resFile = await reqFile.json();
        if (!reqFile.ok) {
          throw new Error(resFile.error || "Failed to fetch files");
        }
      }
      const req = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/categorias/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: category.id }),
        },
      );
      const res = await req.json();
      if (!req.ok) {
        throw new Error(res.error || "Failed to remove category");
      }
      navigate(0);
    } catch (error) {
      console.error("Error removing category:", error.message);
    }
  };
  useEffect(() => {
    if (confirm) {
      removeForm.handleSubmit(remove)();
    }
  }, [confirm]);
  return (
    <form className={styles.FormDelete} onSubmit={(e) => e.preventDefault()}>
      <button
        className={styles.BtnDelete}
        type="button"
        onClick={() => setShow(true)}
      >
        Eliminar
      </button>
      {show && (
        <div id={styles.overlay} onClick={() => setShow(false)}>
          <div id={styles.confirm}>
            <p className={styles.textConfirm}>
              Estas seguro de eleminar esta categoria?
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
                onClick={() => setShow(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
};

export default CategoryRemove;

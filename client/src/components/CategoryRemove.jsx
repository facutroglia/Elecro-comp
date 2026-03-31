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
    debugger;
    try {
      if (category.iconId) {
        const reqFile = await fetch("/api/archivos", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: category.iconId }),
        });
        const resFile = await reqFile.json();
        if (!reqFile.ok) {
          throw new Error(resFile.error || "Failed to fetch files");
        }
      }
      const req = await fetch("/api/categorias/", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: category.id }),
      });
      const res = await req.json();
      if (!req.ok) {
        throw new Error(res.error || "Failed to remove category");
      }
      navigate("/panel/categorias");
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
    <form onSubmit={(e) => e.preventDefault()}>
      <button type="button" onClick={() => setShow(true)}>
        Remove
      </button>
      {show && (
        <div id={styles.overlay} onClick={() => setShow(false)}>
          <div id={styles.confirm}>
            <p>Estas seguro de eleminar esta categoria?</p>
            <button type="button" onClick={() => setConfirm(true)}>
              Si
            </button>
            <button type="button" onClick={() => setShow(false)}>
              No
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

export default CategoryRemove;

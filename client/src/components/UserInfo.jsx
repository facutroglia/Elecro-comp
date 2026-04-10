import { Fragment, useState, useEffect } from "react";
import styles from "../styles/pages/Profile.module.css";
import { useForm } from "react-hook-form";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router";
const UserInfo = ({ user }) => {
  const [isEdit, setIsEdit] = useState(false);
  const editForm = useForm({
    defaultValues: {
      name: user.name ?? "",
      email: user.email ?? "",
      phone: user.phone ?? "",
      address: user.address ?? "",
      codeZip: user.codeZip ?? "",
    },
  });
  const navigate = useNavigate();
  const update = async (data) => {
    try {
      const reqAvatar = await fetch("/api/usuarios/actualizar", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: user.id, ...data }),
      });
      const avatarData = await reqAvatar.json();
      if (!reqAvatar.ok) {
        throw new Error(avatarData.error || "Error en la carga del avatar");
      }
      navigate(0);
    } catch (error) {}
  };
  const toggle = () => {
    setIsEdit(!isEdit);
  };
  const setData = () => {
    editForm.setValue("name", user.name ?? "");
    editForm.setValue("email", user.email ?? "");
    editForm.setValue("phone", user.phone ?? "");
    editForm.setValue("address", user.address ?? "");
    editForm.setValue("codeZip", user.codeZip ?? "");
  };

  useEffect(() => {
    setData();
  }, [isEdit]);

  return (
    <Fragment>
      {!isEdit && (
        <article>
          <h2>Información Personal</h2>
          <dl>
            <dt>Nombre Completo:</dt>
            <dd>{user.name}</dd>
            <dt>Email:</dt>
            <dd>{user.email}</dd>
            <dt>Tel/Cel:</dt>
            <dd>{user.phone ?? "Sin completar"}</dd>
            <dt>Dirección/Ubicación:</dt>
            <dd>{user.address ?? "Sin completar"}</dd>
            <dt>Codigo Postal</dt>
            <dd>{user.codeZip ?? "Sin completar"}</dd>
          </dl>
          <button type="button" onClick={() => setIsEdit(true)}>
            Editar
          </button>
        </article>
      )}

      {isEdit && (
        <form
          onSubmit={editForm.handleSubmit(update)}
          className={styles.FormData}
        >
          <fieldset className={styles.FieldsetContainer}>
            <label htmlFor="">Nombre Completo:</label>
            <input
              type="text"
              placeholder="Facundo"
              {...editForm.register("name")}
            />
          </fieldset>
          <fieldset className={styles.FieldsetContainer}>
            <label htmlFor="">Email:</label>
            <input
              type="email"
              placeholder="Facundo@gmail.com"
              {...editForm.register("email")}
            />
          </fieldset>
          <fieldset className={styles.FieldsetContainer}>
            <label htmlFor="">Tel/Cel:</label>
            <input
              type="tel"
              placeholder="3512939485"
              {...editForm.register("phone")}
            />
          </fieldset>
          <fieldset className={styles.FieldsetContainer}>
            <label htmlFor="">Direccion:</label>
            <input
              type="text"
              placeholder="Cordoba,Cordoba - Argentina"
              {...editForm.register("address")}
            />
          </fieldset>
          <fieldset className={styles.FieldsetContainer}>
            <label htmlFor="">Codigo Postal:</label>
            <input
              type="text"
              placeholder="X1128"
              {...editForm.register("codeZip")}
            />
          </fieldset>
          <fieldset>
            <button type="button" onClick={() => setIsEdit(false)}>
              Cancelar
            </button>
            <button
              className={styles.BtnProfile}
              type="submit"
              disabled={editForm.formState.isSubmitting}
            >
              {editForm.formState.isSubmitting
                ? "Actualizando..."
                : "Guardar cambios"}
            </button>
          </fieldset>
        </form>
      )}
    </Fragment>
  );
};

export default UserInfo;

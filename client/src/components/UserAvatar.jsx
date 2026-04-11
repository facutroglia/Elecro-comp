import { Fragment } from "react";
import styles from "../styles/components/UserAvatar.module.css";
import { useForm } from "react-hook-form";
import { Icon } from "@iconify/react";
import { useUser } from "../context/useUser";
const UserAvatar = ({ user, avatar }) => {
  const { setUser } = useUser();
  const initial = "";
  const addForm = useForm({ defaultValues: { userId: user.id, file: null } });
  const inputAdd = addForm.watch("file");
  const editForm = useForm({
    defaultValues: { fileId: avatar.id, file: null },
  });
  const inputEdit = editForm.watch("file");
  const addAvatar = async (data) => {
    try {
      const formData = new FormData();
      formData.append("file", inputAdd?.[0]);
      formData.append("type", "avatar");
      const reqFile = await fetch(`/api/archivos/`, {
        method: "POST",
        body: formData,
      });
      const fileData = await reqFile.json();
      if (!reqFile.ok) {
        throw new Error(fileData.error || "Error en la carga de la imagen");
      }
      const reqAvatar = await fetch("/api/usuarios/actualizar", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: data.user.id, avatarId: fileData.id }),
      });
      const avatarData = await reqAvatar.json();
      if (!reqAvatar.ok) {
        throw new Error(avatarData.error || "Error en la carga del avatar");
      }
      setUser(avatarData);
    } catch (error) {
      addForm.setError("root", error.message);
    }
  };
  const editAvatar = async (data) => {
    try {
      const formData = new FormData();
      formData.append("fileId", fileId);
      formData.append("file", inputEdit?.[0]);
      formData.append("type", "avatar");
      const reqFile = await fetch(`/api/archivos/`, {
        method: "PUT",
        body: formData,
      });
      const fileData = await reqFile.json();
      if (!reqFile.ok) {
        throw new Error(fileData.error || "Error en la carga de la imagen");
      }
    } catch (error) {
      addForm.setError("root", error.message);
    }
  };
  return (
    <Fragment>
      {!avatar && (
        <div className={styles.AvatarContainer}>
          <picture className={styles.ImgProfile}>
            <img
              src={`https://placehold.co/72/36013F/violet/png?${new URLSearchParams({ text: initial }).toString()}`}
              alt={`avatar del usuario ${user.id}`}
            />
          </picture>
          <form
            className={styles.AvatarForm}
            onSubmit={addForm.handleSubmit(addAvatar)}
            method="post"
          >
            <label
              className={styles.AvatarLabel}
              htmlFor={`add-avatar-${user.id}`}
            >
              {inputAdd?.[0] ? "Cambiar Imagen" : "Cargar Avatar"}
            </label>
            <input
              type="file"
              accept="images/*"
              {...addForm.register("file")}
              id={`add-avatar-${user.id}`}
              style={{ display: "none" }}
            />
            <button type="submit" className={styles.BtnSubmitAvatar}>
              {addForm.formState.isSubmitting ? (
                <Icon icon="line-md:loading-loop" />
              ) : (
                <Icon icon="mdi:account" />
              )}
            </button>
          </form>
        </div>
      )}
      {avatar && (
        <div className={styles.AvatarContainer}>
          <picture className={styles.ImgProfile}>
            <img
              src={`/assets/${avatar?.url}`}
              alt={`avatar del usuario ${user.id}`}
            />
          </picture>
          <form
            className={styles.AvatarForm}
            onSubmit={editForm.handleSubmit(editAvatar)}
            method="post"
          >
            <label
              className={styles.AvatarLabel}
              htmlFor={`edit-avatar-${user.id}`}
            >
              {inputEdit?.[0] ? "Cambiar Imagen" : "Actualizar Avatar"}
            </label>
            <input
              type="file"
              accept="images/*"
              {...editForm.register("file")}
              id={`edit-avatar-${user.id}`}
              style={{ display: "none" }}
            />
            <button type="submit" className={styles.BtnSubmitAvatar}>
              {editForm.formState.isSubmitting ? (
                <Icon icon="line-md:loading-loop" />
              ) : (
                <Icon icon="mdi:account-box-edit-outline" />
              )}
            </button>
          </form>
        </div>
      )}
    </Fragment>
  );
};

export default UserAvatar;

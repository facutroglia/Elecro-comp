import { Fragment } from "react";
import styles from "../styles/pages/Profile.module.css";
import SideBar from "../components/SideBar.jsx";
const Profile = () => {
  return (
    <Fragment>
      <section id={styles.ProfileContainer}>
        <SideBar />
        <main className={styles.Content}>
          <header className={styles.TitleProfile}>
            <h2>Mi cuenta</h2>
          </header>
          <picture className={styles.ImgProfile}>
            <img
              src="https://placehold.co/72/36013F/violet/png?text=Ft"
              alt=""
            />
          </picture>
          <form action="" className={styles.FormData}>
            <fieldset className={styles.FieldsetContainer}>
              <label htmlFor="">Nombre</label>
              <input type="text" placeholder="Facundo" />
            </fieldset>
            <fieldset className={styles.FieldsetContainer}>
              <label htmlFor="">Apellido</label>
              <input type="text" placeholder="Troglia" />
            </fieldset>
            <fieldset className={styles.FieldsetContainer}>
              <label htmlFor="">Email</label>
              <input type="email" placeholder="Facundo@gmail.com" />
            </fieldset>
            <fieldset className={styles.FieldsetContainer}>
              <label htmlFor="">Telefono</label>
              <input type="tel" placeholder="3512939485" />
            </fieldset>
            <fieldset className={styles.FieldsetContainer}>
              <label htmlFor="">Direccion</label>
              <input type="text" placeholder="Cordoba,Cordoba - Argentina" />
            </fieldset>
            <form action="">
              <button className={styles.BtnProfile} type="button">
                Editar datos
              </button>
              <button className={styles.BtnProfile} type="button">
                Guardar cambios
              </button>
            </form>
          </form>
        </main>
      </section>
    </Fragment>
  );
};

export default Profile;

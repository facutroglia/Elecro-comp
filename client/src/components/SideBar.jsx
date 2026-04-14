import { Fragment, useState, useEffect } from "react";
import { NavLink } from "react-router";
import { Icon } from "@iconify/react";
import styles from "../styles/components/SideBar.module.css";
import { useUser } from "../context/useUser";
const SideBar = () => {
  const { user } = useUser();
  const [data, setData] = useState(null);
  useEffect(() => {
    const getUser = async (userId) => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/usuarios/perfil`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: userId }),
          },
        );

        const data = await response.json();
        if (!response.ok) throw new Error("Error al traer al usuario");
        setData({
          email: data.email,
          name: data.name,
        });
        return;
      } catch (error) {
        console.error(error.message);
      }
    };
    if (user) {
      getUser(user.id);
    }
  }, [user]);
  return (
    <Fragment>
      <aside className={styles.Sidebar}>
        <section className={styles.NameUser}>
          <h3>{data?.name}</h3>
          <p>{data?.email}</p>
        </section>

        <nav className={styles.NavProfile}>
          <NavLink to="/usuario">
            <Icon icon="mdi:user"></Icon> Mi cuenta
          </NavLink>
          <NavLink to="/usuario/compras">
            <Icon icon="weui:shop-filled"></Icon> Mis pedidos
          </NavLink>
          <NavLink to="/usuario/favoritos">
            <Icon icon="mdi:heart"></Icon> Favoritos
          </NavLink>
        </nav>
      </aside>
    </Fragment>
  );
};

export default SideBar;

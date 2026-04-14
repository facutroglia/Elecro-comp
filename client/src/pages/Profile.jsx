import { Fragment, useEffect, useState } from "react";
import styles from "../styles/pages/Profile.module.css";
import SideBar from "../components/SideBar.jsx";
import UserAvatar from "../components/UserAvatar.jsx";
import UserInfo from "../components/UserInfo.jsx";
import { useUser } from "../context/useUser.jsx";
const Profile = () => {
  const { user } = useUser();
  const [avatar, setAvatar] = useState(null);
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
        setAvatar({ ...data.avatar });
        setData({
          id: data.id,
          email: data.email,
          name: data.name,
          phone: data.phone,
          address: data.address,
          codeZip: data.codeZip,
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
      <section id={styles.ProfileContainer}>
        <SideBar />
        <section className={styles.Content}>
          <h2>Mi cuenta</h2>
          <section className={styles.UserData}>
            <UserAvatar avatar={{ ...avatar }} user={{ ...data }} />
            <UserInfo user={{ ...data }} />
          </section>
        </section>
      </section>
    </Fragment>
  );
};

export default Profile;

import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

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
    return data;
  } catch (error) {
    console.error(error.message);
  }
};

export const UserProvider = ({ children }) => {
  const [user, setUserState] = useState(null);

  const persistUser = (userData) => {
    if (userData) {
      localStorage.setItem("user", JSON.stringify(userData));
    } else {
      localStorage.removeItem("user");
    }
  };

  const setUser = (userData) => {
    setUserState(userData);
    persistUser(userData);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return;

    const { id } = JSON.parse(storedUser);
    getUser(id).then((data) => {
      if (data) {
        setUserState(data);
        persistUser(data);
      } else {
        localStorage.removeItem("user");
      }
    });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

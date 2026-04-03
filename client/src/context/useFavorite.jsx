import { createContext, useState, useContext, useEffect } from "react";
import { useUser } from "./useUser";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const { user } = useUser();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

  // Cargar favoritos al cambiar el usuario
  useEffect(() => {
    const loadFavorites = async () => {
      if (!user) {
        setFavorites([]);
        localStorage.removeItem("mis_favoritos");
        return;
      }

      try {
        setLoading(true);
        const response = await fetch("/api/usuarios/perfil", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: user.id }),
        });

        if (response.ok) {
          const data = await response.json();
          const userFavorites = data.favorites || [];
          setFavorites(userFavorites);
          localStorage.setItem("mis_favoritos", JSON.stringify(userFavorites));
        } else {
          throw new Error("Error al obtener favoritos");
        }
      } catch (error) {
        console.error("Error al cargar favoritos:", error);
        // Intenta recuperar desde localStorage como respaldo
        const storedFavorites = localStorage.getItem("mis_favoritos");
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, [user?.id]);

  const toggleFavorite = async (productId, userId) => {
    if (!userId || !productId) {
      console.error("userId y productId son requeridos");
      return;
    }

    const isFavorited = favorites.some((fav) => fav.id === productId);
    const endpoint = isFavorited
      ? "/api/usuarios/quitar/favorito"
      : "/api/usuarios/agregar/favorito";

    try {
      const response = await fetch(endpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, userId }),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        const newFavorites = updatedUser.favorites || [];
        setFavorites(newFavorites);
        localStorage.setItem("mis_favoritos", JSON.stringify(newFavorites));
      } else {
        console.error("Error al actualizar favorito:", response.statusText);
      }
    } catch (error) {
      console.error("Error en toggleFavorite:", error);
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, loading }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites debe ser usado dentro de FavoritesProvider");
  }
  return context;
};

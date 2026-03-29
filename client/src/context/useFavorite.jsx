import {
  createContext,
  useState,
  useContext,
  useEffect,
  Children,
} from "react";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("mis_favoritos");
    return saved ? JSON.parse(saved) : [];
  });
  useEffect(() => {
    localStorage.setItem("mis_favoritos", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (product) => {
    const isFav = favorites.some((fav) => fav.id === product.id);

    if (isFav) {
      setFavorites(favorites.filter((fav) => fav.id !== product.id));
    } else {
      setFavorites([...favorites, product]);
    }
  };
  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
export const useFavorites = () => useContext(FavoritesContext);

import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    const storedCart = localStorage.getItem("items");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(cartItems));
  }, [cartItems]);
  const add = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item,
        );
      }
      return [...prevItems, { ...product, cantidad: 1 }];
    });
  };
  const reduce = (product) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === product.id
            ? { ...item, cantidad: Math.max(item.cantidad - 1, 1) }
            : item,
        )
        .filter((item) => item.cantidad > 0),
    );
  };
  const remove = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };
  const clear = () => {
    setCartItems([]);
  };
  return (
    <CartContext.Provider value={{ cartItems, add, reduce, remove, clear }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

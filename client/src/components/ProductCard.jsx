import { Icon } from "@iconify/react";
import React from "react";
import { useNavigate } from "react-router";
import { useCart } from "../context/useCart.jsx";

const ProductCard = ({ name, id, precio, image }) => {
  const navigate = useNavigate();
  const { add } = useCart();

  return (
    <li>
      <picture>
        <img src={image} alt="" />
      </picture>
      <dl>
        <dt>Nombre</dt>
        <dd>{name}</dd>
        <dt>Precio</dt>
        <dd>{precio}</dd>
      </dl>
      <form action="">
        <button onClick={() => add({ name, price, id, image })} type="button">
          <Icon icon="mdi:cart"></Icon>
        </button>
        <button onClick={() => navigate(`/productos/${id}`)} type="button">
          <Icon icon="mdi:eyes"></Icon>
        </button>
      </form>
    </li>
  );
};

export default ProductCard;

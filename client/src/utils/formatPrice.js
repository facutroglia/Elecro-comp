const formatPrice = (price) => {
  const formater = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  });
  return formater.format(price);
};

export default formatPrice;

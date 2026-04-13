export const allOrders = async () => {
  // Usamos tu variable de entorno como en los otros archivos
  let endpoint = `${import.meta.env.VITE_BACKEND_URL}/ordenes`;

  try {
    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error("No se pudo obtener la respuesta del servidor");
    }

    const data = await response.json();

    // Seguimos tu patrón de crear un objeto res
    let res = {};
    res.pedidos = data;

    return res;
  } catch (error) {
    console.error("Error en allOrders:", error);
    throw new Error("No se pudieron cargar los pedidos");
  }
};

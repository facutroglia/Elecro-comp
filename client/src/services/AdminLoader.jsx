export const allMetrics = async () => {
  const baseURL = import.meta.env.VITE_BACKEND_URL;
  const endpoints = [
    `${baseURL}/productos`,
    `${baseURL}/usuarios`,
    `${baseURL}/ordenes`,
    `${baseURL}/categorias`,
    `${baseURL}/marcas`,
  ];
  const [productos, usuarios, ordenes, categorias, marcas] = await Promise.all(
    endpoints.map(async (url) => {
      const req = await fetch(url);
      return await req.json();
    }),
  );
  const res = {};
  res.productos = productos.total;
  res.categorias = categorias.length;
  res.marcas = marcas.length;
  res.usuarios = usuarios.length;
  res.pedidos = ordenes.length;
  return res;
};

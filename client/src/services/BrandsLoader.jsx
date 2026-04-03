export const allBrands = async ({ request }) => {
  let endpoint = `${import.meta.env.VITE_BACKEND_URL}/marcas`;
  const marcas = await fetch(`${endpoint}`);
  let res = {};
  res.marcas = await marcas.json();
  return res;
};

export const allCategories = async ({ request }) => {
  let endpoint = `${import.meta.env.VITE_BACKEND_URL}/categorias`;
  const categorias = await fetch(`${endpoint}`);
  let res = {};
  res.categorias = await categorias.json();
  return res;
};

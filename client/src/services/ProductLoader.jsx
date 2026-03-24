export const allProductsCustomers = async ({ request }) => {
  let endpoint = `${import.meta.env.VITE_URL_API}/productos`;
  let query = new URLSearchParams({});
  const url = new URL(request.url);
  if (url.searchParams) {
    if (url.searchParams.get("q")) {
      query.append("search", url.searchParams.get("q"));
    }
    if (url.searchParams.get("p")) {
      query.append("page", url.searchParams.get("p"));
    }
    if (url.searchParams.get("c")) {
      query.append("category", url.searchParams.get("c"));
    }
  }
  const products = await fetch(
    `${endpoint} ${query.size > 0 ? `?${query.toString()}` : ""}`,
  );
  let res = {};
  res = await products.json();
  return res;
};

export const allProductsByCategory = async ({ params }) => {
  let endpoint = `${import.meta.env.VITE_URL_API}/productos`;
  let query = new URLSearchParams({});
  if (params.category) {
    if (url.searchParams.get("c")) {
      query.append("category", params.category);
    }
  }
  const products = await fetch(
    `${endpoint} ${query.size > 0 ? `?${query.toString()}` : ""}`,
  );
  let res = {};
  res.productos = await products.json();
  return res;
};

export const oneProduct = async ({ params }) => {
  const baseURL = `${import.meta.env.VITE_URL_API}/productos`;
  const detail = await fetch(`${baseURL}/${params.id}`);
  const producto = await detail.json();
  const products = await fetch(
    `${baseURL}?${new URLSearchParams({ category: producto.category.id }).toString()}`,
  );
  let res = {};
  res.producto = producto;
  res.relacionados = await products.json();
  return res;
};

export const allProductsAdmins = async ({ request }) => {
  let endpoint = `${import.meta.env.VITE_URL_API}/productos`;
  const products = await fetch(`${endpoint}`);
  let res = {};
  res.productos = await products.json();
  return res;
};

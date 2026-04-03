export const allProductsCustomers = async ({ request }) => {
  let endpoint = `${import.meta.env.VITE_BACKEND_URL}/productos`;
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
  let endpoint = `${import.meta.env.VITE_BACKEND_URL}/productos`;
  let query = new URLSearchParams({});
  if (params.categoria) {
    query.append("category", params.categoria);
  }
  const products = await fetch(`${endpoint}${`?${query.toString()}`}`);
  const data = await products.json();
  let res = {};
  res.productos = data.products;
  res.total = data.total;
  res.totalPages = data.totalPages;
  res.page = data.page;
  return res;
};

export const oneProduct = async ({ params }) => {
  const baseURL = `${import.meta.env.VITE_BACKEND_URL}/productos`;
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
  let endpoint = `${import.meta.env.VITE_BACKEND_URL}/productos`;
  const products = await fetch(`${endpoint}`);
  const data = await products.json();
  let res = {};
  res.productos = data.products;
  return res;
};

export const oneProductEdit = async ({ params }) => {
  const baseURL = `${import.meta.env.VITE_BACKEND_URL}/productos`;
  const detail = await fetch(`${baseURL}/${params.id}`);
  const producto = await detail.json();
  let res = {};
  res.producto = {
    data: {
      id: params.id,
      name: producto.name,
      description: producto.description,
      price: producto.price,
      category: producto.category,
      brand: producto.brand,
    },
    gallery: producto.gallery,
    attributes: producto.attributes,
  };
  return res;
};

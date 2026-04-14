# Documentación del Proyecto

## Resumen general

Este proyecto es una aplicación full-stack con:

- Frontend React + Vite en `client/`
- Backend Express + Prisma + PostgreSQL en `server/`
- Despliegue configurado para Vercel con `vercel.json`

La aplicación gestiona productos, marcas, categorías, usuarios, atributos, órdenes e ítems de pedido.

---

## Estructura principal

### `client/`

- `package.json`: dependencias de frontend.
- `vite.config.js`: configuración de Vite.
- `src/`: código React, componentes, layouts, páginas, context y servicios.
- `public/`: archivos estáticos.
- `.env`: variables de entorno locales para desarrollo.

### `server/`

- `app.js`: servidor Express principal.
- `package.json`: dependencias de backend.
- `src/`: controladores, rutas, middleware y librerías.
- `prisma/schema.prisma`: modelo de datos y configuración de Prisma.
- `public/`: archivos estáticos servidos por Express.

### `vercel.json`

- Configura el despliegue en Vercel para construir el frontend con `client/package.json`.
- Rutas SPA para servir `index.html`.

---

## Dependencias importantes

### Frontend (`client/package.json`)

- `react`: UI principal.
- `react-dom`: renderizado en el DOM.
- `react-router`: enrutamiento del cliente.
- `react-hook-form`: manejo de formularios.
- `@hookform/resolvers`: validación integrada.
- `zod`: esquemas y validación de datos.
- `moment`: formateo de fechas.
- `vite`: herramienta de desarrollo y build.
- `@vitejs/plugin-react`: soporte React en Vite.
- `eslint`, `@eslint/js`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`: linting.
- `@iconify/react`: iconos.

### Backend (`server/package.json`)

- `express`: servidor HTTP.
- `cors`: configuración de CORS.
- `dotenv`: carga variables de entorno.
- `multer`: subida de archivos.
- `bcrypt`: hashing de contraseñas.
- `pg`: cliente PostgreSQL.
- `@prisma/client`: cliente Prisma generado.
- `@prisma/adapter-pg`: adaptador de Prisma para PostgreSQL.
- `prisma`: CLI y definición de esquema.
- `nodemon` (dev): recarga en desarrollo.

---

## Modelos de datos (Prisma)

### `User`

- `id`, `email`, `password`
- `avatarId`, `name`, `phone`, `address`, `codeZip`
- `isAdmin`
- Relación con `avatar` (`File`), `favorites` (`Product[]`) y `orders` (`Order[]`).

### `Category`

- `id`, `name`
- `iconId`
- Relación con `icon` (`File`) y `products` (`Product[]`).

### `Brand`

- `id`, `name`
- `logoId`
- Relación con `logo` (`File`) y `products` (`Product[]`).

### `File`

- `id`, `name`, `url`, `type`
- Relaciones opcionales con `user`, `category`, `brand` y `product`.

### `Product`

- `id`, `name`, `description`, `price`, `categoryId`, `brandId`
- Relación con `category`, `brand`, `gallery` (`File[]`), `favorites`, `items` y `atributes`.

### `Atribute`

- `id`, `name`, `value`, `productId`
- Relación con `product`.

### `Order`

- `id`, `userId`, `name`, `phone`, `address`, `codeZip`, `date`
- Relación con `user` y `items`.

### `Item`

- `id`, `orderId`, `productId`, `price`, `quantity`
- Relación con `order` y `product`.

---

## Rutas del backend

El servidor expone estas rutas principales en `server/app.js`:

- `/api/archivos` → rutas de gestión de archivos.
- `/api/usuarios` → rutas de usuarios.
- `/api/categorias` → rutas de categorías.
- `/api/productos` → rutas de productos.
- `/api/ordenes` → rutas de órdenes.
- `/api/items` → rutas de ítems de orden.
- `/api/marcas` → rutas de marcas.
- `/api/atributos` → rutas de atributos.

### Ejemplo de rutas de ordenes

- `POST /api/ordenes/` → crear orden.
- `GET /api/ordenes/` → obtener todas las órdenes.
- `GET /api/ordenes/:id` → obtener orden por id.
- `PUT /api/ordenes/` → actualizar orden.
- `DELETE /api/ordenes/` → eliminar orden.

### Ejemplo de rutas de producto

- `POST /api/productos/` → crear producto.
- `POST /api/productos/agregar/imagen` → agregar imagen a producto.
- `DELETE /api/productos/quitar/imagen` → eliminar imagen.
- `GET /api/productos/` → obtener productos.
- `GET /api/productos/:id` → obtener producto por id.
- `PUT /api/productos/` → actualizar producto.
- `DELETE /api/productos/` → eliminar producto.

### Ejemplo de rutas de usuario

- `GET /api/usuarios/` → obtener todos los usuarios.
- `POST /api/usuarios/perfil` → obtener perfil de usuario.
- `PUT /api/usuarios/perfil` → obtener perfil de usuario (misma ruta con PUT).
- `POST /api/usuarios/registrar` → registrar usuario.
- `POST /api/usuarios/verificar` → verificar usuario.
- `PUT /api/usuarios/actualizar` → actualizar usuario.
- `PUT /api/usuarios/agregar/favorito` → agregar favorito.
- `PUT /api/usuarios/quitar/favorito` → quitar favorito.

### Ejemplo de rutas de categoría

- `POST /api/categorias/` → crear categoría.
- `GET /api/categorias/` → listar categorías.
- `GET /api/categorias/:id` → obtener categoría por id.
- `PUT /api/categorias/` → actualizar categoría.
- `DELETE /api/categorias/` → eliminar categoría.

---

## Observaciones de implementación

- El backend usa `express.json()` y `express.urlencoded()` para recibir JSON y formularios.
- `cors()` está habilitado para permitir solicitudes desde el frontend.
- Se sirve contenido estático desde `server/public` en `/public`.
- Los controladores resuelven la lógica de CRUD usando Prisma.
- Las rutas están separadas por módulos en `server/src/*`.

## Despliegue y entorno

### `vercel.json`

- Construye el frontend con `client/package.json`.
- Salida de build en `client/dist`.
- Configura la SPA para servir `index.html` en cualquier ruta.

### Variables de entorno esperadas

- `VITE_BACKEND_URL` (frontend) para apuntar al backend.
- `VITE_BACKEND_PUBLIC` (frontend).
- Variables de conexión de Prisma/PostgreSQL en el servidor si se utiliza `.env`.

---

## Comandos principales

### Frontend

- `cd client && npm run dev`
- `cd client && npm run build`

### Backend

- `cd server && npm start`
- `cd server && npm test` (usa `nodemon app.js` para desarrollo)

---

## Notas finales

Este proyecto implementa un ecommerce administrable donde se pueden registrar usuarios, gestionar productos, marcas, categorías, atributos, subir archivos, crear órdenes y manejar favoritos.

Para ampliar la documentación, se puede añadir información de cada controlador en `server/src/*` y de cada página en `client/src/pages/`.

import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static("public"));
app.set("port", process.env.PORT || 3000);

app.listen(app.get("port"), () => {
  console.log(`Server is running on port ${app.get("port")}`);
});

import fileRoutes from "./src/file/file.routes.js";
app.use("/api/archivos", fileRoutes);

import userRoutes from "./src/user/user.routes.js";
app.use("/api/usuarios", userRoutes);

import categoryRoutes from "./src/category/category.routes.js";
app.use("/api/categorias", categoryRoutes);

import productRoutes from "./src/product/product.routes.js";
app.use("/api/productos", productRoutes);

import orderRoutes from "./src/order/order.routes.js";
app.use("/api/ordenes", orderRoutes);

import itemRoutes from "./src/item/item.routes.js";
app.use("/api/items", itemRoutes);

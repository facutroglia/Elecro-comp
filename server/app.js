import express from "express";
import cors from "cors";
import fileRoutes from "./src/file/file.routes.js";
import userRoutes from "./src/user/user.routes.js";
import categoryRoutes from "./src/category/category.routes.js";
import productRoutes from "./src/product/product.routes.js";
import orderRoutes from "./src/order/order.routes.js";
import itemRoutes from "./src/item/item.routes.js";
import brandRoutes from "./src/brand/brand.routes.js";

const app = express();

app.set("port", process.env.PORT || 3000);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static("public"));

app.use("/api/archivos", fileRoutes);
app.use("/api/usuarios", userRoutes);
app.use("/api/categorias", categoryRoutes);
app.use("/api/productos", productRoutes);
app.use("/api/ordenes", orderRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/marcas", brandRoutes);

app.listen(app.get("port"), () => {
  console.log(`Server is running on port ${app.get("port")}`);
});

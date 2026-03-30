import { Router } from "express";
import brandRoutes from "./brand/brand.routes";
import productRoutes from "./product/product.routes";
import categoryRoutes from "./category/category.routes";
import userRoutes from "./user/user.routes";
import orderRoutes from "./order/order.routes";
import itemRoutes from "./item/item.routes";
import fileRoutes from "./file/file.routes";
import atributeRoutes from "./atribute/atribute.routes";

const router = Router();
router.use("/brands", brandRoutes);
router.use("/products", productRoutes);
router.use("/category", categoryRoutes);
router.use("/user", userRoutes);
router.use("/order", orderRoutes);
router.use("/item", itemRoutes);
router.use("/file", fileRoutes);
router.use("/brands", atributeRoutes);

export default router;

import prisma from "../libs/prisma.js";

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, categoryId, brandId } = req.body;

    if (!name || !description || !price || !categoryId || !brandId) {
      return res.status(400).json({
        error:
          "Todos los campos son requeridos: name, description, price, categoryId, brandId",
      });
    }

    if (price <= 0) {
      return res.status(400).json({ error: "El precio debe ser mayor a 0" });
    }

    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      return res.status(400).json({ error: "Categoría no encontrada" });
    }

    const brand = await prisma.brand.findUnique({ where: { id: brandId } });
    if (!brand) {
      return res.status(400).json({ error: "Marca no encontrada" });
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        categoryId,
        brandId,
      },
      include: {
        category: true,
        brand: true,
        gallery: true,
        atributes: true,
      },
    });

    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const addImage = async (req, res) => {
  try {
    const { productId, fileId } = req.body;
    if (!productId || !fileId) {
      return res
        .status(400)
        .json({ error: "productId y fileId son campos requeridos" });
    }

    const product = await prisma.product.findUnique({
      where: { id: productId },
    });
    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    const file = await prisma.file.findUnique({ where: { id: fileId } });
    if (!file) {
      return res.status(404).json({ error: "Archivo no encontrado" });
    }

    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: {
        gallery: {
          connect: { id: fileId },
        },
      },
      include: {
        category: true,
        brand: true,
        gallery: true,
        atributes: true,
      },
    });

    res.json({
      message: "Imagen agregada al producto exitosamente",
      product: updatedProduct,
    });
  } catch (error) {
    console.error(error);
    if (error.code === "P2025") {
      return res
        .status(404)
        .json({ error: "Producto o archivo no encontrado" });
    }
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const removeImage = async (req, res) => {
  try {
    const { productId, fileId } = req.body;
    if (!productId || !fileId) {
      return res
        .status(400)
        .json({ error: "productId y fileId son campos requeridos" });
    }

    const product = await prisma.product.findUnique({
      where: { id: productId },
    });
    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    const file = await prisma.file.findUnique({ where: { id: fileId } });
    if (!file) {
      return res.status(404).json({ error: "Archivo no encontrado" });
    }

    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: {
        gallery: {
          disconnect: { id: fileId },
        },
      },
      include: {
        category: true,
        brand: true,
        gallery: true,
        atributes: true,
      },
    });

    res.json({
      message: "Imagen removida de la galería del producto",
      product: updatedProduct,
    });
  } catch (error) {
    console.error(error);
    if (error.code === "P2025") {
      return res
        .status(404)
        .json({ error: "Producto o archivo no encontrado" });
    }
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getProducts = async (req, res) => {
  try {
    let { search, category, brand, minPrice, maxPrice, page } = req.query;

    const where = {};
    if (search) {
      where.name = { contains: search, mode: "insensitive" };
    }
    if (category) {
      const categoryRecord = await prisma.category.findFirst({
        where: { name: category },
      });
      where.categoryId = categoryRecord ? categoryRecord.id : null;
    }
    if (brand) {
      const brandRecord = await prisma.brand.findFirst({
        where: { name: brand },
      });
      where.brandId = brandRecord ? brandRecord.id : null;
    }
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) {
        where.price.gte = parseFloat(minPrice);
      }
      if (maxPrice) {
        where.price.lte = parseFloat(maxPrice);
      }
    }

    const paginate = {};
    if (page) {
      if (isNaN(parseInt(page)) || parseInt(page) < 1) {
        return res
          .status(400)
          .json({ error: "Página debe ser un número mayor a 0" });
      }
      page = parseInt(page);
      paginate.take = 4;
      paginate.skip = (page - 1) * paginate.take;
    }
    const total = await prisma.product.count({ where });

    // Obtener productos
    const products = await prisma.product.findMany({
      where,
      ...paginate,
      include: {
        category: true,
        brand: true,
        gallery: true,
        atributes: true,
      },
    });

    res.json({
      products,
      total,
      page: page,
      limit: paginate.take,
      totalPages: Math.ceil(total / paginate.take),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        brand: true,
        gallery: true,
        atributes: true,
      },
    });

    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { name, description, price, categoryId, brandId, id } = req.body;

    if (price !== undefined && price <= 0) {
      return res.status(400).json({ error: "El precio debe ser mayor a 0" });
    }

    if (categoryId) {
      const category = await prisma.category.findUnique({
        where: { id: categoryId },
      });
      if (!category) {
        return res.status(400).json({ error: "Categoría no encontrada" });
      }
    }

    if (brandId) {
      const brand = await prisma.brand.findUnique({ where: { id: brandId } });
      if (!brand) {
        return res.status(400).json({ error: "Marca no encontrada" });
      }
    }

    const product = await prisma.product.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(description && { description }),
        ...(price && { price: parseFloat(price) }),
        ...(categoryId && { categoryId }),
        ...(brandId && { brandId }),
      },
      include: {
        category: true,
        brand: true,
        gallery: true,
        atributes: true,
      },
    });

    res.json(product);
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.body;

    await prisma.product.delete({
      where: { id },
    });

    res.json({ message: "Producto eliminado exitosamente" });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

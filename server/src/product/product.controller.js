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

    // Verificar que categoryId y brandId existen
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

export const getProducts = async (req, res) => {
  try {
    const { search, category, brand, minPrice, maxPrice, page = 1 } = req.query;

    // Construir el where clause
    const where = {};
    if (search) {
      where.name = { contains: search, mode: "insensitive" };
    }
    if (category) {
      const categoryRecord = await prisma.category.findUnique({
        where: { name: category },
      });
      where.categoryId = categoryRecord ? categoryRecord.id : null;
    }
    if (brand) {
      const brandRecord = await prisma.brand.findUnique({
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

    // Paginación
    const pageNum = parseInt(page);
    const limitNum = parseInt("4");
    if (isNaN(pageNum) || pageNum < 1) {
      return res
        .status(400)
        .json({ error: "Página debe ser un número mayor a 0" });
    }
    if (isNaN(limitNum) || limitNum < 1 || limitNum > 100) {
      return res
        .status(400)
        .json({ error: "Límite debe ser un número entre 1 y 100" });
    }

    const skip = (pageNum - 1) * limitNum;

    // Contar total
    const total = await prisma.product.count({ where });

    // Obtener productos
    const products = await prisma.product.findMany({
      where,
      skip,
      take: limitNum,
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
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(total / limitNum),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Obtener un producto por ID
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

// Actualizar un producto
export const updateProduct = async (req, res) => {
  try {
    const { name, description, price, categoryId, brandId, id } = req.body;

    if (price !== undefined && price <= 0) {
      return res.status(400).json({ error: "El precio debe ser mayor a 0" });
    }

    // Verificar existencia si se actualizan categoryId o brandId
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

// Eliminar un producto
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

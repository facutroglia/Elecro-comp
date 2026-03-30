import prisma from "../libs/prisma.js";

// CREATE - Crear un nuevo atributo
export const createAtribute = async (req, res) => {
  try {
    const { name, value, productId } = req.body;

    if (!name || !value || !productId) {
      return res
        .status(400)
        .json({ error: "nombre, valor y productId son requeridos" });
    }

    const atribute = await prisma.atribute.create({
      data: {
        name,
        value,
        productId,
      },
      include: {
        product: true,
      },
    });

    res.status(201).json(atribute);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// READ - Obtener todos los atributos
export const getAllAtributes = async (req, res) => {
  const { product } = req.query;
  const where = {};
  if (product) {
    const productId = parseInt(product);
    if (!isNaN(productId)) {
      const productExists = await prisma.product.findUnique({
        where: { id: productId },
      });
      if (!productExists) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }
      where.productId = productExists.id;
    }
  }
  try {
    const atributes = await prisma.atribute.findMany({
      where,
      include: {
        product: true,
      },
    });

    res.status(200).json(atributes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE - Actualizar un atributo
export const updateAtribute = async (req, res) => {
  try {
    const { id } = req.body;
    const { name, value, productId } = req.body;

    const atribute = await prisma.atribute.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(value && { value }),
        ...(productId && { productId }),
      },
      include: {
        product: true,
      },
    });

    res.status(200).json(atribute);
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Atributo no encontrado" });
    }
    res.status(500).json({ error: error.message });
  }
};

// DELETE - Eliminar un atributo
export const deleteAtribute = async (req, res) => {
  try {
    const { id } = req.body;

    await prisma.atribute.delete({
      where: { id },
    });

    res.status(200).json({ message: "Atributo eliminado correctamente" });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Atributo no encontrado" });
    }
    res.status(500).json({ error: error.message });
  }
};

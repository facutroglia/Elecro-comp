import prisma from "../libs/prisma.js";

export const createCategory = async (req, res) => {
  try {
    const { name, iconId } = req.body;

    if (!name) {
      return res.status(400).json({ error: "El nombre es requerido" });
    }

    const category = await prisma.category.create({
      data: {
        name,
        iconId: iconId || null,
      },
      include: {
        icon: true,
        products: true,
      },
    });

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      include: {
        icon: true,
        products: true,
      },
    });

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        icon: true,
        products: true,
      },
    });

    if (!category) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { name, iconId, id } = req.body;

    const category = await prisma.category.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(iconId !== undefined && { iconId }),
      },
      include: {
        icon: true,
        products: true,
      },
    });

    res.status(200).json(category);
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }
    res.status(500).json({ error: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.body;

    await prisma.category.delete({
      where: { id },
    });

    res.status(200).json({ message: "Categoría eliminada correctamente" });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }
    res.status(500).json({ error: error.message });
  }
};

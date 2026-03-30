import prisma from "../libs/prisma";

export const getBrands = async (req, res) => {
  try {
    const brands = await prisma.brand.findMany({
      include: {
        logo: true, // Trae la info del archivo (url, nombre, etc.)
        _count: { select: { products: true } }, // Útil para saber cuántos productos tiene la marca
      },
    });
    res.json(brands);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las marcas" });
  }
};

export const createBrand = async (req, res) => {
  const { name, logoId } = req.body;
  try {
    const newBrand = await prisma.brand.create({
      data: {
        name,
        logoId: logoId || null, // logoId es opcional en tu esquema
      },
    });
    res.status(201).json(newBrand);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error al crear la marca. Quizás el nombre ya existe." });
  }
};

export const updateBrand = async (req, res) => {
  const { id } = req.params;
  const { name, logoId } = req.body;
  try {
    const updated = await prisma.brand.update({
      where: { id },
      data: { name, logoId },
    });
    res.json(updated);
  } catch (error) {
    res.status(404).json({ error: "Marca no encontrada" });
  }
};

export const deleteBrand = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.brand.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (error) {
    res
      .status(400)
      .json({
        error: "No se puede borrar: la marca tiene productos asociados.",
      });
  }
};

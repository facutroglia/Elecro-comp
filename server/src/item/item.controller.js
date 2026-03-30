import prisma from "../libs/prisma.js";

export const createItem = async (req, res) => {
  try {
    const { orderId, productId, quantity, price } = req.body;

    if (!orderId || !productId || !quantity || quantity <= 0) {
      return res
        .status(400)
        .json({ error: "orderId, productId y quantity > 0 son requeridos" });
    }

    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order) {
      return res.status(400).json({ error: "Orden no encontrada" });
    }

    const product = await prisma.product.findUnique({
      where: { id: productId },
    });
    if (!product) {
      return res.status(400).json({ error: "Producto no encontrado" });
    }

    const itemPrice = price ? parseFloat(price) : product.price;

    const item = await prisma.item.create({
      data: {
        orderId,
        productId,
        price: itemPrice,
        quantity: parseInt(quantity),
      },
      include: {
        order: true,
        product: true,
      },
    });

    res.status(201).json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getItems = async (req, res) => {
  try {
    const { orderId } = req.query;

    const where = {};
    if (orderId) {
      where.orderId = orderId;
    }

    const items = await prisma.item.findMany({
      where,
      include: {
        order: true,
        product: true,
      },
    });
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getItemById = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await prisma.item.findUnique({
      where: { id },
      include: {
        order: true,
        product: true,
      },
    });

    if (!item) {
      return res.status(404).json({ error: "Item no encontrado" });
    }

    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const updateItem = async (req, res) => {
  try {
    const { quantity, price, id } = req.body;

    if (quantity !== undefined && quantity <= 0) {
      return res.status(400).json({ error: "Quantity debe ser mayor a 0" });
    }

    const data = {};
    if (quantity !== undefined) {
      data.quantity = parseInt(quantity);
    }
    if (price !== undefined) {
      data.price = parseFloat(price);
    }

    const item = await prisma.item.update({
      where: { id },
      data,
      include: {
        order: true,
        product: true,
      },
    });

    res.json(item);
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Item no encontrado" });
    }
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const { id } = req.body;

    await prisma.item.delete({
      where: { id },
    });

    res.json({ message: "Item eliminado exitosamente" });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Item no encontrado" });
    }
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

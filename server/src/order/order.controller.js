import prisma from "../libs/prisma.js";

export const createOrder = async (req, res) => {
  try {
    const { userId, name, phone, address, codeZip, items } = req.body;

    if (!userId || !items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        error:
          "userId y items son requeridos. Items debe ser un array no vacío.",
      });
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(400).json({ error: "Usuario no encontrado" });
    }

    for (const item of items) {
      if (!item.productId || !item.quantity || item.quantity <= 0) {
        return res
          .status(400)
          .json({ error: "Cada item debe tener productId y quantity > 0" });
      }
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
      });
      if (!product) {
        return res
          .status(400)
          .json({ error: `Producto con id ${item.productId} no encontrado` });
      }

      if (!item.price) {
        item.price = product.price;
      }
    }

    const order = await prisma.order.create({
      data: {
        userId,
        name,
        phone,
        address,
        codeZip,
        items: {
          create: items.map((item) => ({
            productId: item.productId,
            price: item.price,
            quantity: item.quantity,
          })),
        },
      },
      include: {
        user: true,
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: true,
        items: {
          include: {
            product: true,
          },
        },
      },
    });
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        user: true,
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!order) {
      return res.status(404).json({ error: "Orden no encontrada" });
    }

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const { name, phone, address, codeZip, id } = req.body;

    const order = await prisma.order.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(phone !== undefined && { phone }),
        ...(address !== undefined && { address }),
        ...(codeZip !== undefined && { codeZip }),
      },
      include: {
        user: true,
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    res.json(order);
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Orden no encontrada" });
    }
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.body;

    await prisma.order.delete({
      where: { id },
    });

    res.json({ message: "Orden eliminada exitosamente" });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Orden no encontrada" });
    }
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

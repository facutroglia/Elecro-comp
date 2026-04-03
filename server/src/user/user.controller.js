import prisma from "../libs/prisma.js";
import bcrypt from "bcrypt";
export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error al traer a los usuarios" });
  }
};

export const getUser = async (req, res) => {
  const { id, email } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: { id: id || undefined, email: email || undefined },
      include: {
        avatar: true,
        favorites: {
          include: {
            category: true,
            brand: true,
            gallery: true,
            atributes: true,
          },
        },
        orders: {
          include: {
            items: {
              include: {
                product: {
                  include: {
                    category: true,
                    brand: true,
                    gallery: true,
                    atributes: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error al traer al usuario" });
  }
};

export const register = async (req, res) => {
  const data = req.body;
  if (!data.email || !data.password) {
    return res.status(400).json({ error: "Email y contraseña son requeridos" });
  }
  const userExists = await prisma.user.findUnique({
    where: { email: data.email },
  });
  if (userExists) {
    return res.status(400).json({ error: "El email ya está registrado" });
  }

  try {
    const newUser = await prisma.user.create({ data });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Error al crear al usuario" });
  }
};

export const updateUser = async (req, res) => {
  const data = req.body;
  try {
    const updatedUser = await prisma.user.update({
      where: { id: data.id },
      data,
    });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar al usuario" });
  }
};

export const verifyUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Usuario no encontrado" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error al verificar al usuario" });
  }
};

export const userAddFavorite = async (req, res) => {
  const { productId, userId } = req.body;
  if (!productId || !userId) {
    return res
      .status(400)
      .json({ error: "productId y userId son campos requeridos" });
  }
  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });
    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        favorites: {
          connect: { id: productId },
        },
      },
      include: {
        favorites: {
          include: {
            category: true,
            brand: true,
            gallery: true,
            atributes: true,
          },
        },
      },
    });

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Error al agregar producto a favoritos" });
  }
};
export const userRemoveFavorite = async (req, res) => {
  const { productId, userId } = req.body;
  if (!productId || !userId) {
    return res
      .status(400)
      .json({ error: "productId y userId son campos requeridos" });
  }
  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });
    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        favorites: {
          disconnect: { id: productId },
        },
      },
      include: {
        favorites: {
          include: {
            category: true,
            brand: true,
            gallery: true,
            atributes: true,
          },
        },
      },
    });

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar producto de favoritos" });
  }
};

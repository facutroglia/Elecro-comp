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
      include: { avatar: true, favorites: true, orders: true },
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

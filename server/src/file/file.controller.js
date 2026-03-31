import prisma from "../libs/prisma.js";
import { unlink, access } from "node:fs/promises";
import { join } from "node:path";
export async function uploadFile(req, res) {
  if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
    return res.status(400).json({ error: "No hay archivos para subir" });
  }
  if (req.files.length == 1) {
    const file = req.files[0];
    const create = await prisma.file.create({
      data: {
        name: file.originalname,
        url: file.filename,
        type: req.body.type || "general",
      },
    });
    return res.status(200).json(create);
  }
  const files = req.files.map((file) => ({
    name: file.originalname,
    url: file.filename,
    type: req.body.type || "general",
  }));
  const createMany = await prisma.file.createMany({
    data: files,
  });
  return res.status(200).json(createMany);
}

export async function deleteFile(req, res) {
  const { id } = req.body;
  const file = await prisma.file.findUnique({
    where: { id: id },
  });
  if (!file) {
    return res.status(404).json({ error: "Archivo no encontrado" });
  }
  const filePath = join(process.cwd(), "public", file.url);
  if (access(filePath)) {
    await unlink(filePath);
  }

  await prisma.file.delete({
    where: { id: id },
  });
  return res.status(200).json({ message: "Archivo eliminado correctamente" });
}

export async function changeFile(req, res) {
  const { fileId } = req.body;
  const [file] = req.files;
  if (!file) {
    return res.status(400).json({ error: "No hay archivos para subir" });
  }
  const fileData = await prisma.file.findUnique({
    where: { id: fileId },
  });
  if (!fileData) {
    return res.status(404).json({ error: "Archivo no encontrado" });
  }
  const filePath = join(process.cwd(), "public", fileData.url);
  if (access(filePath)) {
    await unlink(filePath);
  }
  const update = await prisma.file.update({
    where: { id: fileId },
    data: {
      name: file.originalname,
      url: file.filename,
      type: req.body.type || "general",
    },
  });
  return res.status(200).json(update);
}

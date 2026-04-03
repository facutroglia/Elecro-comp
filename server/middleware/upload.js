import multer from "multer";
import { join, extname } from "node:path";

const sanitizeFileName = (file) => {
  const originalName = file.originalname;
  const extension = extname(originalName);
  const filename = originalName.replace(extension, "");
  const sanitizedName = filename.replace(/[^a-zA-Z0-9.]/g, "_");
  return sanitizedName + extension;
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, join(process.cwd(), "public/"));
  },
  filename: function (req, file, cb) {
    const sanitizedName = sanitizeFileName(file);
    cb(null, Date.now() + "_" + sanitizedName);
  },
});

const upload = multer({ storage: storage });

export default upload;

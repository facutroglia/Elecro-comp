import bcrypt from "bcrypt";

const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

const hash = async (req, res, next) => {
  try {
    if (req.body.password) {
      req.body.password = await hashPassword(req.body.password);
    }
    next();
  } catch (error) {
    console.error("Error hashing password:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export default hash;

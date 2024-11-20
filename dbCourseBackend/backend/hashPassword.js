
import bcrypt from "bcrypt";
import { db } from "./db.js";

const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

const hashedPassword = await hashPassword("userPassword123");
await db.query("INSERT INTO users (username, password_hash) VALUES($1, $2)", [
  "admin",
  hashedPassword,
]);

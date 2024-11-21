import bcrypt from "bcrypt";
import { db } from "../db/db.js";

const registerUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const userCheck = await db.query(
      "SELECT username FROM users WHERE username = $1",
      [username]
    );
    if (userCheck.rows.length > 0) {
      res
        .status(409)
        .json({ success: false, message: "Username already exist" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await db.query(
      "INSERT INTO users (username, password_hash, role) VALUES($1, $2, $3)",
      [username, hashedPassword, "user"]
    );
    res
      .status(201)
      .json({ success: true, message: "User registered successfuly" });
  } catch (error) {
    console.error("Error during registration: ", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export default registerUser;

import bcrypt from "bcrypt";
import { db } from "../db/db.js";

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await db.query(
      "SELECT password_hash, role FROM users WHERE username = $1",
      [username]
    );
    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const passwordMatch = await bcrypt.compare(
      password,
      result.rows[0].password_hash
    );
    const role = await result.rows[0].role;
    
    if (passwordMatch) {
      return res.json({
        success: true,
        message: "Login successful",
        role: role,
      });
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log("Error during login: ", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export default loginUser;

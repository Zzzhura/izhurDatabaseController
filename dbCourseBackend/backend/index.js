import express from "express";
import cors from"cors";
import bodyParser from "body-parser";
import { db } from "./db.js"
import bcrypt from "bcrypt";

const app = express();
const PORT = 3001;
app.use(cors());
app.use(bodyParser.json());


app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await db.query('SELECT password_hash, role FROM users WHERE username = $1', [username]);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    const passwordMatch = await bcrypt.compare(password, result.rows[0].password_hash);

    if (passwordMatch) {
      return res.json({ success: true, message: 'Login successful', role: result.rows.role, });
    } else {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log('Error during login: ', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }

});

app.get("/auto", async (req, res) => {
  try {
    const result = await db.query("SELECT id, num, color, mark, personal_id FROM public.auto;");
    if (result.length === 0) {
      return res.status(200).json([]); // Empty array response
    }
    return res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching data from auto:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/journal", async (req, res) => {
  try {
    // Query the database
    const result = await db.query(
      "SELECT id, time_out, time_in, auto_id, route_id FROM public.journal;"
    );
    if (result.length === 0) {
      return res.status(200).json([]); // Empty array response
    }
    return res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching data from journal:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
})

app.get("/auto_personal", async (req, res) => {
  try {

    const result = await db.query(
      "SELECT id, first_name, last_name, father_name FROM public.auto_personal;"
    );
    if (result.length === 0) {
      return res.status(200).json([]);
    }
    return res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching data from auto_personal:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/routes", async (req, res) => {
  try {
    const result = await db.query("SELECT id, name FROM public.routes;");
    if (result.length === 0) {
      return res.status(200).json([]); // Empty array response
    }
    return res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching data from auto_personal:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

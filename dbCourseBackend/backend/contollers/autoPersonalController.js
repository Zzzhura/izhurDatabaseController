import { db } from "../db/db.js";

const getAutoPersonalData = async (req, res) => {
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
};

export default getAutoPersonalData;

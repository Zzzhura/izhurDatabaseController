import { db } from "../db/db.js";

const getAutoData = async (req, res) => {
  try {
    const result = await db.query(
      "SELECT id, num, color, mark, personal_id FROM public.auto;"
    );
    if (result.length === 0) {
      return res.status(200).json([]); // Empty array response
    }
    return res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching data from auto:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default getAutoData;
import { db } from "../db/db.js";

const getJournalData = async (req, res) => {
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
};

export default getJournalData;

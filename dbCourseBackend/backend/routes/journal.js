import express from "express";
import "../db/db.js";
import getJournalData from "../contollers/journalController.js";

const router = express.Router();

router.get("/auto_personal", await getJournalData);

export default router;

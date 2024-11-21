import express from "express";
import getAutoPersonalData from "../contollers/autoPersonalController.js";

const router = express.Router();

router.get("/auto_personal", await getAutoPersonalData);

export default router;

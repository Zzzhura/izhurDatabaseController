import express from "express";
import getAutoData from "../contollers/autoController.js";

const router = express.Router();

router.get("/auto", await getAutoData);

export default router;

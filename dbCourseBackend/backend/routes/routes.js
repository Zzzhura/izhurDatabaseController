import express from "express";
import getRoutesData from "../contollers/routesController.js";

const router = express.Router();

router.get("/routes", await getRoutesData);

export default router;

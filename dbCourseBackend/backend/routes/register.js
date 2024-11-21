import express from "express";
import registerUser from "../contollers/registerController.js";

const router = express.Router();

router.post("/register", await registerUser);

export default router;

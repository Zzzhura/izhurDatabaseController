import express from "express";
import loginUser from "../contollers/loginController.js";

const router = express.Router();

router.post("/login", await loginUser);

export default router;

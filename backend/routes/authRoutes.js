import express from "express";
import { signup, login, logout } from "../controllers/authController.js";
import { validateSignup, validateLogin } from "../middlewares/validateAuth.js";

const router = express.Router();

router.post("/signup", validateSignup, signup);
router.post("/login", validateLogin, login);
router.post("/logout", validateLogin, logout);

export default router;

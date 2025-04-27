import { body } from "express-validator";

export const validateSignup = [
  body("email").isEmail().withMessage("Please enter a valid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

export const validateLogin = [
  body("email").isEmail().withMessage("Please enter a valid email"),
  body("password").exists().withMessage("Password is required"),
];

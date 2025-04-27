import { body, param } from "express-validator";

export const validateCreateTweet = [
  body("text")
    .isString()
    .withMessage("Tweet text must be a string")
    .isLength({ max: 140 })
    .withMessage("Tweet must be less than or equal to 140 characters"),
];

export const validateUpdateTweet = [
  param("id").isMongoId().withMessage("Invalid tweet ID format"),
  body("text")
    .isString()
    .withMessage("Tweet text must be a string")
    .isLength({ max: 140 })
    .withMessage("Tweet must be less than or equal to 140 characters"),
];

export const validateDeleteTweet = [
  param("id").isMongoId().withMessage("Invalid tweet ID format"),
];

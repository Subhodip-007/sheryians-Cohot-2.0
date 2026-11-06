import { body, validationResult } from "express-validator";
 const validator = (req, res, next) => {
  const errors = validationResult(req); // Changed 'error' to 'errors' to match the condition
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
export const validateNotes = [
  // 1. Validation rules
  body("title")
    .trim()
    .notEmpty()
    .withMessage("title can't be empty"),
    
  body("description")
    .trim()
    .notEmpty()
    .withMessage("description can't be empty"),

  // 2. Middleware function to catch validation errors
  validator

];

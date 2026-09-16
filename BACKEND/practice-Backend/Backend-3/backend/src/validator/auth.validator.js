import { body,validationResult } from "express-validator"
export const validate =(req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            error:errors.array()
        })
    }
    next()

}
export const registerValidator = [
  // Swapped to match the capital letters used in your registerController
  body("Username")
    .isString()
    .trim()
    .notEmpty().withMessage("Username is required")
    .isLength({ min: 3 }).withMessage("Username must be at least 3 characters long"),
    
  body("Email")
    .trim()
    .notEmpty().withMessage("Email is required") // Fixed message
    .isEmail().withMessage("Please provide a valid email address") // Fixed message
    .normalizeEmail(),
    
  body("Password")
    .trim()
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    
  body("Phone") // Kept as Phone to align with your earlier controller update
    .trim()
    .notEmpty().withMessage("Phone number is required")
    .isMobilePhone('any').withMessage('Please provide a valid phone number'),
];
export const loginValidator = [
  body("username")
  .optional()
  .trim()
  .isString(),
  body("email")
  .optional()
  .trim()
  .isEmail().withMessage("please enter a valid email address format")
  .normalizeEmail(),
  body("password")
  .trim()
  .notEmpty().withMessage("password is required")
];
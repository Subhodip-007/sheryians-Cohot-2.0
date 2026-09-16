import { body,validationResult } from "express-validator";
export const validate = (req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(
            { errors: errors.array() }
        );
    }
    next();
}
export const taskValidator = [
    body("title")
    .trim()
    .notEmpty()
    .withMessage("Task title is required")
    .isLength({ max: 60 })
    .withMessage("Task title must not exceed 60 characters"),
    body("description")
    .trim()
    .notEmpty()
    .withMessage("Task description is required"),
    body("priority")
    .optional()
    .isIn(["low", "medium", "high"])
    .withMessage("Priority must be one of the following: low, medium, high"),
]
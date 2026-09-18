import { body,validationResult } from "express-validator";
export const validate =(req,res,next)=>{
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    next();
}

export const registerValidator = [
body("username")
.trim()
.notEmpty().withMessage("username is required")
.isLength({min:3}).withMessage("username must be at least 3 characters long")
.matches(/^[a-zA-Z0-9]+$/).withMessage("username must be alphanumeric"),
body("email")
.trim()
.notEmpty().withMessage("email is required")
.isEmail().withMessage("email must be a valid email address"),
body("password")
.trim()
.notEmpty().withMessage("password is required")
.isLength({min:6}).withMessage("password must be at least 6 characters long")
.matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/).withMessage("password must contain at least one uppercase letter, one lowercase letter, one number and one special character")
];

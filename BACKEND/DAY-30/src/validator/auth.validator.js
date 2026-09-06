import { body, validationResult } from "express-validator";
export const validate =(req, res, next) => {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array()
                });
            }

            next();
        }

export const registerValidation =[
        body("username")
            .isString()
            .withMessage("username should be string"),

        body("email")
            .isEmail()
            .withMessage("email should be valid Email address"),
            validate
        ,body("password").isLength({min:6}).withMessage("password should be at least 6 character")
        ,body("age").custom((val)=>{
            if(val<18){
                throw new Error("minor age...")
            }
        })
    ]
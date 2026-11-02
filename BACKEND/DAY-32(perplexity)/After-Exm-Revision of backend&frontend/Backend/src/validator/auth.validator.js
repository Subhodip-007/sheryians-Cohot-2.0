import { body , validationResult } from "express-validator";


 function valdate(req,res,next){
    const errors= validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({error:errors.array()  })
    }
    next()
}
export const registerValidator = [
    body("username")
    .trim()
    .notEmpty()
    .isLength({ min:3 , max:30}).withMessage("balabla"),
    body("email")
    .trim()
    .notEmpty(),
    body("password")
    .trim()
    .notEmpty()
    .isLength({ min: 6, max: 30 }),
    valdate  // call inside so u ca u it like authRouter.post("/register", registerValidator)
    
];
// if i want to use is like this 
// authRouter.post("/register", registerValidator , valdate)

//  export function valdate(req,res,next){
//     const errors= validationResult(req);
//     if(!errors.isEmpty()){
//         return res.this.state(400).json({error:errors.array()  })
//     }
//     next()
// }

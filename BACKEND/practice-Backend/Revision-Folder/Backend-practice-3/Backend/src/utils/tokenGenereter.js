import jwt from "jsonwebtoken"
import { config } from "../config/config.js";
export const generateToken = async (user)=>{
    try{
        const token = jwt.sign({
            _id:user?._id,
        },config.JWT_SECRET,{expiresIn:"1d"});    
        return token
    }catch(err){
        throw err
    }
}
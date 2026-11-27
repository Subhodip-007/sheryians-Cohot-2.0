import jwt from "jsonwebtoken"
import { config } from "../config/config.js";
export const generateToken={
    generateAccessToken:(user)=>{
        try{
             const token = jwt.sign({
            _id:user?._id,
        },config.ACCESS_SECRET,{expiresIn:"15min"});    
        return token
        }catch(err){
            throw err
        }
        
    },
    generateRefreshToken:(user)=>{
          try{
             const token = jwt.sign({
            _id:user?._id,
        },config.REFRESH_SECRET,{expiresIn:"7d"});    
        return token
        }catch(err){
            throw err
        }
    }
} 

import JWT from "jsonwebtoken";
export const tokenGenerater = (user)=>{
    try{
        const token = JWT.sign({
            _id:user._id
        },process.env.JWT_SECRET,
        {
        expiresIn: "7d"
    }
    )
    return token
    }catch(err){
        console.log(err);
        

    }
} 
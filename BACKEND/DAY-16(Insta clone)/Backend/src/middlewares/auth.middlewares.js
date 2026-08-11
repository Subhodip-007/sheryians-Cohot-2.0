const jwt = require("jsonwebtoken");
const identifyUser =  async (req,res,next)=>{
   const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: "unauthorizer access"
      })
    }
    let decode;
    try {
      decode = jwt.verify(token, process.env.JWT_SECRET)
      // console.log(decode);
    } catch (err) {
      return res.status(401).json({
        message: "unauthorized access",

      })
    }
    req.verifiedUser = decode
    next()
}
module.exports = identifyUser;
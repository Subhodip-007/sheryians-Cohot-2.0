const JWT = require("jsonwebtoken");
const generateatoken = (user)=>{
    const token = JWT.sign({
    _id : user._id,
    Username:user.Username
  },process.env.JWT_SECRET, {
    expiresIn: "1d"
  })
  return token
}
  

  module.exports = generateatoken
import "dotenv/config"

if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI IS NOT DEFINED IN ENV");
}
if (!process.env.PORT) {
    throw new Error("PORT IS NOT DEFINED IN ENV");
}
if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET IS NOT DEFINED IN ENV");
}
export const config = {
     MONGO_URI: process.env.MONGO_URI,
     PORT: process.env.PORT,
     JWT_SECRET : process.env.JWT_SECRET,

}
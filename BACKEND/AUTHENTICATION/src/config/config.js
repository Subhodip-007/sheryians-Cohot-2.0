import "dotenv/config";

// Validate mandatory environment variables
if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI IS NOT DEFINED IN ENV");
}
if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET IS NOT DEFINED IN ENV");
}
if (!process.env.CLIENT_ID) {
    throw new Error("CLIENT_ID IS NOT DEFINED IN ENV");
}
if (!process.env.CLIENT_SECRET) {
    throw new Error("CLIENT_SECRET IS NOT DEFINED IN ENV");
}
if (!process.env.ACCESS_TOKEN) {
    throw new Error("ACCESS_TOKEN IS NOT DEFINED IN ENV");
}
if (!process.env.REFRESH_TOKEN) {
    throw new Error("REFRESH_TOKEN IS NOT DEFINED IN ENV");
}

const config = {
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    ACCESS_TOKEN: process.env.ACCESS_TOKEN,
    REFRESH_TOKEN: process.env.REFRESH_TOKEN,
    EMAIL_USER:process.env.EMAIL_USER,
};

export default config;

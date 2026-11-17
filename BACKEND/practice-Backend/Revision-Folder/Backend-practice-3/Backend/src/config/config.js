
import "dotenv/config";

if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI IS NOT DEFINED IN ENV");
}

if (!process.env.PORT) {
    throw new Error("PORT IS NOT DEFINED IN ENV");
}

if (!process.env.ACCESS_SECRET || !process.env.REFRESH_SECRET) {
    throw new Error("JWT SECRETS ARE NOT DEFINED IN ENV");
}

if (
    !process.env.EMAIL_USER ||
    !process.env.CLIENT_ID ||
    !process.env.CLIENT_SECRET ||
    !process.env.REFRESH_TOKEN
) {
    throw new Error("EMAIL OAUTH CREDENTIALS ARE NOT DEFINED IN ENV");
}

export const config = {
    MONGO_URI: process.env.MONGO_URI,
    PORT: process.env.PORT,

    // JWT
    ACCESS_SECRET: process.env.ACCESS_SECRET,
    REFRESH_SECRET: process.env.REFRESH_SECRET,

    // Gmail OAuth2
    EMAIL_USER: process.env.EMAIL_USER,
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    REFRESH_TOKEN: process.env.REFRESH_TOKEN
};

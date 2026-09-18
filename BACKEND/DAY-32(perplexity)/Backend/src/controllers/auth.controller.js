import { userModel } from "../model/user.model.js";
import { sendEmail } from "../services/mail.service.js";

export const registerController = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        const isUserExist = await userModel.findOne({
            $or: [{ email }, { username }]
        });

        if (isUserExist) {
            const error = new Error(
                process.env.NODE_ENV === "production"
                    ? "User already exists"
                    : "User exists with these credentials"
            );

            error.statusCode = 400;
            return next(error);
        }

        // Password will be hashed by Mongoose pre-save middleware
        const user = await userModel.create({
            username,
            email,
            password
        });
        await sendEmail({
    to: email,
    subject: "Email Verification",
    text: `Hello ${username}, please verify your email.`,
    html: `
        <h2>Hello ${username}</h2>
        <p>Please verify your email.</p>
    `,
});

        res.status(201).json({
            message: "User registered successfully",
            user: {
                _id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (err) {
        next(err);
    }
};
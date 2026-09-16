import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";


const sanitizeUser = (user) => {
    return {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        location: user.location,
        createdAt: user.createdAt
    };
};


const registerUser = async ({
    name,
    email,
    password
}) => {

    const normalizedEmail =
        email.toLowerCase().trim();


    const existingUser =
        await User.findOne({
            email: normalizedEmail
        });
        if (!user.isActive) {

    const error = new Error(
        "Your account has been deactivated"
    );

    error.statusCode = 403;

    throw error;
}


    if (existingUser) {

        const error = new Error(
            "User already exists with this email"
        );

        error.statusCode = 409;

        throw error;
    }


    const hashedPassword =
        await bcrypt.hash(password, 10);


    const user = await User.create({
        name: name.trim(),
        email: normalizedEmail,
        password: hashedPassword,
        role: "OPERATOR"
    });


    return {
        user: sanitizeUser(user)
    };
};


const loginUser = async ({
    email,
    password
}) => {

    const normalizedEmail =
        email.toLowerCase().trim();


    const user =
        await User.findOne({
            email: normalizedEmail
        });


    if (!user) {

        const error = new Error(
            "Invalid email or password"
        );

        error.statusCode = 401;

        throw error;
    }


    const isPasswordValid =
        await bcrypt.compare(
            password,
            user.password
        );


    if (!isPasswordValid) {

        const error = new Error(
            "Invalid email or password"
        );

        error.statusCode = 401;

        throw error;
    }


    const token =
        generateToken(user);


    return {
        token,
        user: sanitizeUser(user)
    };
};


const getCurrentUser = async (userId) => {

    const user =
        await User.findById(userId);


    if (!user) {

        const error = new Error(
            "User not found"
        );

        error.statusCode = 404;

        throw error;
    }


    return sanitizeUser(user);
};


export {
    registerUser,
    loginUser,
    getCurrentUser
};
import {
    registerUser,
    loginUser,
    getCurrentUser
} from "../services/auth.service.js";


const register = async (req, res, next) => {

    try {

        const result = await registerUser({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: result.user
        });

    } catch (error) {

        next(error);

    }
};


const login = async (req, res, next) => {

    try {

        const result = await loginUser({
            email: req.body.email,
            password: req.body.password
        });


        res
            .cookie(
                "token",
                result.token,
                {
                    httpOnly: true,

                    secure:
                        process.env.NODE_ENV ===
                        "production",

                    sameSite:
                        process.env.NODE_ENV ===
                        "production"
                            ? "none"
                            : "lax",

                    maxAge:
                        7 *
                        24 *
                        60 *
                        60 *
                        1000
                }
            )
            .status(200)
            .json({
                success: true,
                message: "Login successful",
                user: result.user
            });

    } catch (error) {

        next(error);

    }
};


const getMe = async (req, res, next) => {

    try {

        const user =
            await getCurrentUser(
                req.user._id
            );

        res.status(200).json({
            success: true,
            user
        });

    } catch (error) {

        next(error);

    }
};


const logout = async (req, res, next) => {

    try {

        res
            .clearCookie(
                "token",
                {
                    httpOnly: true,

                    secure:
                        process.env.NODE_ENV ===
                        "production",

                    sameSite:
                        process.env.NODE_ENV ===
                        "production"
                            ? "none"
                            : "lax"
                }
            )
            .status(200)
            .json({
                success: true,
                message: "Logged out successfully"
            });

    } catch (error) {

        next(error);

    }
};


export {
    register,
    login,
    getMe,
    logout
};
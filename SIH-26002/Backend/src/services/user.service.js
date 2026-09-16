import bcrypt from "bcryptjs";
import User from "../models/user.model.js";


// --------------------------------------------------
// Helper: Remove sensitive fields
// --------------------------------------------------

const sanitizeUser = (user) => {
    return {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        location: user.location,
        isActive: user.isActive,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    };
};


// --------------------------------------------------
// Create Admin
// --------------------------------------------------

const createAdmin = async ({
    name,
    email,
    password
}) => {

    const existingAdmin =
        await User.findOne({
            role: "ADMIN"
        });

    if (existingAdmin) {

        const error = new Error(
            "An administrator already exists"
        );

        error.statusCode = 409;

        throw error;
    }


    const normalizedEmail =
        email.toLowerCase().trim();


    const existingUser =
        await User.findOne({
            email: normalizedEmail
        });


    if (existingUser) {

        const error = new Error(
            "A user already exists with this email"
        );

        error.statusCode = 409;

        throw error;
    }


    const hashedPassword =
        await bcrypt.hash(
            password,
            10
        );


    const admin =
        await User.create({

            name: name.trim(),

            email: normalizedEmail,

            password: hashedPassword,

            role: "ADMIN"

        });


    return admin;
};


// --------------------------------------------------
// Create User By Admin
// --------------------------------------------------

const createUserByAdmin = async ({
    name,
    email,
    password,
    role
}) => {

    const allowedRoles = [
        "OPERATOR",
        "DRIVER",
        "FIELD_AGENT"
    ];


    if (!allowedRoles.includes(role)) {

        const error = new Error(
            "Invalid user role"
        );

        error.statusCode = 400;

        throw error;
    }


    const normalizedEmail =
        email.toLowerCase().trim();


    const existingUser =
        await User.findOne({
            email: normalizedEmail
        });


    if (existingUser) {

        const error = new Error(
            "A user already exists with this email"
        );

        error.statusCode = 409;

        throw error;
    }


    const hashedPassword =
        await bcrypt.hash(
            password,
            10
        );


    const user =
        await User.create({

            name: name.trim(),

            email: normalizedEmail,

            password: hashedPassword,

            role

        });


    return user;
};


// --------------------------------------------------
// Get All Users
// --------------------------------------------------

const getAllUsers = async ({
    role,
    isActive
} = {}) => {

    const filter = {};


    // Filter by role if provided
    if (role) {
        filter.role = role;
    }


    // Filter by active status if provided
    if (typeof isActive !== "undefined") {

        filter.isActive =
            isActive === "true";

    }


    const users =
        await User.find(filter)
            .select("-password")
            .sort({
                createdAt: -1
            });


    return users;
};


// --------------------------------------------------
// Get User By ID
// --------------------------------------------------

const getUserById = async (
    userId
) => {

    const user =
        await User.findById(userId)
            .select("-password");


    if (!user) {

        const error = new Error(
            "User not found"
        );

        error.statusCode = 404;

        throw error;
    }


    return user;
};


// --------------------------------------------------
// Update User
// --------------------------------------------------

const updateUser = async (
    userId,
    data,
    currentAdminId
) => {

    const user =
        await User.findById(userId);


    if (!user) {

        const error = new Error(
            "User not found"
        );

        error.statusCode = 404;

        throw error;
    }


    // Prevent admin from changing their own role
    if (
        user._id.toString() ===
        currentAdminId.toString()
    ) {

        if (
            data.role &&
            data.role !== "ADMIN"
        ) {

            const error = new Error(
                "You cannot change your own admin role"
            );

            error.statusCode = 403;

            throw error;
        }
    }


    // Never allow creating another ADMIN
    if (data.role === "ADMIN") {

        if (
            user.role !== "ADMIN"
        ) {

            const error = new Error(
                "Admin role cannot be assigned to another user"
            );

            error.statusCode = 403;

            throw error;
        }
    }


    // Update allowed fields only
    const allowedUpdates = {};

    if (data.name !== undefined) {
        allowedUpdates.name =
            data.name.trim();
    }

    if (data.email !== undefined) {

        const normalizedEmail =
            data.email.toLowerCase().trim();


        const existingEmailUser =
            await User.findOne({
                email: normalizedEmail,
                _id: {
                    $ne: userId
                }
            });


        if (existingEmailUser) {

            const error = new Error(
                "A user already exists with this email"
            );

            error.statusCode = 409;

            throw error;
        }


        allowedUpdates.email =
            normalizedEmail;
    }


    if (data.role !== undefined) {

        const allowedRoles = [
            "OPERATOR",
            "DRIVER",
            "FIELD_AGENT"
        ];


        if (
            user.role === "ADMIN" &&
            data.role !== "ADMIN"
        ) {

            const error = new Error(
                "The administrator role cannot be changed"
            );

            error.statusCode = 403;

            throw error;
        }


        if (
            user.role !== "ADMIN" &&
            !allowedRoles.includes(data.role)
        ) {

            const error = new Error(
                "Invalid user role"
            );

            error.statusCode = 400;

            throw error;
        }


        allowedUpdates.role =
            data.role;
    }


    if (
        data.location !== undefined
    ) {
        allowedUpdates.location =
            data.location;
    }


    const updatedUser =
        await User.findByIdAndUpdate(
            userId,
            allowedUpdates,
            {
                new: true,
                runValidators: true
            }
        ).select("-password");


    return updatedUser;
};


// --------------------------------------------------
// Activate / Deactivate User
// --------------------------------------------------

const updateUserStatus = async (
    userId,
    isActive,
    currentAdminId
) => {

    const user =
        await User.findById(userId);


    if (!user) {

        const error = new Error(
            "User not found"
        );

        error.statusCode = 404;

        throw error;
    }


    // Admin cannot deactivate themselves
    if (
        user._id.toString() ===
        currentAdminId.toString()
    ) {

        const error = new Error(
            "Administrator cannot change their own account status"
        );

        error.statusCode = 403;

        throw error;
    }


    // Administrator cannot be deactivated
    if (
        user.role === "ADMIN"
    ) {

        const error = new Error(
            "Administrator account cannot be deactivated"
        );

        error.statusCode = 403;

        throw error;
    }


    user.isActive = isActive;

    await user.save();


    return user;
};


// --------------------------------------------------
// Delete User
// --------------------------------------------------

const deleteUser = async (
    userId,
    currentAdminId
) => {

    const user =
        await User.findById(userId);


    if (!user) {

        const error = new Error(
            "User not found"
        );

        error.statusCode = 404;

        throw error;
    }


    // Cannot delete yourself
    if (
        user._id.toString() ===
        currentAdminId.toString()
    ) {

        const error = new Error(
            "Administrator cannot delete their own account"
        );

        error.statusCode = 403;

        throw error;
    }


    // Cannot delete the administrator
    if (
        user.role === "ADMIN"
    ) {

        const error = new Error(
            "Administrator account cannot be deleted"
        );

        error.statusCode = 403;

        throw error;
    }


    await User.findByIdAndDelete(
        userId
    );
};


// --------------------------------------------------
// Exports
// --------------------------------------------------

export {
    createAdmin,
    createUserByAdmin,
    getAllUsers,
    getUserById,
    updateUser,
    updateUserStatus,
    deleteUser
};
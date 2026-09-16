import {
    createUserByAdmin,
    getAllUsers,
    getUserById,
    updateUser,
    updateUserStatus,
    deleteUser
} from "../services/user.service.js";


// --------------------------------------------------
// Create User
// --------------------------------------------------

const createUser = (role) => {

    return async (
        req,
        res,
        next
    ) => {

        try {

            const {
                name,
                email,
                password
            } = req.body;


            const user =
                await createUserByAdmin({
                    name,
                    email,
                    password,
                    role
                });


            res.status(201).json({

                success: true,

                message:
                    `${role} created successfully`,

                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    isActive: user.isActive,
                    createdAt: user.createdAt
                }

            });

        } catch (error) {

            next(error);

        }
    };
};


// --------------------------------------------------
// Get All Users
// --------------------------------------------------

const getUsers = async (
    req,
    res,
    next
) => {

    try {

        const {
            role,
            isActive
        } = req.query;


        const users =
            await getAllUsers({
                role,
                isActive
            });


        res.status(200).json({

            success: true,

            count: users.length,

            users

        });

    } catch (error) {

        next(error);

    }
};


// --------------------------------------------------
// Get Single User
// --------------------------------------------------

const getUser = async (
    req,
    res,
    next
) => {

    try {

        const user =
            await getUserById(
                req.params.id
            );


        res.status(200).json({

            success: true,

            user

        });

    } catch (error) {

        next(error);

    }
};


// --------------------------------------------------
// Update User
// --------------------------------------------------

const update = async (
    req,
    res,
    next
) => {

    try {

        const user =
            await updateUser(
                req.params.id,
                req.body,
                req.user._id
            );


        res.status(200).json({

            success: true,

            message:
                "User updated successfully",

            user

        });

    } catch (error) {

        next(error);

    }
};


// --------------------------------------------------
// Change User Status
// --------------------------------------------------

const updateStatus = async (
    req,
    res,
    next
) => {

    try {

        const {
            isActive
        } = req.body;


        if (
            typeof isActive !==
            "boolean"
        ) {

            const error =
                new Error(
                    "isActive must be a boolean"
                );

            error.statusCode = 400;

            throw error;
        }


        const user =
            await updateUserStatus(
                req.params.id,
                isActive,
                req.user._id
            );


        res.status(200).json({

            success: true,

            message:
                isActive
                    ? "User activated successfully"
                    : "User deactivated successfully",

            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                isActive: user.isActive
            }

        });

    } catch (error) {

        next(error);

    }
};


// --------------------------------------------------
// Delete User
// --------------------------------------------------

const remove = async (
    req,
    res,
    next
) => {

    try {

        await deleteUser(
            req.params.id,
            req.user._id
        );


        res.status(200).json({

            success: true,

            message:
                "User deleted successfully"

        });

    } catch (error) {

        next(error);

    }
};


export {
    createUser,
    getUsers,
    getUser,
    update,
    updateStatus,
    remove
};
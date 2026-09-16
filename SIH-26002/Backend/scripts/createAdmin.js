import dotenv from "dotenv";
import mongoose from "mongoose";

import connectDB from "../src/config/db.js";
import User from "../src/models/user.model.js";
import { createAdmin } from "../src/services/user.service.js";


dotenv.config();


const run = async () => {

    try {

        // Connect to MongoDB
        await connectDB();


        // Read admin credentials from environment
        const name = process.env.ADMIN_NAME;
        const email = process.env.ADMIN_EMAIL;
        const password = process.env.ADMIN_PASSWORD;


        // Validate environment variables
        if (!name || !email || !password) {

            throw new Error(
                "ADMIN_NAME, ADMIN_EMAIL and ADMIN_PASSWORD are required in .env"
            );
        }


        // Create the only admin
        const admin = await createAdmin({
            name,
            email,
            password
        });


        console.log("\nAdmin created successfully.\n");

        console.log({
            id: admin._id.toString(),
            name: admin.name,
            email: admin.email,
            role: admin.role
        });


    } catch (error) {

        console.error(
            "\nAdmin creation failed:",
            error.message
        );

        process.exitCode = 1;

    } finally {

        await mongoose.connection.close();

    }
};


run();
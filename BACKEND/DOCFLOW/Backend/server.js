import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { documentRouter } from "./src/routes/document.routes.js";
import connectDB from "./src/config/db.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "API is running"
    });
});
app.use("/api/documents", documentRouter);

const startServer = async () => {
    try {
        await connectDB();

        app.listen(process.env.PORT, () => {
            console.log(`Server running on port ${process.env.PORT}`);
        });

    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

startServer();
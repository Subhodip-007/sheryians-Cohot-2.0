import dotenv from "dotenv";

dotenv.config();


import http from "http";

import app from "./src/app.js";

import connectDB
    from "./src/config/db.js";

import {
    initializeSocket
} from "./src/socket.js";

import {
    startWeatherScheduler
} from "./src/services/weatherScheduler.service.js";
// --------------------------------------------------
// HTTP Server
// --------------------------------------------------

let httpServer;


const PORT =
    process.env.PORT || 3000;


// --------------------------------------------------
// Start Server
// --------------------------------------------------

const startServer = async () => {

    try {

        await connectDB();
       await startWeatherScheduler();

        httpServer =
            http.createServer(
                app
            );


        initializeSocket(
            httpServer
        );


        httpServer.listen(
            PORT,
            () => {

                console.log(
                    `Server running on port ${PORT}`
                );

            }
        );

    } catch (error) {

        console.error(
            "Failed to start server:",
            error.message
        );

        process.exit(1);
    }
};


// --------------------------------------------------
// Graceful Shutdown
// --------------------------------------------------

const shutdown = async () => {

    console.log(
        "Shutting down server..."
    );


    if (!httpServer) {

        process.exit(0);
    }


    httpServer.close(
        async () => {

            console.log(
                "HTTP server closed"
            );


            process.exit(0);

        }
    );
};


// --------------------------------------------------
// Shutdown Signals
// --------------------------------------------------

process.on(
    "SIGTERM",
    shutdown
);

process.on(
    "SIGINT",
    shutdown
);


// --------------------------------------------------
// Start Application
// --------------------------------------------------

startServer();
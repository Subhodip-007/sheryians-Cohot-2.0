import { Server } from "socket.io";


let io;


const initializeSocket = (
    httpServer
) => {

    io = new Server(
        httpServer,
        {
            cors: {
                origin:
                    process.env.CLIENT_URL,

                credentials: true
            }
        }
    );


    io.on(
        "connection",
        (socket) => {

            console.log(
                "Socket connected:",
                socket.id
            );


            socket.on(
                "join-shipment",
                (shipmentId) => {

                    socket.join(
                        `shipment:${shipmentId}`
                    );
                }
            );


            socket.on(
                "disconnect",
                () => {

                    console.log(
                        "Socket disconnected:",
                        socket.id
                    );

                }
            );
        }
    );


    return io;
};


const getIO = () => {

    if (!io) {

        throw new Error(
            "Socket.IO has not been initialized"
        );
    }


    return io;
};


export {
    initializeSocket,
    getIO
};
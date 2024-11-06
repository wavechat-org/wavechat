const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");


// setup socket server
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { 
    cors: {
        origin: "*"
    }
});

io.on("connection", (socket) => {
    console.log("user connected", socket.id);

    if(socket.handshake.auth) {
        console.log('username: ' + socket.handshake.auth.username);
    }

    socket.on("message:new", (message) => {
        // emit ke client
        io.emit("message:update", {
            from: socket.handshake.auth.username,
            message
        });
    });

    // jika user disconnect
    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);
    });
});

const port = 3000;
httpServer.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require("express");
const app = express();
const router = require("./routers/index");

const cors = require("cors");
const { createServer } = require("http");

const port = process.env.PORT || 3000;
// const corsOrigin = process.env.CORS_ORIGIN || "http://localhost:5173";
const corsOrigin = ['http://localhost:5173', 'https://wavechat-gules.vercel.app'];

const { Server } = require("socket.io");

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: corsOrigin,
    // origin: ['http://localhost:5173', 'https://wavechat-gules.vercel.app'];
  },
});

// Use CORS middleware for the Express app
// app.use(cors());
app.use(cors({
  origin: corsOrigin,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.emit("welcome", "Hello " + socket.id);

  socket.on("join:room", (roomId) => {
    socket.join(roomId);
    console.log(`Joined room : ${roomId}`);
  });


  socket.on("message:new", ({ roomId, message, username }) => {
    console.log("Received message:", { roomId, message, username });
    if (!roomId || !message) {
      console.log('Invalid message data:', { roomId, message })
      return;
    }
    // Emit the new message to all clients in the specified roomId
    io.to(roomId).emit("message:update", {
      from: username || "Anonymous",
      message,
    });

    console.log(`Message from ${username || "Anonymous"} in roomId ${roomId}: ${message}`);
  });

  if (socket.handshake.auth) {
    console.log("username :" + socket.handshake.auth.username);
  }

  // cleanup when socket disconnects
  socket.on('disconnect', () => {
    console.log(`Socket ${socket.id} disconnected`);
  })

});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

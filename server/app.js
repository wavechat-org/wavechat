const express = require("express");
const { createServer } = require("http");
const app = express();
const router = require("./routers/index");
const port = 3000;
const { Server } = require("socket.io");
const cors = require("cors");

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.emit("welcome", "haii" + socket.id);

  socket.on("join:room", (roomId) => {
    socket.join(roomId);
    // console.log(roomId, "ini join ");
  });

  socket.on("message:new", ({ roomId, message, username }) => {
    if (roomId || message) {
      // Emit the new message to all clients in the specified roomId
      io.to(roomId).emit("message:update", {
        from: username || "Anonymous",
        message,
      });
      console.log(
        `Message from ${
          socket.handshake.auth.username || "Anonymous"
        } in roomId ${roomId}: ${message}`
      );
    } else {
      console.log("Invalid message data received:", { roomId, message });
    }
  });

  if (socket.handshake.auth) {
    console.log("username :" + socket.handshake.auth.username);
  }
  return () => {
    socket.off("message:update");
    socket.disconnect();
  };
  // socket.on("")
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

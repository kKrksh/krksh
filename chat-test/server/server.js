const io = require("socket.io")(3000, {
  cors: {
    origin: ["http://127.0.0.1:5500"],
  },
});

io.on("connection", (socket) => {
  console.log(`\x1b[33mClient connected with id \x1b[34m${socket.id}\x1b[0m`);
  //console.log("\x1b[32m%s\x1b[0m", `${socket.id} joined room ${room}`);
});

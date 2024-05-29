const io  = require('socket.io')(3000, {
  cors: {
    origin: ["http://localhost:8080","http://localhost:8081","http://localhost:8082"]
  }
})

io.on('connection', socket => {
  console.log(socket.id)
  socket.on('send', (message,room) => {
    if (room === ''){
      socket.broadcast.emit('recieve', message, false)
      console.log(`global message: ${message}`)
    } else{
      socket.to(room).emit('recieve', message, false)
      console.log(`private message to room ${room}, message: ${message}`)
    }
  })
  socket.on('join', room => {
    socket.join(room)
  }) 
})
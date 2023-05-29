const { Server } = require("socket.io");
const io = new Server({ cors: "http://localhost:5173" });

let onlineUser = [];

io.on("connection", (socket) => {
  console.log("New connection", socket.id);

  // listen to a connection
  socket.on("add new user", (userId) => {
    console.log(userId);
    !(onlineUser.some((user) => user.userId === userId) || userId == null) &&
      onlineUser.push({
        userId: userId,
        socketId: socket.id,
      });
    console.log("Online user", onlineUser);

    io.emit("get online user", onlineUser);
  });

    //add message
    socket.on("send message", (message)=>{
        console.log(onlineUser)
        console.log(message.recipientId)
        const user = onlineUser.find((user) => user.userId == message.recipientID)
        console.log(user)
        if(user){
            console.log("update")
            io.to(user.socketId).emit("get message", message)
        }
    })
    socket.on("disconnect",()=>{
        onlineUser = onlineUser.filter(user => user.socketId !== socket.id )
        io.emit("get online user", onlineUser)
    })
});

io.listen(3000);


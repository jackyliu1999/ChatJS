const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');

const{ addUser, removeUser, getUser, getUsersInRoom } = require("./users.js")

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on("connection", (socket) => {
    socket.on("join", ({name,room}, callback)=>{
        const { error, user } = addUser({id:socket.id, name, room});
        if(error) return callback(error);
        socket.emit("message", {user:"Admin", text:`Hello ${user.name}! Welcome to the chatroom: ${user.room}`});
        socket.broadcast.to(user.room).emit("message", { user:"Admin", text: `${user.name} has joined the chatroom.`});
        socket.join(user.room);
        callback();
    })
    socket.on("sendMessage", (message, callback)=>{
        const user = getUser(socket.id);
        io.to(user.room).emit("message", {user:user.name, text:message});
        callback();
    });
    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
    
        if(user) {
          io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left the room.` });
        }
      })
    
});



app.use(router);

server.listen(process.env.PORT || 8000, () => console.log(`Server has started.`));
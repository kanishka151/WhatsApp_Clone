// Node server which will handle socket io connections 
const io= require ('socket.io')(8000)

const users = {};

io.on('connection', socket =>{      //io.on connect the user with website
    socket.on('new-user-joined', name =>{ // socket.on perforn the action on the connnected user
        //console.log("New user", name)  
        users[socket.id]=name;
        socket.broadcast.emit('user-joined', name); // broadcast the connected user name
        }) ;
        socket.on('send', message =>{
            socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
        });
        //If someone leaves the chat, let the others know
        socket.on('disconnect',message=>{
            socket.broadcast.emit('left',users[socket.id]);
            delete users[socket.id];
        });
})





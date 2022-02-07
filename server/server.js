const app = require("express")();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const cors = require("cors")


app.use(cors());

// opne socket connection
io.on('connection', (socket) => {
    console.log('User online');
    socket.on('canvas-data', (data) => {
        socket.broadcast.emit('canvas-data', data)
    })
})

const server_port = process.env.MY_PORT || process.env.PORT || 5000;

http.listen(server_port, () => {
    console.log("Server started on " + server_port)
})
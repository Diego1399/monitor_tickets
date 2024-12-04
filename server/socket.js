import {Server} from 'socket.io'

export const initSocket = (server) => {

    const io = new Server(server, {cors:{origin:"*"}});

    io.on("connection", (socket) => {
        console.log("Nueva conexion")
    
        socket.on('message', (msg) => {
            console.log(`Mensaje recibido: ${msg}`);
            io.emit('message', msg);
        });
    
        socket.on('disconnect', () => {
            console.log('Un usuario se ha desconectado');
        });
    
    });

    return io;
};
import {Server} from 'socket.io'
import {MockDatabase} from '../database/mockdb.js'

export const initSocket = (server) => {

    const io = new Server(server, {cors:{origin:"*"}});

    io.on("connection", (socket) => {

        console.log("Conexion establecida")
    
        socket.on('message', (msg) => {
            console.log(`Mensaje recibido: ${msg}`);
            io.emit('message', msg);
        });

        socket.on('get-tickets-list', (data) => {
            console.log(`Solicitud tickets para el usuario ID: ${data}`)
            
            const tickets = MockDatabase.tickets.find(ticket => ticket.assiggnedTo === data);


            console.log(typeof(tickets))
            socket.emit('user-ticket-list', tickets)

        })
    
        socket.on('disconnect', () => {
            console.log('Un usuario se ha desconectado');
        });
    
    });

    return io;
};
import { Server } from 'socket.io'
import { methods as controllers } from '../controllers/ticket.controller.js'

export const initSocket = (server) => {

    const io = new Server(server, { cors: { origin: "*" } });

    io.on("connection", (socket) => {

        console.log("Conexion establecida")

        socket.on('message', (msg) => {
            console.log(`Mensaje recibido: ${msg}`);
            io.emit('message', msg);
        });

        socket.on('get-tickets-list', async (data) => {
            try {
                console.log(`Solicitud tickets para el usuario ID: ${data}`)

                const tickets = await controllers.getTickets(data)

                console.log(typeof (tickets))
                socket.emit('user-ticket-list', tickets)
            } catch (error) {
                console.error('Error al obtener tickets: ', error.message);
                socket.emit('error', {message: error.message})
            }

        })

        socket.on('disconnect', () => {
            console.log('Un usuario se ha desconectado');
        });

    });

    return io;
};
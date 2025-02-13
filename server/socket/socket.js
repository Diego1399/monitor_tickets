import { Server } from 'socket.io'
import { methods as controllers } from '../controllers/ticket.controller.js'

// Inicializa el servidor de Socket.IO
export const initSocket = (server) => {

    // Crea una nueva instancia de Socket.IO con configuración CORS
    const io = new Server(server, { cors: { origin: "*" } });

    // Maneja el evento de conexión de un cliente
    io.on("connection", (socket) => {

        //console.log("Conexion establecida")

        // Maneja el evento 'message' enviado por el cliente
        socket.on('message', (msg) => {
            console.log(`Mensaje recibido: ${msg}`);
            // Emite el mensaje a todos los clientes conectados
            io.emit('message', msg);
        });

        // Maneja el evento 'get-tickets-list' para obtener la lista de tickets de un usuario
        socket.on('get-tickets-list', async (data) => {
            try {
                console.log(`Solicitud tickets para el usuario ID: ${data}`)
                // Llama al controlador para obtener los tickets del usuario
                const tickets = await controllers.getTickets(data)
                // Envía la lista de tickets al cliente que hizo la solicitud
                socket.emit('user-ticket-list', tickets)
            } catch (error) {
                console.error('Error al obtener tickets: ', error.message);
                // Envía un mensaje de error al cliente en caso de fallo
                socket.emit('error', { message: error.message })
            }
        })

        // Maneja el evento 'chat' para crear un nuevo mensaje en un ticket
        socket.on('chat', async (data) => {
            try {
                // Llama al controlador para crear un nuevo mensaje
                const chat = await controllers.createMessage(data)
                // Emite el nuevo mensaje a todos los clientes conectados
                io.emit('chat', data)
            } catch (error) {
                console.error('Error al crear chat: ', error.message);
                // Envía un mensaje de error al cliente en caso de fallo
                socket.emit('error', { message: error.message })
            }
        })

        // Maneja el evento de desconexión de un cliente
        socket.on('disconnect', () => {
            console.log('Un usuario se ha desconectado');
        });

    });

    return io;
};
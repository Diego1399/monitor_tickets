import express from 'express'
import logger from 'morgan'
import cors from 'cors'
import { createServer } from 'node:http'
import { initSocket } from './socket/socket.js'

import { MockDatabase } from './database/mockdb.js'
import { methods as controllers } from './controllers/ticket.controller.js'

const app = express();

// Middleware para parsear JSON
app.use(express.json());
// Middleware para registrar solicitudes HTTP
app.use(logger('dev'));
// Middleware para habilitar CORS
app.use(cors())

const port = process.env.port || 3000;
const server = createServer(app);

// Inicializa el servidor de Socket.IO
initSocket(server);

// Inicia el servidor en el puerto especificado
server.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

// Ruta para el login
app.post('/login', async (req, res) => {
    try {
        // Obtiene la lista de usuarios
        let userList = await controllers.getUsers();
        let newData = req.body;
        // Busca el usuario que coincide con el nombre de usuario y la contraseña proporcionados
        let user_logged = userList.find(user => {
            const keys = Object.keys(user);
            const usernameMatch = keys.some(key => user[key] === newData.username);
            const passwordMatch = keys.some(key => user[key] === newData.password);
            if (usernameMatch && passwordMatch) return user;
        });
        if (user_logged) {
            return res.status(200).json(user_logged)
        } else {
            return res.status(404).json({ error: "User not found" })
        }
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message);
    }
})

// Ruta para obtener el historial de chat
app.post('/historialChat', async ( req, res) => {
    try {
        const data = req.body
        // Obtiene el historial de chat del controlador
        let chats = await controllers.getChat(data)
        return res.status(200).json(chats)
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message);
    }
})

// Ruta para obtener todos los usuarios
app.get('/getUsers', controllers.getUsers);
// Ruta para obtener la lista de usuarios excluyendo un usuario específico
app.get('/UsersList/:id', controllers.getUserList);
// Ruta para crear un nuevo ticket
app.post('/createTicket', controllers.createTicket);
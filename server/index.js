import express from 'express'
import logger from 'morgan'
import cors from 'cors'
import { createServer } from 'node:http'
import { initSocket } from './socket/socket.js'

import { MockDatabase } from './database/mockdb.js'
import { methods as controllers } from './controllers/ticket.controller.js'

const app = express();

app.use(express.json());
app.use(logger('dev'));
app.use(cors())

const port = process.env.port || 3000;
const server = createServer(app);

initSocket(server);

server.listen(port, () => {
    console.log(`Server running on port ${port}`)
})


app.post('/login', (req, res) => {

    let usuario = MockDatabase.user

    let login = req.body

    let encontrado = usuario.find(u => u.username === login.username && u.password === login.password);

    if (encontrado) {
        return res.status(200).json(encontrado)

    } else {
        return res.status(404).json({ error: "username no existe" })
    }
})

app.get('/getUsers', controllers.getUsers);
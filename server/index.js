import express from 'express'
import logger from 'morgan'
import cors from 'cors'
import {createServer} from 'node:http'
import {Server} from 'socket.io'

const app = express();
const server = createServer(app);
const io = new Server(server, {cors:{origin:"*"}});

app.use(express.json());
app.use(logger('dev'));
app.use(cors())

const port = process.env.port || 3000;

server.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

io.on("connection", (socket) => {
    console.log("Nueva conexion")

    socket.on('message', (msg) => {
        console.log(`Mensaje recibido: ${msg}`);
        io.emit('message', msg);
    });

    socket.on('disconnect', () => {
        console.log('Un usuario se ha desconectado');
    });

})

app.post('/login', (req, res) => {

    let usuario = [
        {
            "username": "admi01",
            "password": "admi123"
        },
        {
            "username": "admi02",
            "password": "admi456"
        }
    ]

    let login = req.body

    let encontrado = usuario.find(u => u.username === login.username && u.password  ===  login.password);

    if (encontrado) {
        return res.status(200).json(encontrado)

    } else {
        return res.status(404).json({error:  "username no existe"})
    }
})

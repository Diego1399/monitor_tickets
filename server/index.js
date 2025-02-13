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

app.post('/login', async (req, res) => {
    try {
        let userList = await controllers.getUsers();
        let newData = req.body;
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


//app.get('/tickets/:id', controllers.getTickets)


app.get('/getUsers', controllers.getUsers);
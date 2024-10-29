import express from 'express'
import logger from 'morgan'
import cors from 'cors'

const app = express();

app.use(express.json());
app.use(logger('dev'));
app.use(cors())

const port = process.env.port || 3000;

let chat = [];

app.get('/', (req, res) => {
    res.status(200).send('Funciona')
})

app.get('/ticket', (req, res) => {

    let date = new Date()
    let fecha_e = date.toLocaleString();
    let sla = 5;

    

    let fecha_s = new Date(date.setHours(date.getHours() + 5));

    console.log(fecha_s)

    res.send({
        subject: "Asunto del ticket Test01",
        description: "Descripcion del ticket Descripcion del ticket Descripcion del ticket",
        status: "Abierto",
        numero: "000001",
        specialist: "Especialista01",
        user: 'Usuario01',
        Fecha_estimada: fecha_e,
        fecha_solucion: fecha_s.toLocaleString(),
    })
})

app.get('/chat', (req, res) => {
    chat.push(req.body)
    res.send(chat)
})


app.post('/addMensaje', (req, res) => {
    console.log(req.body)
    res.send({Funciona: "200"})
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

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

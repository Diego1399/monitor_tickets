import { getConnection } from "../database/database.js";

// Obtiene una conexión a la base de datos
const connection = await getConnection()

// Función para obtener todos los usuarios
const getUsers = async () => {
    try {
        // Realiza una consulta a la base de datos para obtener los usuarios
        const [result] = await (await getConnection())
            .query('select id, aranda_user_id, username, email, password_hash, role from users');
        console.table(result)
        
        return result
    } catch (error) {
        console.error('Error al obtener usuarios:', error.message);
        throw new Error('Error al obtener usuarios');
    }
}

// Función para obtener los tickets de un usuario específico
const getTickets = async (data) => {
    try {
        // Realiza una consulta a la base de datos para obtener los tickets del usuario
        const [tickets] = await connection.query('SELECT * FROM ticket_view where user_id = ?', [data]);
        console.table(tickets)
        return tickets
    } catch (error) {
        console.error('Error al obtener los tickets:', error.message);
        throw new Error('Error al obtener los tickets');
    }
}

// Función para obtener la lista de usuarios excluyendo un usuario específico
const getUserList = async (req, res) => {
    try {
        const data  = req.params;
        // Verifica si el parámetro requerido existe 
        if (!data) return res.status(400).json({error: "No existe parametro requerido"})
        // Realiza una consulta a la base de datos para obtener la lista de usuarios
        const [result] = await connection.query('select aranda_user_id, username from users where aranda_user_id != ?', [data.id]);
        return res.status(200).json(result)
    } catch (error) {
        console.error('Error al obtener lista de usuarios: ', error.message);
        throw new Error('Error al obtener usuarios');
    }
}

// Función para crear un nuevo ticket
const createTicket = async (req, res) => {
    try {
        const data = req.body;
        console.log(data.subject)
        // Llama al procedimiento almacenado 'create_ticket' para crear un nuevo ticket
        const [result] = await connection.query('call create_ticket(?,?,?,?,?)',
            [
                data.subject,
                data.description,
                data.status,
                parseInt(data.specialistId),
                parseInt(data.userId)
            ]
        )
        return res.status(200).json({message: "Ticket creado con exito"})
    } catch (error) {
        console.error('Error al crear ticket: ', error.message);
        return res.status(400).json({error: `Error al crear ticket ${error.message}`});
    }
}

// Función para obtener el historial de chat de un ticket específico
const getChat = async (ticket) => {
    try {
        // Realiza una consulta a la base de datos para obtener el historial de chat del ticket
        const [result] =  await connection.query('select * from historial_chat where id_ticket = ?', [ticket.data])
        return result
    } catch (error) {
        console.error('Error al obtener lista de chats: ', error.message);
        return res.status(400).json(error.message)
    }
}

// Función para crear un nuevo mensaje en un ticket
const createMessage = async (data) => {
    try {
        console.log(data)
        // Inserta un nuevo mensaje en la base de datos
        const [result] = await connection.query('INSERT INTO message (id_ticket, id_usuario, message) VALUES (?, ?,?)',
            [
                parseInt(data.ticket),
                parseInt(data.user),
                data.text
            ]
        )
        return result
    } catch (error) {
        console.error('Error al crear un mensaje: ', error.message)
        throw new Error('Error al crear chat');
    }
}

// Exporta los métodos para que puedan ser utilizados en otras partes de la aplicación
export const methods = {
    getUsers,
    getTickets,
    getUserList,
    createTicket,
    createMessage,
    getChat
};
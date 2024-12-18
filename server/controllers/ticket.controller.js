import { getConnection } from "../database/database.js";

const getUsers = async () => {
    try {
        const [result] = await (await getConnection())
            .query('select id, aranda_user_id, username, email, password_hash, role from users');
        console.table(result)
        return result
    } catch (error) {
        /*
        console.log(error)
        res.status(500).send(error.message);
        */
        console.error('Error al obtener usuarios:', error.message);
        throw new Error('Error al obtener usuarios');
    }
}

const getTickets = async (data) => {
    try {
        const [tickets] = await (await getConnection())
            .query('SELECT * FROM ticket_view where user_id = ?', [data]);
        console.table(tickets)
        return tickets
    } catch (error) {
        console.error('Error al obtener los tickets:', error.message);
        throw new Error('Error al obtener los tickets');
    }
}

export const methods = {
    getUsers,
    getTickets
};

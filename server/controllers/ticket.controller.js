import  {getConnection } from "../database/database.js";

const getUsers = async (req, res) => {
    try {
        const [result] = await (await getConnection()).query('select id, aranda_user_id, username, email, password_hash, role from users');
        console.table(result)
        res.json(result)
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message);
    }
}

export const methods = {
    getUsers
};

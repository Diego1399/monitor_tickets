//import mysql from "mysql2/promise"; 
import config from "../config.js"; 
import { createPool} from 'mysql2/promise'

export const getConnection = async () => {

    try {
        const connection = createPool({
            host: config.host,
            user: config.user,
            port: config.port,
            password: config.password,
            database: config.database
        });

        return connection; 
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        throw error; 
    }
};
import mysql from 'mysql2/promise';

// Função que cria a conexão com o banco de dados
export default async function conectar() 
{
    const pool = mysql.createPool({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '',
        database: 'bancoaurum',
        waitForConnections: true,
        connectionLimit: 10,
        maxIdle: 10,
        idleTimeout: 60000,
        queueLimit: 0,
        enableKeepAlive: true,
        keepAliveInitialDelay: 0
    });
    return await pool.getConnection();
}

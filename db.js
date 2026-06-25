// =============================================
// CONEXIÓN A BASE DE DATOS - PostgreSQL
// =============================================
// Este archivo configura la conexión a la base de datos.
// Funciona tanto en desarrollo local como en Render (la nube).
// 
// En local usa las credenciales del archivo .env
// En Render usa la variable DATABASE_URL que se asigna automáticamente

const { Pool } = require('pg');
require('dotenv').config(); // Carga las variables del archivo .env

// Crear el pool de conexiones a PostgreSQL
const pool = new Pool(
    // Si existe DATABASE_URL (en Render) → usa conexión con SSL
    // Si no existe (en local) → usa credenciales individuales del .env
    process.env.DATABASE_URL
        ? {
            connectionString: process.env.DATABASE_URL,
            ssl: { rejectUnauthorized: false } // SSL necesario para Render
        }
        : {
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            password: process.env.DB_PASSWORD,
            port: process.env.DB_PORT || 5432
        }
);

module.exports = pool;

import mysql from 'mysql2';

export const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'jamesrainier123',
    database: 'videoke_delivery',
    connectionLimit: 10
});

export const db = pool.promise();

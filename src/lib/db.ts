/**
 * db.ts — Antocarz
 * Pool de conexiones MySQL para consultas en build-time.
 * Credenciales via variables de entorno (.env).
 */

import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host:     import.meta.env.DB_HOST     || 'localhost',
  port:     parseInt(import.meta.env.DB_PORT || '3306'),
  user:     import.meta.env.DB_USER     || 'root',
  password: import.meta.env.DB_PASS     || '',
  database: import.meta.env.DB_NAME     || 'antocarz',
  waitForConnections: true,
  connectionLimit: 5,
  charset: 'utf8',
});

export default pool;

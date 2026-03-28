import mysql from 'mysql2/promise';

const dbConfig = {
  host: process.env.DB_HOST ?? import.meta.env.DB_HOST,
  user: process.env.DB_USER ?? import.meta.env.DB_USER,
  password: process.env.DB_PASS ?? import.meta.env.DB_PASS,
  database: process.env.DB_NAME ?? import.meta.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false
  }
};

export async function query(sql: string, params: any[] = []) {
  const connection = await mysql.createConnection(dbConfig);
  try {
    const [results] = await connection.execute(sql, params);
    return results;
  } finally {
    await connection.end();
  }
}

import mysql from 'mysql2/promise';

const dbConfig = {
  host: import.meta.env.DB_HOST,
  user: import.meta.env.DB_USER,
  password: import.meta.env.DB_PASS,
  database: import.meta.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false // Para manejar conexiones remotas que no tengan certificados SSL configurados
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

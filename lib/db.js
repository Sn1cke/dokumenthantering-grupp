import mysql from "mysql2/promise";

export default async function dbQuery({ sql, values }) {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  try {
    const [data] = await connection.execute(sql, values);
    return data;
  } catch (error) {
    throw error;
  } finally {
    connection.end();
  }
}

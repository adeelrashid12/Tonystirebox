import mysql from 'mysql2/promise';

// cPanel MySQL Configuration
export const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'tonystir_user',
  password: process.env.DB_PASSWORD || 'A55q?QkR',
  database: process.env.DB_NAME || 'tonystir_inventory',
};

export async function getDbConnection() {
  try {
    const connection = await mysql.createConnection(dbConfig);
    return connection;
  } catch (error) {
    console.error('MySQL connection error:', error);
    throw error;
  }
}

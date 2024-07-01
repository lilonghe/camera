import mysql, { PoolOptions } from "mysql2/promise";

const access: PoolOptions = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
};
const conn = mysql.createPool(access);

export default conn;

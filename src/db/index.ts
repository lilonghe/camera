import mysql, { PoolOptions } from "mysql2/promise";

const access: PoolOptions = {
  user: "root",
  password: "123456",
  database: "cameras",
};
const conn = mysql.createPool(access);

export default conn;

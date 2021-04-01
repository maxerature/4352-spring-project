import { createPool } from "mysql2";

var MySQL = createPool({
  host: "localhost",
  user: "root",
  password: "password",
  port: 3306,
  database: "sys",
});

export default MySQL;

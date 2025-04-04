const sql = require("mssql");
const path = require("path"); // Import the path module
require("dotenv").config();
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const config = {
  user: process.env.DB_USER,
  password: process.env.SA_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

console.log("config", config);

const testConnection = async () => {
  try {
    const pool = await new sql.ConnectionPool(config).connect();
    console.log("Successfully connected to MSSQL using mssql package!");
  } catch (err) {
    console.error("MSSQL connection error: ", err);
  }
};

testConnection();

module.exports = {
  sql,
};
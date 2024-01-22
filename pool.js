const { Pool } = require("pg");

//mude esta variavel de acordo com as suas configuracoes
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + "?sslmode=require"
});

module.exports = pool;

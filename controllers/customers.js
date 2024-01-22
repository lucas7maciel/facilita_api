const pool = require("../pool");

function getAll(req, res) {
  pool.query("SELECT * FROM customers ORDER BY id desc", (error, results) => {
    if (error) throw error

    res.status(200).json(results.rows);
  });
}

//Cria o comando select que será usado na pesquisa de acordo com seus filtros
function searchComm(name, email, phone) {
  const notNulls = [name, email, phone].filter((field) => field).length;

  let comm =
    `SELECT * FROM customers WHERE ` +
    `${name ? "name ILIKE '%'||$1||'%'" : ""} ${
      name && notNulls > 1 ? "OR" : ""
    } ` +
    `${email ? "email ILIKE '%'||$1||'%'" : ""} ${
      notNulls == 3 || (email && phone) ? "OR" : ""
    } ` +
    `${phone ? "phone ILIKE '%'||$1||'%'" : ""}`;

  return comm;
}

function search(req, res) {
  const { search } = req.params;
  const { name, email, phone } = req.query;
  const comm = searchComm(name || true, email || true, phone || true);

  pool.query(comm, [search], (error, result) => {
    if (error) throw error;

    res.status(200).send(result.rows);
  });
}

function add(req, res) {
  const { name, email, phone, x_location, y_location } = req.body;

  pool.query(
    "INSERT INTO customers (name, email, phone, x_location, y_location) VALUES ($1, $2, $3, $4, $5)",
    [name.toUpperCase(), email, phone, x_location, y_location],
    (error) => {
      if (error) throw error;

      res.status(201).json({
        message: "Cleinte adicionado com sucesso!",
        data: { name, email, phone, x_location, y_location },
      });
    }
  );
}

function alter(req, res) {
  const { id, name, email, phone, x_location, y_location } = req.body;

  pool.query(
    "UPDATE customers SET name = $1, email = $2, phone = $3, x_location = $4, y_location = $5 WHERE id = $6",
    [name.toUpperCase(), email, phone, x_location, y_location, id],
    (error) => {
      if (error) throw error;

      res.status(200).json({
        message: `Cliente editado com sucesso!`,
        data: { name, email, phone, x_location, y_location },
      });
    }
  );
}

function del(req, res) {
  const { id } = req.body;

  pool.query("DELETE FROM customers WHERE id = $1", [id], (error) => {
    if (error) throw error;

    res.status(200).json({
      message: `Cliente deletado!`,
    });
  });
}

module.exports = (app) => ({ getAll, search, add, alter, del});

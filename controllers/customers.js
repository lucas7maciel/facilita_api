const pool = require("../pool"); //ver se dá pra usar caminho por source

function getAll(req, res) {
  pool.query("SELECT * FROM customers ORDER BY id desc", (error, results) => {
    if (error) {
      res.status(404);
      return;
    }

    res.status(200).json(results.rows);
  });
}

//search
function searchComm(name, email, phone) {
  const notNulls = [name, email, phone].filter((field) => field).length;

  //formatar certinho
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

//
function add(req, res) {
  const { name, email, phone } = req.body;

  //mensagens de erro
  pool.query(
    "INSERT INTO customers (name, email, phone) VALUES ($1, $2, $3)",
    [name.toUpperCase(), email, phone],
    (error) => {
      if (error) throw error;

      res.status(201).json({
        message: "Success",
        data: { name, email, phone },
      });
    }
  );
}

function alter(req, res) {
  const { id, name, email, phone } = req.body;

  //ajeitar pra args especificos
  pool.query(
    "UPDATE customers SET name = $1, email = $2, phone = $3 WHERE id = $4",
    [name.toUpperCase(), email, phone, id],
    (error, result) => {
      if (error) throw error;

      res.status(200).json({
        message: `Customer succesfully updated, id = ${id}`,
        data: { name, email, phone },
      });
    }
  );
}

function del(req, res) {
  const { id } = req.body;

  //mensagens de erro
  pool.query("DELETE FROM customers WHERE id = $1", [id], (error) => {
    if (error) throw error;

    res.status(200).json({
      message: `User succesfully delted, id = ${id}`,
    });
  });
}

//findpath
function getDistance(yourLoc, loc) {
  //return distance between two cord
  if (yourLoc.x_location == loc.x_location) {
    return Math.abs(yourLoc.y_location - loc.y_location);
  }

  if (yourLoc.y_location == loc.y_location) {
    return Math.abs(yourLoc.x_location - loc.x_location);
  }

  let x_distance = Math.abs(yourLoc.x_location - loc.x_location);
  let y_distance = Math.abs(yourLoc.y_location - loc.y_location);

  let distance = Math.pow(x_distance, 2) + Math.pow(y_distance, 2);
  distance = Math.pow(distance, 0.5);

  return distance;
}

function findPath(req, res) {
  pool.query(
    "SELECT id, x_location, y_location FROM customers",
    [],
    (error, results) => {
      if (error) throw error;

      let locations = results.rows;
      let nextMove,
        locIndex,
        path = [];

      let myLoc = {
        x_location: 0,
        y_location: 0,
      };

      let total = 0

      //finds closer
      while (locations.length > 0) {
        locIndexndex = null;
        nextMove = {};

        locations.forEach((loc, index) => {
          const distance = getDistance(myLoc, loc);

          if (distance < nextMove.distance || !nextMove.distance) {
            nextMove.id = loc.id;
            nextMove.x_location = loc.x_location;
            nextMove.y_location = loc.y_location;
            nextMove.distance = distance;

            locIndex = index;
          }
        });

        myLoc.x_location = nextMove.x_location;
        myLoc.y_location = nextMove.y_location;
        total += nextMove.distance
        
        locations.splice(locIndex, 1)
        path.push(nextMove);
      }

      res.status(200).json({total, path
      });
    }
  );
}

module.exports = (app) => ({ getAll, search, add, alter, del, findPath });

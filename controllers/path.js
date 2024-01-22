
const pool = require("../pool")

//retorna a distancia entre duas coordenadas utilizando o teorema de pitagoras
function getDistance(yourLoc, loc) {
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

      let total = 0;

      //cada instancia do loop ira descobrir um movimento
      while (locations.length > 0) {
        locIndexndex = null;
        nextMove = {};

        //encontra o ponto não visitado mais próximo
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

        //muda a coordenada atual e retira o cliente visitado do caminho
        myLoc.x_location = nextMove.x_location;
        myLoc.y_location = nextMove.y_location;
        total += nextMove.distance;

        locations.splice(locIndex, 1);
        path.push(nextMove);
      }

      res.status(200).json({ total, path });
    }
  );
}

module.exports = (app) => ({findPath})

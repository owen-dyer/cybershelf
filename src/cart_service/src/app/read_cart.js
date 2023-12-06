const db = require("../database/init");
const { cart } = require("../database/sql");

const readCart = async (user_id, callback) => {
  console.log(user_id);

  await db
    .manyOrNone(cart.read)
    .then((cart) => {
      console.log(cart);
      callback({
        message: "Query successful",
      });
    })
    .catch((err) => {
      console.log(err);
      callback({
        message: "Query failed",
      });
    });
};

module.exports = readCart;

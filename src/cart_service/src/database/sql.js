const { PreparedStatement: PS } = require("pg-promise");

const cartByUserId = new PS({
  name: "cart-by-user-id",
  text: `SELECT id FROM cart WHERE user_id=$1`,
});

const read = new PS({
  name: "read-cart",
  text: `SELECT product_id, price, quantity FROM cart_item WHERE cart_id=$1 ORDER BY product_id;`,
});

const create = new PS({
  name: "create-cart",
  text: `INSERT INTO cart (user_id) VALUES ($1) RETURNING id;`,
});

const add = new PS({
  name: "add-to-cart",
  text: `INSERT INTO cart_item (cart_id, product_id, price, quantity) VALUES ($1, $2, $3, $4) RETURNING price, quantity;`,
});

const remove = new PS({
  name: "remove-from-cart",
  text: `DELETE FROM cart_item WHERE cart_id=($1) AND product_id=($2);`,
});

const updateTotalPrice = new PS({
  name: "update-total-price",
  text: "UPDATE cart SET total_price = total_price + $1 RETURNING total_price;",
});

module.exports = {
  cart: {
    cartByUserId,
    cartByUserId,
    read,
    add,
    create,
    remove,
    updateTotalPrice,
  },
};

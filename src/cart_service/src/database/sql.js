const { PreparedStatement: PS } = require("pg-promise");

const cartByUserId = new PS({
  name: "cart-by-user-id",
  text: `SELECT id FROM cart WHERE user_id=$1`,
});

// const read = new PS({
//   name: "read-cart",
//   text: `SELECT
//             cart.total_price,
//             cart_item.product_id,
//             cart_item.price,
//             cart_item.quantity,
//             cart_item.created_at
//         FROM
//             cart
//             INNER JOIN cart_item ON cart.id = cart_item.cart_id
//         ORDER BY
//             'TimeStamp';`,
// });

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

module.exports = {
  cart: {
    cartByUserId,
    read,
    add,
    create,
  },
};

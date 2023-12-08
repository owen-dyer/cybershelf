const { PreparedStatement: PS } = require("pg-promise");

const cartByUserId = new PS({
  name: "cart-by-user-id",
<<<<<<< HEAD
  text: `SELECT id FROM cart WHERE user_id=$1`,
=======
  text: `SELECT id, total_price FROM cart WHERE user_id=$1`,
>>>>>>> main
});

const read = new PS({
  name: "read-cart",
<<<<<<< HEAD
  text: `SELECT product_id, price, quantity FROM cart_item WHERE cart_id=$1 ORDER BY product_id;`,
=======
  text: `SELECT listing_id, price, quantity FROM cart_item WHERE cart_id=$1 ORDER BY listing_id;`,
>>>>>>> main
});

const create = new PS({
  name: "create-cart",
  text: `INSERT INTO cart (user_id) VALUES ($1) RETURNING id;`,
});

const add = new PS({
  name: "add-to-cart",
<<<<<<< HEAD
  text: `INSERT INTO cart_item (cart_id, product_id, price, quantity) VALUES ($1, $2, $3, $4) RETURNING price, quantity;`,
=======
  text: `INSERT INTO cart_item (cart_id, listing_id, price, quantity) VALUES ($1, $2, $3, $4) RETURNING price, quantity;`,
>>>>>>> main
});

const remove = new PS({
  name: "remove-from-cart",
<<<<<<< HEAD
  text: `DELETE FROM cart_item WHERE cart_id=($1) AND product_id=($2);`,
=======
  text: `DELETE FROM cart_item WHERE cart_id=($1) AND listing_id=($2);`,
>>>>>>> main
});

const updateTotalPrice = new PS({
  name: "update-total-price",
<<<<<<< HEAD
  text: "UPDATE cart SET total_price = total_price + $1 RETURNING total_price;",
=======
  text: "UPDATE cart SET total_price=total_price+($2) WHERE id=($1) RETURNING total_price;",
>>>>>>> main
});

module.exports = {
  cart: {
    cartByUserId,
<<<<<<< HEAD
    cartByUserId,
=======
>>>>>>> main
    read,
    add,
    create,
    remove,
    updateTotalPrice,
  },
};

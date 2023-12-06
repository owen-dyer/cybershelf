const { PreparedStatement: PS } = require("pg-promise");

const read = new PS({
  name: "read-cart",
  text: `SELECT
            cart.total_price,
            cart_item.product_id,
            cart_item.price,
            cart_item.quantity,
            cart_item.created_at
        FROM
            cart
            INNER JOIN cart_item ON cart.id = cart_item.cart_id
        ORDER BY
            'TimeStamp';`,
});

module.exports = {
  cart: {
    read,
  },
};

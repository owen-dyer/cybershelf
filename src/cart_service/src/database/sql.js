// const { QueryFile } = require("pg-promise");
// const path = require("path");

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

// const sql = (file) => {
//   const fullPath = path.join(__dirname, file);
//   return new QueryFile(fullPath, {
//     minify: true,
//   });
// };

// module.exports = {
//   cart: {
//     add: sql("../../database/add.sql"),
//     read: sql("../../database/read.sql"),
//   },
// };

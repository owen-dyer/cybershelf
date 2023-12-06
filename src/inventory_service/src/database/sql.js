const { PreparedStatement: PS } = require("pg-promise");

const categories = new PS({
  name: "get-categories",
  text: `SELECT title, description, slug FROM category;`,
});

const allProducts = new PS({
  name: "all-products",
  text: `SELECT id, title, description FROM product;`,
});

const featuredProducts = new PS({
  name: "featured-products",
  text: `SELECT id, title, description FROM product WHERE featured=true;`,
});

const filterProducts = new PS({
  name: "filter-products",
  text: `SELECT id, title, description FROM product WHERE $1 LIKE '%' || LOWER(title) || '%';`,
});

module.exports = {
  inventory: {
    categories,
    allProducts,
    featuredProducts,
    filterProducts,
  },
};

const { PreparedStatement: PS } = require("pg-promise");

const categories = new PS({
  name: "get-categories",
  text: `SELECT title, description, slug FROM category;`,
});

const allProducts = new PS({
  name: "all-products",
  text: `SELECT id, title, description, image_url FROM product;`,
});

const featuredProducts = new PS({
  name: "featured-products",
  text: `SELECT id, title, description, image_url FROM product WHERE featured=true;`,
});

const filterProducts = new PS({
  name: "filter-products",
  text: `SELECT id, title, description, image_url FROM product WHERE POSITION(LOWER($1) IN LOWER(title)) > 0;`,
});

const getById = new PS({
  name: "get-by-id",
  text: `SELECT id, title, description, image_url FROM product WHERE id=ANY($1);`,
});

module.exports = {
  inventory: {
    categories,
    allProducts,
    featuredProducts,
    filterProducts,
    getById,
  },
};

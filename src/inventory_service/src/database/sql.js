const { PreparedStatement: PS } = require("pg-promise");

const categories = new PS({
  name: "get-categories",
  text: `SELECT title, description, slug FROM category;`,
});

module.exports = {
  inventory: {
    categories,
  },
};

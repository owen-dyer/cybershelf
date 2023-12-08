const { PreparedStatement: PS } = require("pg-promise");

const allCategories = new PS({
  name: "all-categories",
  text: `SELECT id, title, description FROM category;`,
});

const categoriesById = new PS({
  name: "categories-by-id",
  text: `SELECT id, title, description, image_url FROM product WHERE `,
});

const allListings = new PS({
  name: "all-listings",
  text: `SELECT id, title, description, image_url, price FROM listing;`,
});

const featuredListings = new PS({
  name: "featured-listings",
  text: `SELECT id, title, description, image_url, price FROM listing WHERE featured=true;`,
});

const listingsByFilter = new PS({
  name: "listings-by-filter",
  text: `SELECT id, title, description, image_url, price FROM listing WHERE POSITION(LOWER($1) IN LOWER(title)) > 0;`,
});

const listingsById = new PS({
  name: " listings-by-id",
  text: `SELECT id, title, description, image_url, price FROM listing WHERE id=ANY($1);`,
});

module.exports = {
  inventory: {
    allCategories,
    categoriesById,
    allListings,
    featuredListings,
    listingsByFilter,
    listingsById,
  },
};

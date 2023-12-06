const { PreparedStatement: PS } = require("pg-promise");

const details = new PS({
  name: "details",
  text: "SELECT email, name FROM abstract_user WHERE id=$1;",
});

const register = new PS({
  name: "register",
  text: `INSERT INTO abstract_user (email, name, password_hash) VALUES ($1, $2, $3) RETURNING name, email;`,
});

const signin = new PS({
  name: "signin",
  text: `SELECT * FROM abstract_user WHERE email=$1;`,
});

const update = new PS({
  name: "update",
  text: ``,
});

module.exports = {
  account: {
    details,
    register,
    signin,
  },
};

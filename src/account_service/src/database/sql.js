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

const updateName = new PS({
  name: "update-name",
  text: `UPDATE abstract_user SET name=($2) WHERE id=($1) RETURNING id, name, email;`,
});

const updateEmail = new PS({
  name: "update-email",
  text: `UPDATE abstract_user SET email=($2) WHERE id=($1) RETURNING id, name, email;`,
});

const updatePassword = new PS({
  name: "update-password",
  text: `UPDATE abstract_user SET password_hash=($2) WHERE id=($1) RETURNING id, name, email;`,
});

module.exports = {
  account: {
    details,
    register,
    signin,
    updateName,
    updateEmail,
    updatePassword,
  },
};

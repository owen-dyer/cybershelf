// const createUserQuery =
//   "INSERT INTO abstract_user (email, first_name, last_name, password_hash) VALUES ($1, $2, $3, $4) RETURNING email;";

const createUserQuery =
  "INSERT INTO abstract_user (email, name, password_hash) VALUES ($1, $2, $3) RETURNING email;";

// Shouldn't select everything but fine for testing
const verifyCredentialsQuery = "SELECT * FROM abstract_user WHERE email=$1;";

module.exports = {
  createUserQuery,
  verifyCredentialsQuery,
};

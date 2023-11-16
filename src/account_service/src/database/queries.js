const createUserQuery =
  "INSERT INTO abstract_user (email, first_name, last_name, password_hash) VALUES ($1, $2, $3, $4) RETURNING email;";
const verifyCredentialsQuery =
  "SELECT password_hash FROM abstract_user WHERE email=$1;";

module.exports = {
  createUserQuery,
  verifyCredentialsQuery,
};

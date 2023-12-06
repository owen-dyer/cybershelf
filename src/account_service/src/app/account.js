const db = require("../database/init");
const { account } = require("../database/sql");

// TODO: Implement authorization stuff so that this is secure
// For just just gonna check the account id in the JWT cuz whatever
const getAccountInfo = async (user_id, callback) => {
  await db
    .one(account.details, user_id)
    .then((user) => {
      callback(user);
    })
    .catch((err) => {
      callback(err);
    });
};

const updateAccountInfo = async (user_id, callback) => {
  // Update account info
};

module.exports = {
  getAccountInfo,
  updateAccountInfo,
};

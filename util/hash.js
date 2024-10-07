const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  return bcrypt.hashSync(password, 10);
};

const comparePassword = async (dbPassword, hash) => {
  return bcrypt.compare(dbPassword, hash);
};

module.exports = {
  hashPassword,
  comparePassword,
};

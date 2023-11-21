const crypto = require("crypto");

const hashedPassword = (password) => {
  return crypto.createHash("md5").update(password).digest("hex");
};

module.exports = { hashedPassword };

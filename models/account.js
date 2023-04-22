var mongoose = require('mongoose');

var accountSchema = mongoose.Schema({
  full_name: String,
  email: String,
  hashed_password: String,
  last_login: String,
});

var Account = mongoose.model('Account', accountSchema);
module.exports = Account;
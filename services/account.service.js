var Account = require('../models/account');
var bcrypt = require('bcrypt');
const saltRounds = 10;

async function login({ email, plainTextPassword }) {
  try {
    const user = await Account.findOne({ email });

    if (!user) {
      throw new Error(`User does not exist`);
    }

    const matched = await bcrypt.compare(plainTextPassword, user.hashed_password);
    if(!matched) {
      throw new Error(`Password is incorrect`);
    }
    return user.id;

  } catch (err) {
    throw new Error(`Service: Cannot get account due to ${err}`);
  }
}

async function register({ email, fullName, password }) {
  try {
    Account.findOne({email: email})
    .then(account => {
      if (account)
        throw new Error ('Email này đã tồn tại')
    })
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    var newAccount = new Account({
      full_name: fullName,
      email,
      hashed_password: hashedPassword
    })

    newAccount = await newAccount.save();

    return newAccount.id

  } catch (err) {
    throw Error(err.message);
  }
}

module.exports = {
  login,
  register,
}
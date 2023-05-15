const User = require("../models/user.model.js");

exports.createUser = async (
  firstName,
  middleName,
  lastName,
  DoB,
  nationalId,
  accountNumber,
  balance
) => {
  return await User.create({
    firstName: firstName,
    lastName: lastName,
    middleName: middleName,
    DoB: DoB,
    nationalId: nationalId,
    accountNumber: accountNumber,
    balance: balance,
  });
};

// get all users service
exports.getUser = async () => {
  return await User.find({});
};

// check if user exists
exports.checkUseExists = async (accountNumber) => {
  const user = await User.findOne({ accountNumber: accountNumber });
  if (user !== undefined) {
    return true;
  }
  return false;
};

// get user by account number
exports.getUserByAccountNumber = async (accountNumber) => {
  const user = await User.find({ accountNumber: accountNumber });
  return user;
};

// credit user service
// crediting users account with credit ammount to a specific account using account number
exports.credit = async (accountNumber, creditAmmount) => {
  return await User.findAndModify({
    query: { accountNumber: accountNumber },
    update: { $inc: { ammount: creditAmmount } },
  });
};

// debit user service
// debiting users account with credit ammount to specific accoujnt using account number
exports.debit = async (accountNumber, debitAmmount) => {
  return await User.findAndModify({
    query: { accountNumber: accountNumber },
    update: { $dec: { ammount: debitAmmount } },
  });
};

exports.usersCount = async () => {
  return await User.countDocuments({}, { hint: "_id_" });
};

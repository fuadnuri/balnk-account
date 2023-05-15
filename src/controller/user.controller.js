const userService = require("../service/user.service");

// display all users collection entry
exports.getUsers = async (req, res) => {
  const user = await userService.getUser();
  res.send(user);
};

//validate date of birth entry
const isNotValidDoB = (DoB) => {
  if (DoB) {
    let valid_age = 18;
    let date = DoB.split("-");
    let current_date = new Date().getFullYear();

    if (Number(current_date) - Number(date[0]) <= valid_age) {
      return true;
    }
  }
  return false;
};

//validate national Id for uniqueness
const isNotValidNationalId = (nationalId) => {
  if (nationalId) {
    return false;
  }
  return true;
};

// validate user entery for correct entry
const validate = (firstName, middleName, lastName, DoB, nationalId) => {
  if (
    firstName.length < 3 ||
    middleName.length < 3 ||
    lastName.length < 3 ||
    isNotValidDoB(DoB) ||
    isNotValidNationalId(nationalId)
  ) {
    return false;
  }
  return true;
};

// create user with validated entry
exports.createUser = async (req, res) => {
  const firstName = req.body.firstName;
  const middleName = req.body.middleName;
  const lastName = req.body.lastName;
  const DoB = req.body.DoB;
  const nationalId = req.body.nationalId;

  const accountNumber = async () => {
    const count = await userService.usersCount();
    console.log(count);
    return `1000${"" + count}`;
  };

  if (validate(firstName, middleName, lastName, DoB, nationalId)) {
    try {
      userService.createUser(
        firstName,
        middleName,
        lastName,
        DoB,
        nationalId,
        await accountNumber()
      );

      res.status(201).send(getUserByAccountNumber(await accountNumber()));
    } catch (e) {
      console.log("not creating user for some unknown resont", e);
      res.status(204).send(e);
    }
  } else {
    console.log("invalid entry");
    res.status(204).send({ data: "invalid" });
  }
};

// get user by accountNumber
const getUserByAccountNumber = async (accountNumber) => {
  let user = await userService.getUserByAccountNumber(accountNumber);
  return user;
};

// get users current account ballance
const getUsersBalance = async (accountNumber) => {
  let user = await userService.getUserByAccountNumber(accountNumber);
  let currentBalance = user.find(balance);

  return currentBalance;
};

const validDebitAmount = async (accountNumber, amount) => {
  const validAccountNumber = async () => {
    let isValidUser = await userService.getUserByAccountNumber(accountNumber);
    return isValidUser;
  };
  if (validAccountNumber()) {
    let usersBalance = await getUsersBalance(accountNumber);
    if (usersBalance > amount) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

// debit a valid users account by valid amount
exports.debitUser = async (req, res) => {
  const amount = req.body.amount;
  const accountNumber = req.body.accountNumber;

  if (validDebitAmount) {
    userService.debit(accountNumber, amount);
    let user = getUserByAccountNumber(accountNumber);
    res.next(200).send(user);
  }
};

// credit a valid user account by valid credit ammount which is any value greater than 0
exports.creditUser = async (req, res) => {
  const accountNumber = req.body.accountNumber;
  const amount = req.body.amount;
  let user = await getUserByAccountNumber(accountNumber);
  if (user !== undefined && amount > 0) {
    userService.credit(accountNumber, amount);
    user = await getUserByAccountNumber(accountNumber);
    res.next(200).send(user);
  } else {
    const response =
      "Either account number is not found or credit ammount les than 0";
    res.next(204).send(response);
  }
};

// get a single user by account number
exports.getUser = async (req, res) => {
  const accountNumber = req.body.accountNumber;
  const user = await userService.getUserByAccountNumber(accountNumber);
  console.log(user);
  res.send(user);
};

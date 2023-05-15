const Router = require("express");
const userController = require("../controller/user.controller.js");

const route = Router();
route.get("/allusers", userController.getUsers);
route.post("/user", userController.getUser);
route.post("/user/create", userController.createUser);
route.post("/user/credit", userController.creditUser);
route.post("/user/debit", userController.debitUser);

module.exports = route;

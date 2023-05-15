const mongoose = require("mongoose");
const URI =
  "mongodb+srv://fuadnuri:mongopass@cluster0.sspiyu7.mongodb.net/?retryWrites=true&w=majority";

const db = mongoose
  .connect(URI)
  .then(() => {
    console.log("connected...");
  })
  .catch((error) => {
    console.log(`not connected ${error}`);
  });

module.exports = db;

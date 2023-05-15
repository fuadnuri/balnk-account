const express = require("express");
// const mongoose = require("mongodb");
// const mongodb = require(mongodb);
const userRouter = require("./router/user.router.js");

const app = express();
const PORT = 3000;

app.use(express.urlencoded());
app.use(express.json());
app.listen(PORT, () => {
  console.log(`running epxress server on port ${PORT}`);
});

app.use("/api", userRouter);
// app.get("/", (req, res) => {
//   res.send("hello from express server");
// });

// app.post("/", (req, res) => {
//   console.log(req.body);
//   res.send(201);
// });

// const connect = async()=>{
//   try{

//   }
// }

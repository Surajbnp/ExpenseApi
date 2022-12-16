const express = require("express");
const app = express();
const connection = require("./database/server");
const cors = require("cors");
const { RoleRoute } = require("./routes/role.js");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Homepage");
});

app.use("/role", RoleRoute);

const PORT = process.env.PORT || 8080;

app.listen(PORT, async() => {
  try{
    await connection
    console.log("connected to database");
  }catch{
    console.log("error to connct to db")
  }
  console.log(`server is running on port ${PORT}`);
});

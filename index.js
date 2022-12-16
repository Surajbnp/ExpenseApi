const express = require("express");
const app = express();
const connection = "./database.server.js"
const cors = require("cors");


app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to Homepage");
})


const PORT = process.env.PORT || 8080;


app.listen(PORT, () => {
    connection && console.log("connected to database");
    console.log(`server is running on port ${PORT}`)
})
require("dotenv").config();
let jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
  const token = req.headers?.authorization;

  jwt.verify(token, process.env.SECRET, function (err, decoded) {
    if (err) {
      res.status(401).send({ success : false, msg: "Unauthorized" });
    } else {
      req.body.userId = decoded.userId;
      next();
    }
  });
};

module.exports = authentication;

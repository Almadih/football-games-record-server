const jwt = require("jsonwebtoken");
require("dotenv").config();
const ALLOWED_ROUTES = ["/login"];
const PROTECTED_ROUTES = ["/v1/player/new", "/v1/match/new"];
const token = (req, res, next) => {
    console.log(req.method != 'PUT')
  if (PROTECTED_ROUTES.indexOf(req.url) === -1 && req.method !== 'PUT') {
    return next();
  }
  const token = req.headers["x-access-token"];
  //see if there is a token in the header
  if (!token) {
    return res.status(401).json({
      msg: "please provide token",
    });
  }
  //check if the token is valid
  jwt.verify(token, process.env.JWT_SECRET, async (err, decode) => {
    if (err) {
      return res.status(401).json({
        msg: "the token is invalid",
      });
    }
    //if it's valid see if the payload belongs to a user or admin
    if (decode.username) {
      req.admin = decode;
      return next();
    }
  });
};

module.exports = token;

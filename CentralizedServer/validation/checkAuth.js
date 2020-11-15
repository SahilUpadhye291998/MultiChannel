const jwt = require("jsonwebtoken");
const jwtSecret = require("../secret/secret").jwtToken;

module.exports = (req, res, next) => {
  try {
    console.log(req.headers.authorization);
    const token = req.headers.authorization.split(" ")[1];
    const decode = jwt.verify(token, jwtSecret);
    console.log(decode);
    req.userData = decode;
    next();
  } catch (error) {
    return res.status(401).json({
      message: `Please check your credentials: Autherization fail`,
    });
  }
};

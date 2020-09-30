const jwt = require("jsonwebtoken");
const jwtSecret = require("../secret/secret").jwtToken;

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decode = jwt.verify(token, jwtSecret);
    req.userData = decode;
    next();
  } catch (error) {
    return res.status(401).json({
      message: `Please check your credentials: Autherization fail`,
    });
  }
};

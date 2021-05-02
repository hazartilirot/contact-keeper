const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token)
    return res.status(401).json({
      msg: "Invalid token Authorization denied",
    });

  try {
    jwt.verify(token, config.get("secret"), (err, decoded) => {
      if (err) throw err;
      req.user = decoded.user;
    });
    next();
  } catch (e) {
    res.status(401).json({ msg: "Token is invalid" });
  }
};

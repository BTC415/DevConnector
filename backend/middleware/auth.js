const jwt = require("jsonwebtoken");
const secretOrKey = require("../config").secretOrKey;

module.exports = function (req, res, next) {
  //Get token from request header
  const token = req.header('x-auth-token')

  //Checks if token exits
  if (!token) {
    return res.status(401).json({ msg: "No token. Authorization denied!" })
  }

  //verify token
  try {
    jwt.verify(token, secretOrKey, (error, decoded) => {
      if (error) {
        return res.status(401).json({ msg: "Token is invalid!" })
      } else {
        req.user = decoded.user;
        next()
      }
    })
  } catch (err) {
    console.log("Something went wrong with auth middleware")
    return res.status(500).json({ msg: "Server error" })
  }
}
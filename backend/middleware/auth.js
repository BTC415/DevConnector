const jwt = require("jsonwebtoken");
const secretOrKey = require("../config/keys").secretOrKey

module.exports = function (req, res, next) {
  //Get token from request header
  const token = req.headers['authorization']
  
  //Checks if token exits
  if (!token) {
    return res.status(401).json({ msg: "No token. Authorization denied!" })
  }

  // Split the token from the 'Bearer' prefix
  const bearer = token.split(' ');
  if (bearer.length !== 2 || bearer[0] !== 'Bearer') {
    return res.status(401).json({ msg: "Token format is invalid!" });
  }

  const jwtToken = bearer[1]; // The actual token

  //verify token
  try {
    jwt.verify(jwtToken, secretOrKey, (error, decoded) => {
      if (error) {
        return res.status(401).json({ msg: "Token is invalid!" })
      } else {
        req.user = decoded;
        next()
      }
    })
  } catch (err) {
    console.log("Something went wrong with auth middleware")
    return res.status(500).json({ msg: "Server error" })
  }
}
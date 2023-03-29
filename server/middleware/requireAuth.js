const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors/api-error");

const requireAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // console.log("Auth Header:", authHeader);

  //check header
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("You are not signed in.");
  }

  //get the token
  const token = authHeader.split(" ")[1];

  //verify its signature
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    //attach the user's info
    req.user = { userId: payload.userId, username: payload.username };
    next();
  } catch (err) {
    console.log(err);
    throw new UnauthenticatedError("You are not signed in.");
  }
};

module.exports = requireAuth;

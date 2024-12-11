const { UnauthenticatedError } = require("../errors");
const jwt = require("jsonwebtoken");

const adminTokenAuth = async (req, res, next) => {
  // Always remember about the next parameter and to use it as well in the middleware in both error handling and token authorization.
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Authorization Invalid");
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (payload.role === "admin") {
      req.user = {
        userId: payload.userId,
        email: payload.email,
        role: payload.role,
      };
      next();
    }
  } catch (err) {
    throw new UnauthenticatedError("Authorization Invalid second");
  }
};

module.exports = adminTokenAuth;

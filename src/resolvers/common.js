const jwt = require("jsonwebtoken");

const { APP_SECRET } = process.env;

const { prisma } = require("../generated/prisma-client");

const jwtValidator = (token) => jwt.verify(token, APP_SECRET);

function signToken({ id, name, email }) {
  return jwt.sign(
    {
      id,
      name,
      email,
    },
    APP_SECRET
  );
}

async function loginChecker({ request }, requireAuth = true) {
  const Authorization = request.get("Authorization");
  if (Authorization) {
    const token = Authorization.replace("Bearer ", "");
    const userInJwt = jwtValidator(token);
    const user = await prisma.user({ id: userInJwt.id });
    if (!user) {
      throw new Error("Not Authorized");
    }
    return user;
  }
  if (requireAuth) {
    throw new Error("Not Authorized");
  }
  return null;
}

module.exports = { signToken, loginChecker };

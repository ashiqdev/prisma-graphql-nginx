const bcrypt = require("bcryptjs");

const { prisma } = require("../../generated/prisma-client");
const { signToken } = require("../common");

const Mutation = {
  async signup(parent, args, ctx) {
    const emailTaken = await prisma.$exists.user({ email: args.email });
    if (emailTaken) throw new Error("Email is already taken");
    const password = await bcrypt.hash(args.password, 10);
    const data = { ...args };

    const newUser = await prisma.createUser({
      ...data,
      password,
    });

    return newUser;
  },

  async signin(parent, args, ctx) {
    const { email, password } = args;
    const user = await prisma.user({ email });

    if (!user) throw new Error("No user found with this email");

    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) throw new Error("Invalid Password");

    return {
      token: signToken(user),
      user,
    };
  },
};

module.exports = Mutation;

const fragment = require("./fragment");

const { loginChecker } = require("../common");

const Query = {
  async users(parent, args, ctx) {
    const users = await ctx.prisma.users().$fragment(fragment);
    return users;
  },

  async user(parent, args, ctx) {
    await loginChecker(ctx);
    return ctx.prisma.user({ id: args.id }).$fragment(fragment);
  },
};

module.exports = Query;

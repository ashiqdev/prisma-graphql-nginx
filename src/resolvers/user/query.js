const fragment = require("./fragment");

const { loginChecker } = require("../common");

const Query = {
  async userIp(parent, args, ctx) {
    const { request } = ctx;
    const ip =
      request.headers["x-forwarded-for"];
    return {
      ip,
    };
  },

  async user(parent, args, ctx) {
    await loginChecker(ctx);
    return ctx.prisma.user({ id: args.id }).$fragment(fragment);
  },
};

module.exports = Query;

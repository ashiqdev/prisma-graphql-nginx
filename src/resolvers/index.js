const userQuery = require("./user/query");
const userMutation = require("./user/mutation");

const resolvers = {
  Mutation: {
    ...userMutation,
  },

  Query: {
    ...userQuery,
  },
};

module.exports = resolvers;

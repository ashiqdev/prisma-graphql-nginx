const gql = require("graphql-tag");

const fragment = gql`
  fragment User on User {
    id
    name
    email
  }
`;

module.exports = fragment;

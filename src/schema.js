//const { makeExecutableSchema } = require("graphql-tools");
const { makeExecutableSchema } = require("@graphql-tools/schema");

const { resolvers } = require("./resolvers");

const typeDefs = `

    type Query {
        products(code: String, name: String, category: String, limit: Int, offset: Int, sort: String): [Product]!
    }
    
    type Product {
        _id: ID
        code: String!
        name: String!
        price: Float!
        category: String!
    }
 
`;

module.exports = makeExecutableSchema({
    typeDefs,
    resolvers
});

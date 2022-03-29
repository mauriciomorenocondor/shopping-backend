import { makeExecutableSchema } from "graphql-tools"
import { resolvers } from "./resolvers"

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

export default makeExecutableSchema({
    typeDefs,
    resolvers
});
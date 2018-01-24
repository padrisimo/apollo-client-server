import { makeExecutableSchema } from 'graphql-tools';
import { resolvers } from './resolvers';

const typeDefs =`
    type Contact {
        id: ID!
        firstName: String
        lastName: String
    }

    type Query {
        contacts: [Contact]
    }

    type Mutation {
        addContact(firstName: String!, lastName: String!): Contact
    }
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

export { schema };
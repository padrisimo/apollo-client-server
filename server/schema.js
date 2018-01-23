import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';

const typeDefs =`
    type Contact {
        id: ID!
        firstName: String
        lastName: String
    }

    type Query {
        contacts: [Contact]
    }
`;

const schema = makeExecutableSchema({ typeDefs });
addMockFunctionsToSchema({ schema });

export { schema };
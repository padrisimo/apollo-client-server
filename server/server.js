import express from 'express';
import bodyParser from 'body-parser';
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import cors from 'cors';
import { execute, subscribe } from 'graphql';
import { createServer } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { schema } from './src/schema';

const myGraphQLSchema = schema;
const PORT = 4000;
const server = express();

server.use('*', cors({ origin: 'http://localhost:3000' }));

server.use('/graphql', bodyParser.json(), graphqlExpress({ schema: myGraphQLSchema }));
server.use('/graphiql', bodyParser.json(), graphiqlExpress({
    endpointURL: '/graphql',
    subscriptionsEndpoint: `ws://localhost:${PORT}/subscriptions`
}));

const ws = createServer(server);

ws.listen(PORT, () => {
    console.log(`GraphQL server is runing on port ${PORT}`);

    new  SubscriptionServer({
        execute,
        subscribe,
        schema
    }, {
        server: ws,
        path: '/subscriptions'
    })
}
);

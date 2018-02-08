import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient, InMemoryCache } from 'apollo-client-preset';
import { toIdValue } from 'apollo-utilities';
import { SubscriptionClient, } from 'subscriptions-transport-ws';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import { HttpLink } from 'apollo-link-http';
import { addGraphQLSubscriptions } from 'add-graphql-subscriptions';
import './App.css';
import Contacts from './Contacts';
import AddContact from './AddContact';
import ContactSingle from './ContactSingle';

const PORT = 4000;

const networkInterface = new HttpLink({ uri: `http://localhost:${PORT}/graphql` });

const wsClient = new SubscriptionClient(`ws://localhost:${PORT}/subscriptions`, {
  reconnect: true
});

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient
);

const dataIdFromObject = (result) => {
  if (result.__typename) {
    if (result.id !== undefined) {
      return `${result.__typename}:${result.id}`
    }
  }
  return null;
};

const client = new ApolloClient({
  link: networkInterfaceWithSubscriptions,
  cache: new InMemoryCache(),
  customResolvers: {
    Query: {
      contact: (__, args) => {
        return toIdValue(dataIdFromObject({ __typename: 'Contact', id: args['id'] }))
      }
    }
  },
  dataIdFromObject
});

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <ApolloProvider client={client}>
          <div className="App">
            <header className="App-header">
              <Link to="/">
                <h2>CRM</h2>
              </Link>
            </header>
            <AddContact />
            <Switch>
              <Route path='/' component={Contacts}/>
              <Route path='/contact/:contactId' component={ContactSingle}/>
            </Switch>
            <Contacts />
          </div>
        </ApolloProvider>
      </BrowserRouter>
    );
  }
}

export default App;

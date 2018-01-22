import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient, InMemoryCache } from 'apollo-client-preset';
import { createHttpLink } from 'apollo-link-http';
import './App.css';
import Contacts from './Contacts';

const client = new ApolloClient({
  link: createHttpLink(),
  cache: new InMemoryCache()
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <header className="App-header">
            <h2>CRM</h2>
          </header>
          <Contacts />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;

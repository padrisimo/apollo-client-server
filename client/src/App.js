import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient, InMemoryCache } from 'apollo-client-preset';
import { HttpLink } from 'apollo-link-http';
import './App.css';
import Contacts from './Contacts';
import AddContact from './AddContact';

const client = new ApolloClient({
  link: new HttpLink({ uri: "http://localhost:4000/graphql" }),
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
          <AddContact />
          <Contacts />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;

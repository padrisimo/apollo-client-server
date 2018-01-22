import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const Contacts = ({ data: { loading, error, contacts } }) => {
  if (loading) {
    return <p>Loading...</p>
  }
  if (error) {
    return <p>{error.message}</p>
  }
  return (
    <ul>
      {contacts.map(item => (
        <li key={item.id}>{item.firstName} {item.lastName}</li>
      ))}
    </ul>
  )
};

export const contactsListQuery = gql`
  query ContactsQuery {
    contacts {
      id
      firstName
      lastName
    }
  }
`;

export default graphql(contactsListQuery)(Contacts);
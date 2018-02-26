import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';

const Contacts = ({ data: { loading, error, contacts } }) => {
  if (loading) {
    return <p>Loading...</p>
  }
  if (error) {
    return <p>{error.message}</p>
  }

  return (
    <div className="row">
      <ul className="collection">
        {contacts.map(item =>
          (<li key={item.id} className="collection-item" ><Link to={item.id < 0 ? `/` : `contact/${item.id}`}>
            {item.firstName} {item.lastName}
          </Link></li>)
        )}
      </ul>
    </div>
  );
}

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

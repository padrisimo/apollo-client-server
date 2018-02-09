import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import AddNote from './AddNote';

const ContactHeader = ({ data: { loading, error, contact } }) => {

    if (loading) {
        return <p>Loading...</p>
    }
    if (error) {
        return <p>{error.message}</p>
    }

    return (
        <div>
            <div>{contact.firstName}{contact.lastName}</div>
        </div>
    );
}

export const contactQuery = gql`
    query ContactQuery($contactId: ID!){
        id
        firstName
        lastName
    }
`;

export default (graphql(contactQuery, {
    options: (props) => ({
        variables: {
            contactId: props.contactId
        }
    })
})(ContactHeader));

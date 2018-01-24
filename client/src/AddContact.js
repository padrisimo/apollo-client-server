import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class AddContact extends Component {
  state = {
    firstName: '',
    lastName: ''
  };

  handleSave = ({ mutate }) => {
    const { firstName, lastName } =  this.state;
    this.props.mutate({
      variables: {firstName, lastName}
    })
    .then( res => this.setState({
      firstName: '',
      lastName: ''
    }))
  }
  
  render() {
    return (
      <div>
        <input
          value={ this.state.firstName }
          placeholder='Fist name'
          onChange={(e) => this.setState(this.setState({ firstName: e.target.value }))}
        />
        <input
          value={ this.state.lastName }
          placeholder='Last name'
          onChange={(e) => this.setState(this.setState({lastName: e.target.value }))}
        />
        <button onClick={this.handleSave}>Save</button>
      </div>
    )
  }
};

const createConact = gql`
  mutation addContact($firstName: String!, $lastName: String!) {
    addContact ( firstname: $firstName, lastName: $lastName ){
      id
      firstName
      lastName
    }
  }
`;

const AddContactsWithMutation = graphql(createConact)(AddContact);

export default AddContactsWithMutation;
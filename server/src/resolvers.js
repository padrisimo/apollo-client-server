const contacts = [
    {
        id: 1,
        firstName: 'Peter',
        lastName: 'Parker'
    },
    {
        id: 2,
        firstName: 'Frank',
        lastName: 'Castle'
    },
    {
        id: 3,
        firstName: 'Bruce',
        lastName: 'Banner'
    }
];

export const resolvers = {
    Query: {
        contacts: () => contacts
    },
    Mutation: {
        addContact: (root, args) => {
            const newContact = { id: args.id, firstName: args.firstName, lastName: args.lastName };
            contacts.push(newContact);
            return newContact;
        }
    }
};

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
    }
};
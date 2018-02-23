import { PubSub, withFilter } from 'graphql-subscriptions';

const pubsub = new PubSub();

const contacts = [
    {
        id: '1',
        firstName: 'Peter',
        lastName: 'Parker',
        notes: [
            {
                id: '1',
                details: 'he is hung out'
            },
            {
                id: '2',
                details: 'spidy?'
            }
        ]
    },
    {
        id: '2',
        firstName: 'Frank',
        lastName: 'Castle',
        notes: [
            {
                id: '1',
                details: 'such an easy going guy'
            },
            {
                id: '2',
                details: 'no hard feeling ;)'
            }
        ]
    },
    {
        id: '3',
        firstName: 'Bruce',
        lastName: 'Banner',
        notes: [
            {
                id: '1',
                details: 'is getting green'
            },
            {
                id: '2',
                details: 'omg!!!!'
            }
        ]
    }
];

export const resolvers = {
    Query: {
        contacts: () => contacts,
        contact: (root, { id }) => contacts.find(contact => contact.id === id)
    },
    Mutation: {
        addContact: (root, args) => {
            const newContact = { id: args.id, firstName: args.firstName, lastName: args.lastName };
            contacts.push(newContact);
            return newContact;
        },
        addNote: (root, { note }) => {
            const newId = require('crypto').randomBytes(5).toString('hex');
            const contact = contacts.find(contact => contact.id === note.contactId);
            const newNote = { id: String(newId), details: note.details };
            contact.notes.push(newNote);
            pubsub.publish('noteAdded', { noteAdded: newNote, contactId: note.contactId });
            return newNote;
        }
    },
    Subscription: {
        noteAdded: {
            subscribe: withFilter(() => pubsub.asyncIterator('noteAdded'), (payload, variables) => {
                return payload.contactId === variables.contactId;
            })
        }
    }
};

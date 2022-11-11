import baseSchema from './base.schema.js';
import channelsSchema from './channels.schema.js';
import usersSchema from './users.schema.js';

const { baseGet, baseSearch, baseAdd, baseRemove } = baseSchema;

const messagesBody = {
    message: { type: 'string' },
    channelId: {
        type: 'object',
        properties: channelsSchema,
    },
    userId: {
        type: 'object',
        properties: usersSchema,
    },
    createdAt: { type: 'string', format: 'date-time' },
    updatedAt: { type: 'string', format: 'date-time' }
};

const input = {
    name: { type: 'string' },
};

const bodySearch = {
    docs: {
        type: 'array',
        items: {
            type: 'object',
            properties: messagesBody
        }
    }
};

const get = baseGet(messagesBody);
const search = baseSearch(bodySearch);
const add = baseAdd(input, messagesBody);
const remove = baseRemove({message: { type: 'string' }, messagesBody});

export default { 
    get, 
    search, 
    add, 
    remove, 
    messagesBody 
};
  
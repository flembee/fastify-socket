import baseSchema from './base.schema.js';
import usersSchema from './users.schema.js';

const { baseGet, baseSearch, baseAdd, baseRemove } = baseSchema;

const channelsBody = {
    name: { type: 'string' },
    users: {
        type: 'array',
        items: {
            type: 'object',
            properties: usersSchema,
        },  
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
            properties: channelsBody
        }
    }
};

const get = baseGet(channelsBody);
const search = baseSearch(bodySearch);
const add = baseAdd(input, channelsBody);
const remove = baseRemove({message: { type: 'string' }, channelsBody});

export default { 
    get, 
    search, 
    add, 
    remove, 
    channelsBody 
};
  
import baseSchema from './base.schema.js';

const { baseGet, baseSearch, baseAdd, baseUpdate, baseRemove } = baseSchema;

const usersValues = {
    name: { type: 'string' },
    email: { type: 'string' },
    userImage: { type: 'string' },
    verified: { type: 'string' },
    secretKey: { type: 'string' },
    createdAt: { type: 'string', format: 'date-time' },
    updatedAt: { type: 'string', format: 'date-time' },
};

const input = {
    ...usersValues,
}

const usersBody = {
    ...usersValues,
    _id: { type: 'string' },
};

const bodySearch = {
    docs: {
        type: 'array',
        items: {
            type: 'object',
            properties: usersBody,
        },
    },
};

const get = baseGet(usersBody);
const search = baseSearch(bodySearch);
const add = baseAdd(input, usersBody);
const update = baseUpdate(usersValues, usersBody);
const remove = baseRemove({message: {type: 'string'}, usersBody});

export default { 
    get, 
    search, 
    add, 
    update, 
    remove, 
    usersBody 
};

import baseSchema from './base.schema.js';

const { baseGet, baseSearch, baseAdd, baseUpdate, baseRemove } = baseSchema;

const usersValues = {
    name: { type: 'string' },
    email: { type: 'string' },
    userRole: { type: 'number' },
    phoneNumber: { type: 'number' },
    userImage: { type: 'string' },
    verified: { type: 'string' },
    secretKey: { type: 'string' },
    createdAt: { type: 'string', format: 'date-time' },
    updatedAt: { type: 'string', format: 'date-time' },
};

const input = {
    ...usersValues,
    userRole: { type: 'string', pattern: '^[0-9a-fA-F]{24}$' },
}

const usersBody = {
    ...usersValues,
    _id: { type: 'string' },
    userRole: {
        type: 'object',
        properties: {
            _id: {
                type: 'string',
                pattern: '^[0-9a-fA-F]{24}$',
            },
            name: { type: 'string' },
        },
    },
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

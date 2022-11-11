import baseSchema from './base.schema.js';

const { baseGet, baseSearch, baseAdd, baseUpdate, baseRemove } = baseSchema;

const rolesBody = {
    name: { type: 'string' },
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
            properties: rolesBody
        }
    }
};

const get = baseGet(rolesBody);
const search = baseSearch(bodySearch);
const add = baseAdd(input, rolesBody);
const update = baseUpdate(input, rolesBody);
const remove = baseRemove({message: { type: 'string' }, rolesBody});

export default { 
    get, 
    search, 
    add, 
    update, 
    remove, 
    rolesBody 
};
  
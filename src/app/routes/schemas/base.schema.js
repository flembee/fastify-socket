const pagination = {
    total: { type: 'number' },
    limit: { type: 'number' },
    page: { type: 'number' },
    pages: { type: 'number' }
};

const baseGet = async (body) => {
    return {
        params: {
            type: 'object',
            properties: {
                id: { type: 'string', pattern: '^[0-9a-fA-F]{24}$' }
            }
        },
        response: {
            200: {
                description: 'Successful response',
                type: 'object',
                properties: body
            }
        }
    }
};

const baseSearch = async (bodySearch) => {
    return {
        querystring: {
            type: 'object',
            properties: {
                query: { type: 'string' }
            }
        },
        response: {
            200: {
                description: 'Successful response',
                type: 'object',
                properties: {
                    bodySearch,
                    ...pagination
                }
            }
        }
    }
};

const baseAdd = async (input, body) => {
    return {
        body: {
            type: 'object',
            properties: input
        },
        response: {
            200: {
                description: 'Added successfully',
                type: 'object',
                properties: {
                    docs: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: body
                        }
                    },
                    ...pagination
                }
            }
        }
    }
};

const baseUpdate = async (input, body ) => {
    return {
        params: {
            type: 'object',
            properties: {
                id: { type: 'string', pattern: '^[0-9a-fA-F]{24}$' }
            }
        },
        body: {
            type: 'object',
            properties: input
        },
        response: {
            200: {
                description: 'Updated successfully',
                type: 'object',
                properties: body
            }
        }
    }
};

const baseRemove = async (body) => {
   return {
        response: {
        200: {
            description: 'Deleted successfully',
            type: 'object',
            properties: {
                docs: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: body
                    }
                },
                 ...pagination
                }
            }
        }
    }
};

export default { 
    baseGet, 
    baseSearch, 
    baseAdd, 
    baseUpdate, 
    baseRemove 
};
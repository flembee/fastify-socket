import bcrypt from 'bcryptjs';

const objectToDotNotation = (args) => {
    const setObject = {};
    Object.keys(args).forEach((key) => {
        if (typeof args[key] === 'object' && !Array.isArray(args[key])) {
            Object.keys(args[key]).forEach((subkey) => {
                setObject[`${key}.${subkey}`] = args[key][subkey];
            });
        } else {
            setObject[key] = args[key];
        }
    });
    return setObject;
};

const customQuery = (query) => {
    const {
        select,
        populate,
        page,
        limit,
        sortField,
        sortDirection,

        ...queryParams
    } = query;

    return {
        select,
        populate,
        page: Number(page),
        limit: Number(limit),
        sortField,
        sortDirection,
        queryParams,
    };
};

const hashPassword = async (password) => {
    const salted = bcrypt.genSaltSync(password.salt);
    const hash = bcrypt.hashSync(password, salted);
    return hash;
};

const queryStringToJSON = (pathname) => {
    const result = {};

    if (pathname) {
        const pairs = pathname.slice(1).split('&');

        pairs.forEach(function (pair) {
            pair = pair.split('=');
            result[pair[0]] = Number(decodeURIComponent(pair[1] || ''));
        });
    }

    return result;
};

export default {
    objectToDotNotation,
    customQuery,
    hashPassword,
    queryStringToJSON
}
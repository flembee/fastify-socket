import fp from 'fastify-plugin';
import { forEachObjIndexed } from 'ramda';
import routes from '../../app/routes/index.js';

const Routes = fp(async function(fastify) {
    const registerRoutes = (value, key, obj) => {
        fastify.register(obj[key], {
            prefix: `/api/${key}`
        });
    };
    forEachObjIndexed(registerRoutes, routes);
});

export default Routes;

import controllers from '../controllers/index.js';
import schemas from './schemas/index.js';

const { RolesController } = controllers;
const { RolesSchema } = schemas;
const { get, search, add, update, remove } = RolesSchema;

const RolesRoutes = async function (fastify) {
  fastify
    .get('/:id', { schema: get, preValidation: [fastify.validate] }, RolesController(fastify).get)
    .get('/', { schema: search, preValidation: [fastify.validate] }, RolesController(fastify).search)
    .post('/', { schema: add, /*preValidation: [fastify.validate] */}, RolesController(fastify).add)
    .put('/:id', { schema: update, preValidation: [fastify.validate] }, RolesController(fastify).update)
    .delete('/', { schema: remove, preValidation: [fastify.validate] }, RolesController(fastify).delete);
};

export default RolesRoutes;

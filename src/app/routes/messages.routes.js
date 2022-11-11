import controllers from '../controllers/index.js';
import schemas from './schemas/index.js';

const { MessagesController } = controllers;
const { MessagesSchema } = schemas;
const { get, search, add, remove } = MessagesSchema;

const MessagesRoutes = async function (fastify) {
  fastify
    .get('/:id', { schema: get,/*preValidation: [fastify.validate]*/ }, MessagesController(fastify).get)
    .get('/', { schema: search, /*preValidation: [fastify.validate]*/ }, MessagesController(fastify).search)
    .post('/', { schema: add, /*preValidation: [fastify.validate] */}, MessagesController(fastify).add)
    .delete('/', { schema: remove, /*preValidation: [fastify.validate]*/ }, MessagesController(fastify).delete);
};

export default MessagesRoutes;

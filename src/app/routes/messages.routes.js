import controllers from '../controllers/index.js';
import schemas from './schemas/index.js';

const { MessagesController } = controllers;
const { MessagesSchema } = schemas;
const { get, add, remove } = MessagesSchema;

const MessagesRoutes = async function (fastify) {
  fastify
    .get('/channel/:id', { schema: get,/*preValidation: [fastify.validate]*/ }, MessagesController(fastify).getByChannel)
    .post('/', { schema: add, /*preValidation: [fastify.validate] */}, MessagesController(fastify).add)
    .delete('/', { schema: remove, /*preValidation: [fastify.validate]*/ }, MessagesController(fastify).delete);
};

export default MessagesRoutes;

import controllers from '../controllers/index.js';
import schemas from './schemas/index.js';

const { ChannelsController } = controllers;
const { ChannelsSchema } = schemas;
const { get, add, remove } = ChannelsSchema;

const ChannelsRoutes = async function (fastify) {
  fastify
    .get('/:id', { schema: get, /*preValidation: [fastify.validate]*/ }, ChannelsController(fastify).get)
    .get('/user/:id', { schema: get, /*preValidation: [fastify.validate]*/ }, ChannelsController(fastify).getByUser)
    .post('/', { schema: add, /*preValidation: [fastify.validate] */}, ChannelsController(fastify).add)
    .delete('/', { schema: remove, /*preValidation: [fastify.validate]*/ }, ChannelsController(fastify).delete);
};

export default ChannelsRoutes;

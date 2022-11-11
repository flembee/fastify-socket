import controllers from '../controllers/index.js';
import schemas from './schemas/index.js';

const { UsersController } = controllers;
const { UsersSchema } = schemas;
const { get, search, add, update, remove, updatePassword } = UsersSchema;

const UsersRoutes = async function(fastify) {
  fastify
  .get('/', { schema: search, /*preValidation: [fastify.validate]*/ }, UsersController(fastify).search)
  .get('/:id', { schema: get, /*preValidation: [fastify.validate]*/ }, UsersController(fastify).get)
  .post('/', { schema: add, /*preValidation: [fastify.validate]*/ }, UsersController(fastify).add)
  .put('/:id', { schema: update, preValidation: [fastify.validate] }, UsersController(fastify).update)
  .put('/update-password/:id', { schema: updatePassword, preValidation: [fastify.validate] }, UsersController(fastify).updatePassword)
  .delete('/', { schema: remove, preValidation: [fastify.validate] }, UsersController(fastify).delete)
};

export default UsersRoutes;

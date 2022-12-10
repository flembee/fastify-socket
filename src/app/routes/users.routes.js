import controllers from '../controllers/index.js';
import schemas from './schemas/index.js';

const { UsersController } = controllers;
const { UsersSchema } = schemas;
const { get, add, update, remove, updatePassword } = UsersSchema;

const UsersRoutes = async function(fastify) {
  fastify
  .get('/:id', { schema: get, /*preValidation: [fastify.validate]*/ }, UsersController(fastify).get)
  .get('/contacts/:id', { schema: get, /*preValidation: [fastify.validate]*/ }, UsersController(fastify).getContacts)
  .post('/', { schema: add, /*preValidation: [fastify.validate]*/ }, UsersController(fastify).add)
  .post('/contacts/:id', { schema: add, /*preValidation: [fastify.validate]*/ }, UsersController(fastify).addContact)
  .put('/:id', { schema: update, preValidation: [fastify.validate] }, UsersController(fastify).update)
  .put('/update-password/:id', { schema: updatePassword, preValidation: [fastify.validate] }, UsersController(fastify).updatePassword)
  .delete('/', { schema: remove, preValidation: [fastify.validate] }, UsersController(fastify).delete)
};

export default UsersRoutes;

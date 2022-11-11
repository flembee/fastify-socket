import controllers from '../controllers/index.js';

const { AuthController } = controllers;

const AuthRoutes = async function(fastify) {
  fastify
  .post('/signup', AuthController(fastify).signUp)
  .post('/signin', AuthController(fastify).signIn)
  .put('/', AuthController(fastify).update);
};

export default AuthRoutes;

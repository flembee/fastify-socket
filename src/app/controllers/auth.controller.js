import Boom from '@hapi/boom';
import utils from '../utils/index.js';

const { hashPassword } = utils;

const AuthController = fastify => {
  const { auth, usersService, rolesService } = fastify;
  
  return {
    signIn: async (req, res) => {
      const { email, password } = req.body;
      const user = await usersService.getByEmail(email);

      const passwordIsMatch = await auth.onVerifyPassword(
        password,
        user.password
      );

      if (!passwordIsMatch) return Boom.unauthorized();

      const token = await auth.generateToken(user);

      res.send({ success: true, token: `Bearer ${token}` });
    },

    signUp: async (req, res) => {
      const { email, password } = req.body;

      const user = await usersService.getByEmail(email);
      if(!user){
        const hashed = await hashPassword(password);

        const role = await rolesService.search(customQuery({name: 'User'}));

            if(!role.docs[0])
                return "";

        const userCreated = await usersService.add({ ...req.body, userRole: role.docs[0], password: hashed });

        const token = await auth.generateToken(userCreated);

        res.send({ success: true, token: `Bearer ${token}` });

      }else{
        res.send({ success: false, message: 'Email already exists' });
      }
      
    },
    update: async (req, res) => {
      const result = await usersService.update(req.params.id, req.body);
      res.send(result);
  },
  };
};

export default AuthController;

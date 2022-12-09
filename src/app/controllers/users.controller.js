import Boom from '@hapi/boom';
import utils from '../utils/index.js';

const { customQuery, hashPassword } = utils;

const UsersController = (fastify) => {
    const { auth, usersService } = fastify;
    return {
        get: async (req, res) => {
            const result = await usersService.get(req.params.id);
            res.send(result);
        },
        getContacts: async (req, res) => {
            const result = await usersService.getContacts(req.params.id);
            res.send(result);
          },      
        add: async (req, res) => {
            const hashed = await hashPassword(req.body.password);

            const result = await usersService.add({ ...req.body, password: hashed });

            res.send(result);
        },
        addContact: async (req, res) => {
            const result = await usersService.addContact({ ...req.body});

            res.send(result);
        },
        update: async (req, res) => {
            delete req.body.id;
            const result = await usersService.update(req.params.id, req.body);

            res.send(result);
        },
        updatePassword: async (req, res) => {
           const { oldPassword, newPassword } = req.body;

            const user = await usersService.get(req.params.id);

            if (!user) return Boom.unauthorized();

            const passwordIsMatch = await auth.onVerifyPassword(
                oldPassword,
                user.password
              );
        
            if (!passwordIsMatch) return Boom.unauthorized();

            const passwordHashed = await hashPassword(newPassword);

            try {
                const update = await usersService.update(user._id, {
                    password: passwordHashed,
                });

                res.send({ email: update.email, passwordUpdate: true });
            } catch (e) {
                res.send({
                    email: user.email,
                    passwordUpdate: false,
                    error: e,
                });
            }
        },
        delete: async (req, res) => {
            try {
                const result = await usersService.delete(req.body);

                res.send({ result, message: 'Deleted users successfully' });
            } catch (e) {
                res.send(e);
            }
        },
    };
};

export default UsersController;

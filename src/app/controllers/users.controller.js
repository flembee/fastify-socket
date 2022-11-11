import Boom from '@hapi/boom';
import utils from '../utils/index.js';

const { customQuery, hashPassword } = utils;

const UsersController = (fastify) => {
    const { auth, usersService, rolesService } = fastify;
    return {
        get: async (req, res) => {
            const result = await usersService.get(req.params.id);
            res.send(result);
        },
        search: async (req, res) => {
            const query = customQuery(req.query);
            const result = await usersService.search(query);
            res.send(result);
        },

        add: async (req, res) => {
            const hashed = await hashPassword(req.body.password);
            const role = await rolesService.search(customQuery({name: 'User'}));

            if(!role.docs[0])
                return "";

            const result = await usersService.add({ ...req.body, userRole: role.docs[0], password: hashed });

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

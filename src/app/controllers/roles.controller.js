import utils from '../utils/index.js';

const { customQuery } = utils;

const RolesController = fastify => {
  const { rolesService } = fastify;
  return {
    get: async (req, res) => {
      const result = await rolesService.get(req.params.id);
      res.send(result);
    },

    search: async (req, res) => {
      const query = customQuery(req.query);
      const result = await rolesService.search(query);
      res.send(result);
    },

    add: async (req, res) => {
      const result = await rolesService.add(req.body);
      res.send(result);
    },

    update: async (req, res) => {
      const result = await rolesService.update(req.params.id, req.body);
      res.send(result);
    },

    delete: async (req, res) => {
      try {
        await rolesService.delete(req.body);

        const query = customQuery(req.query);
        const result = await rolesService.search({
            ...query,
            logger: req.user.id,
        });

        res.send({ result, message: 'Deleted roles successfully' });
      } catch (e) {
          res.send(e);
      }
    }
  };
};

export default RolesController;

import utils from '../utils/index.js';

const { customQuery } = utils;

const ChannelsController = fastify => {
  const { channelsService } = fastify;
  return {
    get: async (req, res) => {
      const result = await channelsService.get(req.params.id);
      res.send(result);
    },

    getByUser: async (req, res) => {
      const result = await channelsService.getByUser(req.params.id);
      res.send(result);
    },

    add: async (req, res) => {
      const result = await channelsService.add(req.body);
      res.send(result);
    },

    delete: async (req, res) => {
      try {
        await channelsService.delete(req.body);

        const query = customQuery(req.query);
        const result = await channelsService.search({
            ...query,
            logger: req.user.id,
        });

        res.send({ result, message: 'Deleted channels successfully' });
      } catch (e) {
          res.send(e);
      }
    }
  };
};

export default ChannelsController;

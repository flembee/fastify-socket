import utils from '../utils/index.js';

const { customQuery } = utils;

const MessagesController = fastify => {
  const { messagesService } = fastify;
  return {
    get: async (req, res) => {
      const result = await messagesService.get(req.params.id);
      res.send(result);
    },

    search: async (req, res) => {
      const query = customQuery(req.query);
      const result = await messagesService.search(query);
      res.send(result);
    },

    getByChannel: async (req, res) => {
      const result = await messagesService.getByChannel(req.params.id);
      res.send(result);
    },

    add: async (req, res) => {
      const result = await messagesService.add(req.body);
      res.send(result);
    },

    delete: async (req, res) => {
      try {
        await messagesService.delete(req.body);

        const query = customQuery(req.query);
        const result = await messagesService.search({
            ...query,
            logger: req.user.id,
        });

        res.send({ result, message: 'Deleted messages successfully' });
      } catch (e) {
          res.send(e);
      }
    }
  };
};

export default MessagesController;

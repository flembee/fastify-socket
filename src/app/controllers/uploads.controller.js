import utils from '../utils/index.js';

const { customQuery } = utils;

const UploadsController = fastify => {
  const { upload } = fastify;
  return {
    get: async (req, res) => {
      const result = await uploadsService.get(req.params.id);
      res.send(result);
    },

    add: async (req, res) => {
        const { file, params } =  req
        if (file && params.id) {
            const url = await upload.uploadFile(file, params.id);

            if(url.message === 'success')
                res.send(url.url);
            else
                res.send('Error')

        }else{
            res.send('Please upload a file')
        }
    },

    update: async (req, res) => {
      const result = await uploadsService.update(req.params.id, req.body);
      res.send(result);
    },

    delete: async (req, res) => {
      try {
        await uploadsService.delete(req.body);

        const query = customQuery(req.query);
        const result = await uploadsService.search({
            ...query,
            logger: req.user.id,
        });

        res.send({ result, message: 'Deleted uploads successfully' });
      } catch (e) {
          res.send(e);
      }
    }
  };
};

export default UploadsController;

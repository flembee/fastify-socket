import multer from 'fastify-multer';
import path from 'path';
import controllers from '../controllers/index.js';

const { UploadsController } = controllers;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname))
    }
  })
  
  const upload = multer({ storage: storage })

const UploadsRoutes = async function (fastify) {
  fastify
    .get('/:id', { preValidation: [fastify.validate] }, UploadsController(fastify).get)
    .post('/:id', { preHandler: upload.single('file'), preValidation: [fastify.validate] }, UploadsController(fastify).add)
    .put('/:id', { preValidation: [fastify.validate] }, UploadsController(fastify).update)
    .delete('/', { preValidation: [fastify.validate] }, UploadsController(fastify).delete);
};

export default UploadsRoutes;
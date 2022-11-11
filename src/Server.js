import 'colors';
import fastify from 'fastify';
import multer from 'fastify-multer';
import morgan from 'morgan';
import fastCors from '@fastify/cors';
import fastHelmet from '@fastify/helmet';
import fastSwagger from '@fastify/swagger';
import fastBoom from 'fastify-boom';

import config from '../config/index.js';
import plugins from './plugins/index.js';

const { Mongodb, Services, Routes, Authentication, Websocket, StoragePlugin, ReadPdfPlugin } = plugins;
class Server {
  constructor() {
    this.fastify = fastify({
      logger: config.logger
    });

    this.fastify
      .decorate('config', config)
      .register(morgan('dev'))
      .register(fastCors)
      .register(fastHelmet)
      .register(fastSwagger, config.swagger)
      .register(fastBoom)
      .register(multer.contentParser)
      .register(Authentication)
      .register(Websocket)
      .register(StoragePlugin)
      .register(ReadPdfPlugin)
      .register(Mongodb)
      .register(Services)
      .register(Routes);
  }

  async start() {
    await this.fastify.ready();

    await this.fastify.listen(config.web.port, '0.0.0.0', err => {
      if (err) {
        console.log('Error starting server:'.red, err);
        process.exit(1);
      }
      console.log(
        `Server start on Host: ${this.fastify.server.address().address}`.green
      );

      console.log(
        `Server start on Port: ${this.fastify.server.address().port}`.green
      );
    });
  }
}

export default Server;

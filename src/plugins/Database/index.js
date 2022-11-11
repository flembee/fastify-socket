import mongoose from 'mongoose';
import fp from 'fastify-plugin';
import models from '../../app/models/index.js';

mongoose.set('bufferCommands', false);
mongoose.Promise = global.Promise;

const Mongodb = fp(async function mongodb(fastify) {
  try {

    const db = await mongoose.createConnection(fastify.config.database.url);
    
    fastify.decorate('mongodb', db);

    console.log(
      `Database connected succesfully ==> ${fastify.config.database.url}\n`
        .green
    );
  } catch (error) {
    console.log(
      `Database cannot be connected: ${fastify.config.database.url} `.red
    );
    fastify.log.error(error);
  }
});

export default Mongodb;
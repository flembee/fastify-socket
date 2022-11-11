import fp from 'fastify-plugin';
import { forEachObjIndexed } from 'ramda';
import { camelCase } from 'change-case';
import services from '../../app/services/index.js';

const Services = fp(async function (fastify) {
  const decorateServices = (value, key, obj) => {
    const createClass = new value(fastify.mongodb);
    fastify.decorate(camelCase(key), createClass);
  };
  forEachObjIndexed(decorateServices, services);
});

export default Services;

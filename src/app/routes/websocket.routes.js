const WebsocketRoutes = async function (fastify) {
  fastify
    .get('/', { websocket: true, /*preValidation: [fastify.validate]*/ }, 
        (connection, req) => fastify.websocket(connection, req));
};

export default WebsocketRoutes;

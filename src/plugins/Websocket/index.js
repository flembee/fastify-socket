import fp from 'fastify-plugin';
import fastifyWebsocket from '@fastify/websocket';

const Websocket = fp(async function Websocket(fastify) {
  fastify.register(fastifyWebsocket, {
    handle,
    options: {
        maxPayload: 1048576,
        clientTracking: true,
    },
  });

  function handle(conn){
    conn.pipe(conn);
  }

  fastify.decorate('websocket', async function(connection, req, res) {
    connection.socket.on('message', data => {
        try {
            fastify.websocketServer.clients.forEach(client => {
                if(client.readyState === 1)
                    client.send(data);
            });
        } catch (err) {
            res.send(err);
        }
    });
  });
});

export default Websocket;

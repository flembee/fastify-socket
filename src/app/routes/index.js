import auth from './auth.routes.js';
import roles from './roles.routes.js';
import channels from './channels.routes.js';
import messages from './messages.routes.js';
import uploads from './uploads.routes.js';
import users from './users.routes.js';
import websocket from './websocket.routes.js';

export default {
    auth,
    roles,
    channels,
    messages,
    uploads,
    users,
    websocket,
};

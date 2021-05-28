import { Server as ServerHTTP } from 'http';
import * as express from 'express';
import { Server as ServerWS } from 'socket.io';
import { listen } from './_services/websocket';

const app = express();
const server = new ServerHTTP(app);
app.use(express.static(__dirname + '/www'));
const io_server = new ServerWS(server);

// Lancement de l'écoute WS
listen(io_server);

server.listen(8080, () => {
    console.log("Server listening on 8080... !");
});
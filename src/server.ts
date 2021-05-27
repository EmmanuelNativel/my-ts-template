import { Server as ServerHTTP } from 'http';
import * as express from 'express';
import { Server as ServerWS, Socket } from 'socket.io';
import { listen } from './_services/websocket';

/* #region  Configuration des serveur HTTP et WS */
const app = express();
const server = new ServerHTTP(app);
app.use(express.static(__dirname + '/www'));
const io_server = new ServerWS(server);

listen(io_server);


/* #endregion */

/* #region  Gestion de la communication WS */
    // io_server.on('connection', (socket_client: Socket) => {
    //     console.log("Un client se connecte...");

    //     //TODO: Réalisation du dialogue client <-> Serveur

    //     socket_client.on('disconnect', () => {
    //         console.log("... Le client est déconnecté !")
    //     });
    // });
/* #endregion */

/* #region  Lancement du serveur */
server.listen(8080, () => {
    console.log("Server listening on 8080... !");
});
/* #endregion */

console.log("hey !!! :D")
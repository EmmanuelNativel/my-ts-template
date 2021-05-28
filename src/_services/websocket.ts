import { Server as ServerWS, Socket } from 'socket.io';
import { MESSAGE_TYPE, WSmessage } from '../_types/websocketTypes';

/* #region  APP logic */
const handleMessageType = (message: WSmessage) => {
    const { type, payload } = message || {};
    console.log(`[MESSAGE] | ${type}`, payload, message);

    const separator = payload?.separator;
    const date = new Date();
    const time = [date.getHours(), date.getMinutes(), date.getSeconds()].join(separator);

    const response: WSmessage = {
        type,
        payload: {
            time
        }
    }

    return response;
};
/* #endregion */

/* #region  ACTIONS */
const ACTIONS: Record<MESSAGE_TYPE, (msg: WSmessage) => void> = {
    GET_TIME: handleMessageType,
    // handle more actions
}
/* #endregion */

/* #region  Websocket Wrapper */

// Ecoute des messages WS
const listen = (wsServer: ServerWS) => {
    wsServer.on('connection', (socket_client: Socket) => {
        console.log("Un client se connecte...");

        Object.entries(ACTIONS).forEach(([action, fn]) => {
            socket_client.on(action, (msg: WSmessage) => {
                const response = fn(msg);
                socket_client.emit(action, response);
            });
        });

        socket_client.on('disconnect', () => {
            console.log("... Le client est déconnecté !")
        });
    });
}

// Envoyer un message à toutes les sockets connectées
const broadcast = (server: ServerWS, message: WSmessage) => {
    const { type } = message;
    server.emit(type, message);
}


// Envoyer un message à un seul utilisateur
const sendMessage = (client: Socket, message: WSmessage) => {
    const { type } = message;
    client.emit(type, message);
}
/* #endregion */

export {
    listen,
    sendMessage,
    broadcast,
}
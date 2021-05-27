import { Server as ServerWS, Socket } from 'socket.io';
import { MESSAGE, WSmessage, privateWSmessage} from '../_types/websocketTypes';

// Ecoute des messages WS
const listen = (wsServer: ServerWS) => {
    wsServer.on('connection', (socket_client: Socket) => {
        console.log("Un client se connecte...");

        // TODO: Etablie la communication WS client <=> Serveur

        // Exemple: 
        sendPrivateMessage(socket_client, {
            type: MESSAGE.DATA,
            payload: {
                response: "Voici la réponse au message DATA !"
            }
        });

        socket_client.on('disconnect', () => {
            console.log("... Le client est déconnecté !")
        });
    });
}

// Envoyer un message à toutes les sockets connectées
const broadcast = (server: ServerWS, type: string, msg: any) => {
    server.emit(type, msg);
}

// Envoyer un message à un groupe d'utilisateurs (si pas de target => broadcast)
const sendMessage = (server: ServerWS, message: WSmessage) => {
    const { type, payload } = message;

    if (message.target)
        server.to(message.target).emit(type, payload);
    else
        broadcast(server, type, payload);
}

// Envoyer un message à un seul utilisateur
const sendPrivateMessage = (client: Socket, message: privateWSmessage) => {
    const { type, payload } = message;
    client.emit(type, payload);
}

// Ajouter une socket dans une room
const joinRoom = (client: Socket, room: string) => {
    client.join(room);
}

// Retirer une socket d'une room
const leaveRoom = (client: Socket, room: string) => {
    client.leave(room);
}

export {
    listen,
    sendMessage,
    broadcast,
    joinRoom,
    leaveRoom
}
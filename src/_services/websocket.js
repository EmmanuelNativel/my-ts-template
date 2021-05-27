"use strict";
exports.__esModule = true;
exports.leaveRoom = exports.joinRoom = exports.broadcast = exports.sendMessage = exports.listen = void 0;
var websocketTypes_1 = require("../_types/websocketTypes");
// Ecoute des messages WS
var listen = function (wsServer) {
    wsServer.on('connection', function (socket_client) {
        console.log("Un client se connecte...");
        // TODO: Etablie la communication WS client <=> Serveur
        // Exemple: 
        sendPrivateMessage(socket_client, {
            type: websocketTypes_1.MESSAGE.DATA,
            payload: {
                response: "Voici la réponse au message DATA hey !!!"
            }
        });
        socket_client.on('disconnect', function () {
            console.log("... Le client est déconnecté !");
        });
    });
};
exports.listen = listen;
// Envoyer un message à toutes les sockets connectées
var broadcast = function (server, type, msg) {
    server.emit(type, msg);
};
exports.broadcast = broadcast;
// Envoyer un message à un groupe d'utilisateurs (si pas de target => broadcast)
var sendMessage = function (server, message) {
    var type = message.type, payload = message.payload;
    if (message.target)
        server.to(message.target).emit(type, payload);
    else
        broadcast(server, type, payload);
};
exports.sendMessage = sendMessage;
// Envoyer un message à un seul utilisateur
var sendPrivateMessage = function (client, message) {
    var type = message.type, payload = message.payload;
    client.emit(type, payload);
};
// Ajouter une socket dans une room
var joinRoom = function (client, room) {
    client.join(room);
};
exports.joinRoom = joinRoom;
// Retirer une socket d'une room
var leaveRoom = function (client, room) {
    client.leave(room);
};
exports.leaveRoom = leaveRoom;

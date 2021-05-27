"use strict";
exports.__esModule = true;
var http_1 = require("http");
var express = require("express");
var socket_io_1 = require("socket.io");
var websocket_1 = require("./_services/websocket");
/* #region  Configuration des serveur HTTP et WS */
var app = express();
var server = new http_1.Server(app);
app.use(express.static('www'));
var io_server = new socket_io_1.Server(server);
websocket_1.listen(io_server);
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
server.listen(8080, function () {
    console.log("Server listening on 8080.... :)");
});
/* #endregion */
console.log("hey !! :)");

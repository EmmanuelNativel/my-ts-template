/* #region  Déclaration de type pour palier au manque de fichier de déclaration de type pour socket.io client */
interface Socket {
    on(event: string, callback: (data: any, err?: any) => void): void;
    emit(event: string, data: any): void;
}

declare var io: () => Socket;
/* #endregion */

console.log("Code client lancé...");
let io_client = io();

/* #region  TYPES */
enum MESSAGE_TYPE {
    GET_TIME = "GET_TIME"
}

interface WSmessage {
    type: string,
    payload?: Record<string, any>,
    error?: string
    //... add other message's common properties
}
/* #endregion */

function requestServer(message: WSmessage, cb: (response: WSmessage) => void) {
    const { type } = message;

    console.log("MESSAGE : ", message);

    io_client.on(type, cb);
    io_client.emit(type, message);
}


/* #region  Communication avec le serveur */
io_client.on("connect", () => {
    console.log("Connexion au serveur WS établie !");

    document.getElementById("btn").onclick = () => { requestTime(":") }
});

io_client.on("disconnect", () => {
    console.log("Serveur WS déconnecté !! :)");
});
/* #endregion */


/* #region  APP logic */
const requestTime = (separator: string) => {
    const message: WSmessage = {
        type: MESSAGE_TYPE.GET_TIME,
        payload: {
            separator
        }
    }

    requestServer(message, (rep) => {
        const { error, type, payload } = rep;
        if (error) console.log(`[ERROR] ${type} | ${error}`);
        else {
            const time: string = payload.time;
            document.getElementById("time").textContent = time;
        }
    });
}
/* #endregion */


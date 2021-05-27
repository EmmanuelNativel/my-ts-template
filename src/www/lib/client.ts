/* #region  Déclaration de type pour palier au manque de fichier de déclaration de type pour socket.io client */
interface Socket {
    on(event: string, callback: (data: any, err?: any) => void): void;
    emit(event: string, data: any): void;
}

declare var io: () => Socket;
/* #endregion */

console.log("Code client lancé...");
let io_client = io();

io_client.on("connect", () => {
    console.log("Connexion au serveur WS établie !!!! ahah");
    requestServer("DATA", { car: 'user', id: "xxxxx" }, (rep: any, err: string) => {
        if (err) console.log("erreur", err);
        else {
            document.getElementById("test").innerText = rep.response;
            console.log("DATA", rep);
        }
    });
});

io_client.on("disconnect", () => {
    console.log("Serveur WS déconnecté !! :)");
});


// ========================================================================================================

// Ci dessous on doit gérer un on() et un emit() pour le "même message".
// ==> On peut améliorer ça avec requestServer ( à implémenter ) 

// io_client.emit("getData", { cat: 'user', id: 'xxxxx' }); // demande d'une donnée au serveur

// io_client.on("receiveData", (res: any) => {
//     /*
//     res : {
//         cat: 'user',
//         id: 'xxxxx',
//         data: {
//             name: 'bob',
//             lastname: 'jean'
//         }
//     }
//     */
// });

/** 
 // TODO: Faire le projet demandé (voir ci-dessous)
 *  - toolchain 
        - gulp dev (avec gulp.watch) (hotreloading) [OK]
        - git [OK]
        -  offuscation de la partie cliente uniquement [OK]
    - documentation :
        - Quand on tape les commandes il faut avoir le help bien fait (gulp-help) [OK]
            --> AJOUTER LES OPTIONS [OK]
        - Il faut aussi faire un markdown : 
            - Comment organiser le dossier ?
            - Description des tâches
    - typescript : 
        - Implémenter requestServer
        - Faire quelque chose de propre avec TS
 */


// On souhaite avoir une fonctionnalité d'échange de type requête/réponse avec le serveur.

interface UserInfo {
    name: string;
    lastname: string;
}

function requestServer(name: string, args: any, response: (err: string, rep: any) => void) {
    // Emit le message,  et quand on a la réponse déclencher le callback.
    // Permet de gérer le on() et le emit() associé dans la même fonction.
    io_client.emit(name, args);
    io_client.on(name, response);
}

requestServer("DATA", { car: 'user', id: "xxxxx" }, (err: string, rep: any) => {
    if (err) console.log("erreur", err);
    else {
        document.getElementById("test").textContent = rep;
        console.log("DATA !!", rep);
    }
});

